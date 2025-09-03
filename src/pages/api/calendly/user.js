// Endpoint para buscar infos do usuários
import { calendlyClient } from "../../../lib/calendly-client";

// Endpoint/rota de API para requisição de usuários.
export default async function handler(req, res) {
  // Verificação de requisição GET
  if (req.method !== "GET") {
    // Mensagem de erro, caso não.
    return res.status(405).json({ message: "Metodo não autorizado" });
  }

  try {
    // Busca os dados de usuários no Calendly
    const userInfo = await calendlyClient.getUserInfo();
    res.status(200).json(userInfo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
