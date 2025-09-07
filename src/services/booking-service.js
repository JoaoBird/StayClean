import { prisma } from "@/lib/prisma";
import { stripeClient } from "@/lib/stripe";
import { hubspotSync } from "@/lib/hubspot";
import { twilioNotifications } from "@/lib/twilio";

export const processBookingEvent = {
  async handleNewBooking(calendlyPayload) {
    try {
      const { event, invitee, questions_and_answers } = calendlyPayload;

      // 1. Criar/atualizar usuário
      const user = await this.upsertUser(invitee);

      // 2. Identificar tipo de serviço
      const serviceType = await this.identifyServiceType(event.event_type);

      // 3. Criar agendamento no banco
      const booking = await prisma.booking.create({
        data: {
          title: event.name,
          startTime: new Date(event.start_time),
          endTime: new Date(event.end_time),
          status: "PENDING",
          userId: user.id,
          serviceTypeId: serviceType.id,
          customerName: invitee.name,
          customerEmail: invitee.email,
          customerPhone: invitee.text_reminder_number,
          vehicleInfo: this.extractVehicleInfo(questions_and_answers),
          calendlyEventId: event.uri,
        },
      });

      // 4. Orquestrar integrações em paralelo
      await Promise.allSettled([
        this.processPayment(booking, serviceType),
        this.syncToHubSpot(booking, user, serviceType),
        this.sendNotifications(booking, user),
      ]);

      return booking;
    } catch (error) {
      console.error("Erro processando novo agendamento:", error);
      throw error;
    }
  },

  async upsertUser(inviteeData) {
    return prisma.user.upsert({
      where: { email: inviteeData.email },
      update: {
        name: inviteeData.name,
        phone: inviteeData.text_reminder_number,
      },
      create: {
        email: inviteeData.email,
        name: inviteeData.name,
        phone: inviteeData.text_reminder_number,
        calendlyUserId: inviteeData.uri,
      },
    });
  },

  async identifyServiceType(eventTypeUri) {
    const serviceType = await prisma.serviceType.findFirst({
      where: { calendlyEventTypeId: eventTypeUri },
    });
    if (!serviceType) {
      return prisma.serviceType.findFirst({
        where: { slug: "lavagem-simples" },
      });
    }
    return serviceType;
  },

  async processPayment(booking, serviceType) {
    if (serviceType?.price && serviceType.price > 0) {
      const paymentIntent = await stripeClient.paymentIntents.create({
        amount: serviceType.price,
        currency: "brl",
        metadata: {
          bookingId: booking.id,
          service: serviceType.name,
        },
        automatic_payment_methods: { enabled: true },
      });
      await prisma.booking.update({
        where: { id: booking.id },
        data: { stripePaymentId: paymentIntent.id },
      });
    }
  },

  async syncToHubSpot(booking, user, serviceType) {
    try {
      const contactId = await hubspotSync.upsertContact(user);
      const meeting = await hubspotSync.createMeeting({
        title: booking.title,
        startTime: booking.startTime,
        endTime: booking.endTime,
        contactId: contactId,
        properties: {
          service_type: serviceType.name,
          booking_source: "Calendly",
          vehicle_info: booking.vehicleInfo,
        },
      });
      if (meeting?.id) {
        await prisma.booking.update({
          where: { id: booking.id },
          data: { hubspotMeetingId: meeting.id },
        });
      }
    } catch (error) {
      console.error("Erro sync HubSpot:", error);
    }
  },

  async sendNotifications(booking, user) {
    try {
      // Email de confirmação
      await twilioNotifications.sendConfirmationEmail({
        to: user.email,
        bookingDetails: booking,
      });

      // WhatsApp se telefone disponível
      if (user.phone) {
        // Integração WhatsApp
        await twilioNotifications.sendWhatsAppConfirmation({
          to: user.phone,
          customerName: user.name,
          serviceTime: booking.startTime,
          serviceName: booking.title,
        });
      }

      await prisma.booking.update({
        where: { id: booking.id },
        data: { confirmationSent: true },
      });
    } catch (error) {
      console.error("Erro enviando notificações:", error);
    }
  },
};
