export default function Hero({ totalDoacoes }) {
    return (
        <section id="inicio" className="py-5">
            <div className="container">
                <div className="row align-items-center g-5">
                    <div className="col-lg-6">
                        <span className="badge bg-success-subtle text-success px-3 py-2 rounded-pill mb-3">Objetivo ODS 2 — Fome Zero (Fase 1: Lançamento)</span>
                        <h1 className="display-4 fw-bold mb-4">Alimentando Timbiras,<br />Expandindo Esperança</h1>
                        <p className="lead text-muted mb-4">Uma rede viva e colaborativa — onde empresas, produtores, cidadãos e o poder municipal dão as mãos para transformar a realidade alimentar de Timbiras.<br /><strong>Equipe Timbiranos — Timbiras, Maranhão</strong>.</p>
                        <div className="d-flex gap-3 flex-wrap mb-4">
                            <a href="#doar" className="btn-solidario">Quero Doar</a>
                            <a href="#prestacao-contas" className="btn btn-outline-success rounded-pill px-4">Ver Prestação de Contas</a>
                        </div>
                        
                        <div className="painel-arrecadacao">
                            <div className="d-flex justify-content-between align-items-center mb-2">
                                <span className="fw-bold text-success"><i className="bi bi-pie-chart-fill me-1"></i> Campanha Comunitária em Timbiras</span>
                                <span className="badge bg-warning text-dark">Fase de Lançamento</span>
                            </div>
                            <h4 className="fw-bold mb-1"><span id="contadorDoacoes">{totalDoacoes}</span> Cestas Arrecadadas</h4>
                            <p className="text-muted small mb-2">Meta da comunidade: 50 cestas básicas nesta semana</p>
                            <div className="progress" style={{ height: '8px' }}>
                                <div className="progress-bar bg-success" role="progressbar" style={{ width: `${(totalDoacoes / 50) * 100}%` }}></div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <img loading="eager" src="./img/agricultores-horta.webp" alt="Agricultura sustentável em Timbiras" className="img-banner shadow" />
                    </div>
                </div>
            </div>
        </section>
    );
}