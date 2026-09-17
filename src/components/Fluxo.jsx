export default function Fluxo() {
    return (
        <section id="fluxo">
            <div className="container">
                <div className="text-center mb-5">
                    <h2 className="fw-bold">O Caminho da Solidariedade</h2>
                    <p className="text-muted">A união da sociedade civil, comércio e poder público em Timbiras</p>
                </div>
                <div className="fluxo">
                    <div className="fluxo-linha"></div>
                    <div className="fluxo-anim"></div>
                    <div className="fluxo-carga" role="img" aria-label="Pacote percorrendo o caminho">📦</div>
                    <div className="row justify-content-between align-items-center">
                        <div className="col-md-3 fluxo-etapa">
                            <div className="fluxo-caixa"><i className="bi bi-people-fill"></i></div>
                            <h5>Comunidade Doadora</h5>
                            <p className="text-muted small">Empresas, cidadãos e poder público</p>
                        </div>
                        <div className="col-md-3 fluxo-etapa">
                            <div className="fluxo-caixa"><i className="bi bi-building"></i></div>
                            <h5>Central de Apoio</h5>
                            <p className="text-muted small">Organização e triagem</p>
                        </div>
                        <div className="col-md-3 fluxo-etapa">
                            <div className="fluxo-caixa"><i className="bi bi-truck"></i></div>
                            <h5>Logística Local</h5>
                            <p className="text-muted small">Transporte seguro aos bairros</p>
                        </div>
                        <div className="col-md-3 fluxo-etapa">
                            <div className="fluxo-caixa"><i className="bi bi-heart-fill"></i></div>
                            <h5>Famílias Beneficiadas</h5>
                            <p className="text-muted small">Atendimento humanizado</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}