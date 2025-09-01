import { calendlyClient } from '../../lib/calendly-client';

// Endpoint/rota de API para requisição de eventos.
export default async function handler(req, res) {
  try {
    // Pega o parâmetro da URL
    const { organizationUri } = req.query;
    // Chama a API do Calendly
    const events = await calendlyClient.getScheduledEvents(organizationUri);
    // Envia a resposta de sucesso
    res.status(200).json(events);
  } catch (error) {
    // Envia a resposta de erro
    res.status(500).json({ error: error.message });
  }
}
