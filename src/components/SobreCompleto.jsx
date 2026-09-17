import { destaquesSobre } from '../data/siteData';

export default function SobreCompleto() {

    return (
        <section id="sobre" className="bg-alt">
            <div className="container">
                <div className="text-center mb-5">
                    <h2 className="fw-bold">Sobre o Timbiras Solidária & Visão de Expansão</h2>
                    <p className="text-muted col-lg-8 mx-auto">Acreditamos que todo grande impacto global começa com a união de toda a comunidade local.</p>
                    <p className="text-success small mt-2"><i className="bi bi-geo-alt-fill"></i> Projeto desenvolvido pela Equipe Timbiranos — Timbiras — Maranhão</p>
                </div>

                <div className="row align-items-center g-5 mb-5">
                    <div className="col-lg-6">
                        <img loading="lazy" src="./img/timba.webp" alt="Vista aérea de Timbiras" className="img-fluid rounded-4 shadow-lg w-100" style={{ maxHeight: '350px', objectFit: 'cover' }} />
                    </div>
                    <div className="col-lg-6">
                        <h3 className="fw-bold text-success mb-3">Conhecendo Nossa Terra</h3>
                        <p className="text-muted">Timbiras, banhada por suas riquezas naturais e habitada por um povo acolhedor, é o berço da nossa iniciativa. O projeto <em>Timbiras Solidária</em> nasce para cuidar das famílias timbirenses.</p>
                    </div>
                </div>

                <div className="row g-4 mb-5">
                    {destaquesSobre.map((item) => (
                        <div className="col-md-4" key={item.titulo}>
                            <div className="card h-100">
                                <img loading="lazy" src={item.imagem} alt={item.alt} className="card-img-top card-img" />
                                <div className="p-4">
                                    <i className={`bi ${item.icone} text-success fs-1 mb-2`}></i>
                                    <h3 className="h5 fw-bold">{item.titulo}</h3>
                                    <p className="text-muted">{item.descricao}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="row align-items-center bg-white p-4 rounded-4 shadow-sm mb-5 g-4">
                    <div className="col-lg-7">
                        <h3 className="fw-bold text-success mb-3"><i className="bi bi-people-fill me-2"></i> Acolhimento e Solidariedade Humana</h3>
                        <p className="text-muted mb-0">O verdadeiro motor do <em>Timbiras Solidária</em> é o calor humano e a união entre vizinhos.</p>
                    </div>
                    <div className="col-lg-5">
                        <img loading="lazy" src="./img/social.webp" alt="Acolhimento" className="img-fluid rounded-4 shadow" style={{ objectFit: 'cover', maxHeight: '280px', width: '100%' }} />
                    </div>
                </div>
            </div>
        </section>
    );
}