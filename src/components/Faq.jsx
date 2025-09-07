// components/Planos.js
export default function Faq() {
  const perguntas = [
    {
      titulo: "1. Qual a diferença entre uma lavagem comum e um serviço de estética automotiva?",
      descricao: "Muita gente acha que estética = lavar carro, mas na verdade envolve cuidados de conservação. Na verdade, a lavagem comum remove sujeira superficial. Já a estética automotiva vai além, incluindo técnicas de polimento, enceramento, hidratação de couro, cristalização de vidros e proteção da pintura. É como um spa para o carro.",
          
    },
    {
      titulo: "2. Com que frequência devo fazer um serviço de estética automotiva?",
      descricao: " O serviço de estética automotiva é algo diário, mensal ou anual? \n Recomendamos lavagens regulares (semanal ou quinzenal) e serviços de estética completa a cada 3 ou 6 meses, dependendo do uso do veículo e da exposição ao sol, chuva ou poluição.",
      
     
    },
    {
      titulo: "3. Quanto tempo leva um serviço de estética automotiva completo?",
      descricao: "Muita gente tem pressa e não sabe que é um trabalho detalhado.\n\n Um serviço de estética completo pode levar de 3 a 6 horas, dependendo do tamanho do carro e do pacote contratado. Trabalhamos com agendamento para garantir que o atendimento seja rápido e de qualidade.",
      
      
    },
  ];

 return (
    <section className="faq">
      <h2 className="titulo">Dúvidas Frequentes</h2>
      <div className="grid-faq">
        {perguntas.map((faq, i) => (
          <div key={i} className="card-faq">
            <div className="card-front">
              <h3>{faq.titulo}</h3>
            </div>
            <div className="card-back">
              <p>{faq.descricao}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
