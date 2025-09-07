import React from "react";
import { InlineWidget, useCalendlyEventListener } from "react-calendly";

const AgendamentoCalendly = ({ tipoServico, dataCliente }) => {
  useCalendlyEventListener({
    onEventScheduled: (e) => {
      console.log("Agendamento criado:", e.data.payload);
      window.gtag?.("event", "agendamento_completo", {
        event_category: "engajamento",
        service_type: tipoServico,
      });
    },
    onPageHeightResize: (e) => {
      console.log("Nova altura:", e.data.payload.height);
    },
  });

  return (
    <div className="calendly-container">
      <InlineWidget
        url="" // aqui precisa passar o link do tipo de evento no Calendly
        styles={{
          height: "700px",
          width: "100%",
        }}
        pageSettings={{
          backgroundColor: "#ffffff",
          primaryColor: "00a2ff",
          textColor: "4d5055",
          hideEventTypeDetails: false,
        }}
        prefill={{
          email: dataCliente?.email,
          name: dataCliente?.name,
          customAnswers: {
            tipo_veiculo: dataCliente?.tipoVeiculo,
            observacoes: dataCliente?.notas,
          },
        }}
        utm={{
          utmSource: "stay_clean_website",
          utmMedium: "booking_widget",
          utmCampaign: "direct_booking",
        }}
      />
    </div>
  );
};

export function AgendamentoCalendlySimples({ url }) {
  return (
    <div
      className="calendly-container"
      style={{ minWidth: "320px", height: "700px" }}
    >
      <InlineWidget url={url} />
    </div>
  );
}

export default AgendamentoCalendly;
