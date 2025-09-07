// components/Planos.js
export default function Planos() {
  const planos = [
    {
      titulo: "COMPLETA 2+",
      descricao: "2 LAVAGENS COMPLETAS POR MÊS\nSEGUNDAS À QUARTAS",
      preco: "179,90",
      img: "/CaroselPlano.png",
    },
    {
      titulo: "COMPLETA 3+",
      descricao: "3 LAVAGENS COMPLETAS POR MÊS\nSEGUNDAS À QUINTAS",
      preco: "263,90",
      img: "/CaroselPlano2.png",
    },
    {
      titulo: "COMPLETA 4+",
      descricao: "4 LAVAGENS COMPLETAS POR MÊS\nQUALQUER DIA DA SEMANA",
      preco: "388,90",
      img: "/CaroselPlano3.png",
    },
  ];

  return (
    <section className="planos">
      <h2 className="titulo">Nossos Planos</h2>
      <div className="grid-planos">
        {planos.map((plano, i) => (
          <div key={i} className="card">
            <div className="card-img">
              <img src={plano.img} alt={plano.titulo} />
              <div className="overlay">{plano.titulo}</div>
            </div>
            <div className="card-body">
              <h3>Assinatura {plano.titulo}</h3>
              <p>{plano.descricao}</p>
              <h4>
                A partir de <span>R$ {plano.preco}</span> p/mês
              </h4>
              <button className="btn-assine">ASSINE JÁ</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
