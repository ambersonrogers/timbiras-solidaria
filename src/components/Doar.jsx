import { useState } from 'react';

const QUANTIDADES_RAPIDAS = ['1 Cesta', '2 Cestas', '5 Cestas', '10 Cestas', '20 kg Alimentos'];

export default function Doar({ onDoacaoSucesso }) {
    const [aviso, setAviso] = useState('');
    const [quantidade, setQuantidade] = useState('');
    const [tipo, setTipo] = useState('');
    const [pixCopiado, setPixCopiado] = useState(false);
    const [reciboUltimaDoacao, setReciboUltimaDoacao] = useState(null);

    const copiarChavePix = () => {
        const chavePix = 'contato@timbirassolidaria.org.br';
        navigator.clipboard.writeText(chavePix).then(() => {
            setPixCopiado(true);
            setTimeout(() => setPixCopiado(false), 3000);
        }).catch(() => {
            setAviso('Chave PIX: contato@timbirassolidaria.org.br');
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.currentTarget;
        if (!form.checkValidity()) {
            setAviso('⚠️ Preencha todos os campos obrigatórios!');
            return;
        }

        const dadosFormulario = new FormData(form);
        const novaDoacao = {
            id: 'REC-' + Math.floor(100000 + Math.random() * 900000),
            data: new Date().toLocaleDateString('pt-BR'),
            nome: dadosFormulario.get('nome'),
            telefone: dadosFormulario.get('telefone'),
            tipoDoador: dadosFormulario.get('perfil_doador'),
            tipo: tipo || dadosFormulario.get('tipo'),
            quantidade: quantidade || dadosFormulario.get('quantidade'),
            bairro: dadosFormulario.get('cidade'),
            endereco: dadosFormulario.get('endereco'),
        };

        let doacoesSalvas = [];
        try {
            const dadosSalvos = JSON.parse(localStorage.getItem('doacoes') || '[]');
            doacoesSalvas = Array.isArray(dadosSalvos) ? dadosSalvos : [];
        } catch {
            doacoesSalvas = [];
        }
        localStorage.setItem('doacoes', JSON.stringify([...doacoesSalvas, novaDoacao]));

        setReciboUltimaDoacao(novaDoacao);
        setAviso('✅ Doação cadastrada com sucesso! Meta comunitária atualizada.');
        if (onDoacaoSucesso) onDoacaoSucesso();

        // Reseta estados locais
        setQuantidade('');
        setTipo('');
        form.reset();
    };

    return (
        <section id="doar" className="bg-alt">
            <div className="container">
                <div className="row align-items-center g-5">
                    
                    {/* Coluna Esquerda: Informações e PIX Solidário */}
                    <div className="col-lg-5">
                        <span className="badge bg-success-subtle text-success px-3 py-2 rounded-pill fw-semibold mb-3">
                            <i className="bi bi-heart-fill text-danger me-1"></i> Mobilização Social
                        </span>
                        <h2 className="fw-bold mb-3">Quero Doar</h2>
                        <p className="text-muted mb-4">
                            Toda a comunidade pode participar! Seja você um cidadão, comércio local, produtor rural ou representante público.
                            Cadastre seu donativo e buscaremos os alimentos com segurança em Timbiras.
                        </p>

                        {/* Card Interativo de PIX Solidário com manipulação do DOM e evento de cópia */}
                        <div className="bg-white p-4 rounded-4 shadow-sm border-start border-warning border-4 mb-4">
                            <div className="d-flex align-items-center justify-content-between mb-2">
                                <h6 className="fw-bold text-dark mb-0">
                                    <i className="bi bi-qr-code text-warning me-2"></i> Chave PIX Solidária (Simulada)
                                </h6>
                                <span className="badge bg-warning text-dark">Apoio Financeiro</span>
                            </div>
                            <p className="text-muted small mb-3">
                                Prefere contribuir com valores para a compra direta de cestas com pequenos produtores de Timbiras?
                            </p>
                            <div className="input-group">
                                <input
                                    type="text"
                                    readOnly
                                    value="contato@timbirassolidaria.org.br"
                                    className="form-control form-control-sm bg-light text-muted"
                                    aria-label="Chave PIX da campanha"
                                />
                                <button
                                    type="button"
                                    className={`btn btn-sm ${pixCopiado ? 'btn-success' : 'btn-outline-success'}`}
                                    onClick={copiarChavePix}
                                    title="Clique para copiar a chave PIX"
                                >
                                    <i className={`bi ${pixCopiado ? 'bi-check-circle-fill' : 'bi-clipboard'} me-1`}></i>
                                    {pixCopiado ? 'Copiado!' : 'Copiar'}
                                </button>
                            </div>
                            {pixCopiado && (
                                <span className="text-success small d-block mt-2">
                                    <i className="bi bi-check-lg me-1"></i> Chave PIX copiada para a área de transferência!
                                </span>
                            )}
                        </div>

                        <img
                            loading="lazy"
                            src="./img/montagem-cestas.webp"
                            alt="Montagem de cestas básicas em Timbiras"
                            className="img-solida shadow d-none d-lg-block w-100 rounded-4"
                        />
                    </div>

                    {/* Coluna Direita: Formulário de Doação */}
                    <div className="col-lg-7">
                        <form onSubmit={handleSubmit} className="bg-white p-4 p-md-5 rounded-4 shadow-sm">
                            <h4 className="fw-bold text-success mb-3">
                                <i className="bi bi-basket3 me-2"></i> Cadastro de Donativo
                            </h4>

                            {aviso && <div className="alert alert-info py-2 mb-3">{aviso}</div>}

                            {/* Recibo dinâmico renderizado após doação bem-sucedida */}
                            {reciboUltimaDoacao && (
                                <div className="p-3 bg-success-subtle border border-success rounded-3 mb-4">
                                    <div className="d-flex justify-content-between align-items-center mb-2">
                                        <strong className="text-success">
                                            <i className="bi bi-patch-check-fill me-1"></i> Recibo Solidário Gerado
                                        </strong>
                                        <span className="badge bg-success">{reciboUltimaDoacao.id}</span>
                                    </div>
                                    <div className="small text-muted">
                                        Obrigado, <strong>{reciboUltimaDoacao.nome}</strong>! Sua doação de{' '}
                                        <strong>{reciboUltimaDoacao.quantidade}</strong> ({reciboUltimaDoacao.bairro}) foi
                                        registrada com sucesso no painel em tempo real.
                                    </div>
                                </div>
                            )}

                            <div className="row g-3">
                                <div className="col-md-6">
                                    <label className="form-label fw-semibold">Nome / Instituição <small className="text-danger">*</small></label>
                                    <input type="text" name="nome" className="form-control rounded-pill px-3" required placeholder="Seu nome ou da empresa" />
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label fw-semibold">Telefone / WhatsApp <small className="text-danger">*</small></label>
                                    <input type="tel" name="telefone" className="form-control rounded-pill px-3" required placeholder="(99) 99999-9999" />
                                </div>
                                <div className="col-12">
                                    <label className="form-label fw-semibold">E-mail</label>
                                    <input type="email" name="email" className="form-control rounded-pill px-3" placeholder="seu@email.com" />
                                </div>

                                <div className="col-md-6">
                                    <label className="form-label fw-semibold">Perfil do Doador <small className="text-danger">*</small></label>
                                    <select name="perfil_doador" className="form-select rounded-pill px-3" required defaultValue="">
                                        <option value="" disabled>Selecione...</option>
                                        <option value="cidadao">Cidadão / Dona de casa</option>
                                        <option value="empresa">Empresa / Comércio local</option>
                                        <option value="produtor">Produtor Rural da Região</option>
                                        <option value="governo">Poder Municipal / Órgão Público</option>
                                    </select>
                                </div>

                                <div className="col-md-6">
                                    <label className="form-label fw-semibold">Tipo de Doação <small className="text-danger">*</small></label>
                                    <select
                                        name="tipo"
                                        className="form-select rounded-pill px-3"
                                        required
                                        value={tipo}
                                        onChange={(e) => setTipo(e.target.value)}
                                    >
                                        <option value="" disabled>Selecione o tipo...</option>
                                        <option value="cestas">Cestas Básicas Prontas</option>
                                        <option value="nao-pereciveis">Alimentos Não Perecíveis</option>
                                        <option value="hortifruti">Hortifrúti / Alimentos Frescos</option>
                                        <option value="outros">Outros Suprimentos</option>
                                    </select>
                                </div>

                                {/* Chips Interativos para preenchimento rápido com evento onClick */}
                                <div className="col-12">
                                    <label className="form-label fw-semibold d-block mb-1">
                                        Quantidade Aproximada <small className="text-danger">*</small>
                                    </label>
                                    <div className="d-flex flex-wrap gap-2 mb-2">
                                        {QUANTIDADES_RAPIDAS.map((item) => (
                                            <button
                                                key={item}
                                                type="button"
                                                className={`btn btn-sm rounded-pill ${quantidade === item ? 'btn-success text-white' : 'btn-outline-secondary'}`}
                                                onClick={() => setQuantidade(item)}
                                            >
                                                {item}
                                            </button>
                                        ))}
                                    </div>
                                    <input
                                        type="text"
                                        name="quantidade"
                                        className="form-control rounded-pill px-3"
                                        required
                                        placeholder="Ex: 2 cestas / 20 kg de arroz"
                                        value={quantidade}
                                        onChange={(e) => setQuantidade(e.target.value)}
                                    />
                                </div>

                                <div className="col-md-6">
                                    <label className="form-label fw-semibold">Bairro em Timbiras <small className="text-danger">*</small></label>
                                    <input type="text" name="cidade" className="form-control rounded-pill px-3" required placeholder="Ex: Centro, Mutirão, Zona Rural..." />
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label fw-semibold">Endereço para Retirada <small className="text-danger">*</small></label>
                                    <input type="text" name="endereco" className="form-control rounded-pill px-3" required placeholder="Rua, número, ponto de referência" />
                                </div>
                                <div className="col-12">
                                    <label className="form-label fw-semibold">Observações / Detalhes</label>
                                    <textarea name="observacoes" className="form-control rounded-3 px-3" rows="2" placeholder="Ex: Horário preferencial para busca, produtos perecíveis..."></textarea>
                                </div>
                                <div className="col-12 mt-3">
                                    <button type="submit" className="btn-solidario w-100 py-3">
                                        Enviar Doação Solidária <i className="bi bi-send ms-2"></i>
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>

                </div>
            </div>
        </section>
    );
}