import { useState } from 'react';
import { bairros, zonaRural } from '../data/siteData';

export default function PrestacaoContas() {
    const [busca, setBusca] = useState('');
    const normalizarTexto = (texto) => texto
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLocaleLowerCase();
    const termoBusca = normalizarTexto(busca.trim());
    const bairrosFiltrados = bairros.filter((bairro) =>
        normalizarTexto(bairro.nome).includes(termoBusca),
    );

    return (
        <section id="prestacao-contas">
            <div className="container">
                <div className="text-center mb-5">
                    <span className="text-success fw-semibold text-uppercase small">Transparência Total</span>
                    <h2 className="fw-bold">Prestação de Contas por Bairro</h2>
                    <div className="input-group mx-auto mt-4" style={{ maxWidth: '520px' }}>
                        <span className="input-group-text bg-white border-success text-success">
                            <i className="bi bi-search"></i>
                        </span>
                        <input
                            type="search"
                            className="form-control border-success"
                            value={busca}
                            onChange={(event) => setBusca(event.target.value)}
                            placeholder="Pesquisar bairro"
                            aria-label="Pesquisar bairro"
                        />
                    </div>
                    <p className="text-muted col-lg-8 mx-auto">Acompanhe a quantidade histórica de cestas básicas e mantimentos já entregues em cada localidade de Timbiras, MA.</p>
                </div>

                <div className="row g-3">
                    {bairrosFiltrados.map((bairro) => (
                        <div className="col-md-4 col-sm-6" key={bairro.nome}>
                            <div className="bairro-card">
                                <div>
                                    <h6 className="fw-bold mb-0">{bairro.nome}</h6>
                                </div>
                                <span className="badge bg-success fs-6">{bairro.qtd}</span>
                            </div>
                        </div>
                    ))}

                    {bairrosFiltrados.length === 0 && (
                        <div className="col-12 text-center text-muted py-3">
                            Nenhum bairro encontrado para essa pesquisa.
                        </div>
                    )}

                    <div className="col-md-8 col-sm-12">
                        <div className="bairro-card bairro-destaque-rural">
                            <div>
                                <h5 className="fw-bold mb-0 text-success">
                                    <i className="bi bi-tree-fill me-2 text-success"></i>
                                    {zonaRural.nome}
                                    <i className="bi bi-star-fill text-warning ms-2"></i>
                                </h5>
                                <small className="text-muted">(Maior Impacto Geral)</small>
                            </div>
                            <span className="badge bg-success fs-5">{zonaRural.qtd}</span>
                        </div>
                    </div>
                </div>

                <div className="total-doacoes-box">
                    <h3 className="fw-bold mb-1">
                        <i className="bi bi-heart-pulse-fill text-warning me-2"></i>
                        Total Geral de Doações Entregues
                    </h3>
                    <p className="text-white-50 mb-3 small">Somatório oficial de todas as localidades atendidas em Timbiras, MA</p>
                    <h1 className="display-3 fw-bold text-warning mb-0">215 <span className="fs-4 text-white fw-normal">Cestas Básicas</span></h1>
                </div>
            </div>
        </section>
    );
}