// Aqui criaremos o "conector", que terá todas as regras e métodos de conexão e autenticação com a API do Calendly

// URL base da API V2 (Calendly)
const CALENDLY_API_BASE = 'https://api.calendly.com';

// Classe com a lógica de interação com a API V2 do Calendly
class CalendlyApiClient {
  //Construtor
  constructor() {
    this.headers = {
      //Autenticação com Bearer token
      Authorization: `Bearer ${process.env.CALENDLY_PERSONAL_ACCESS_TOKEN}`,
      'Content-Type': 'application/json',
    };
  }

  //Método get padrão rest API V2
  async get(endpoint) {
    const response = await fetch(`${CALENDLY_API_BASE}${endpoint}`, {
      method: 'GET',
      headers: this.headers,
    });
    if (!response.ok) {
      throw new Error(
        `Calendly API Error: ${response.status} - ${await response.text()}`,
      );
    }
    return response.json();
  }

  //Método post padrão rest API V2
  async post(endpoint, data) {
    const response = await fetch(`${CALENDLY_API_BASE}${endpoint}`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error(
        `Calendly API Error: ${response.status} - ${await response.text()}`,
      );
    }
    return response.json();
  }

  // Métodos específicos para Stay Clean
  async getUserInfo() {
    return this.get('/users/me');
  }

  async getScheduledEvents(organizationUri) {
    const params = new URLSearchParams({
      organization: organizationUri,
    });
    return this.get(`/scheduled_events?${params}`);
  }

  async cancelEvent(eventUuid, reason = 'Cancelado pelo sistema') {
    return this.post(`/scheduled_events/${eventUuid}/cancellation`, {
      reason: reason,
    });
  }

  //Método de criação de Webhook, para monitoramento de alterações
  async createWebhookSubscription() {
    return this.post('/webhook_subscriptions', {
      url: `${process.env.NEXT_PUBLIC_APP_URL}/api/webhooks/calendly`,
      // Eventos a serem monitorados
      events: [
        'invitee.created',
        'invitee.canceled',
        'routing_form_submission.created',
      ],
      organization: process.env.CALENDLY_ORGANIZATION_URI,
      scope: 'organization',
    });
  }
}

// Criando e exportando um objeto de interação com a API Calendly (Singleton)
export const calendlyClient = new CalendlyApiClient();
