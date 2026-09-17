import { useEffect, useMemo, useState } from 'react';
import { CircleMarker, MapContainer, Popup, TileLayer, Tooltip, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { municipiosExpansao } from '../data/siteData';

const timbiras = {
    nome: 'Timbiras',
    ibgeId: 2112307,
    microrregiao: 'Codó',
    coordenadas: [-4.255106, -43.938621],
    filial: 'Sede Principal',
    distanciaKm: 0,
};

function FocoCidade({ cidade }) {
    const mapa = useMap();

    useEffect(() => {
        if (cidade?.coordenadas) {
            mapa.flyTo(cidade.coordenadas, 10, { duration: 1.2 });
        }
    }, [cidade, mapa]);

    return null;
}

export default function ConsumoApi() {
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState('');
    const [municipiosIbge, setMunicipiosIbge] = useState([]);
    const [filtroPesquisa, setFiltroPesquisa] = useState('');
    const [cidadeAtiva, setCidadeAtiva] = useState(timbiras);
    const [buscandoCidade, setBuscandoCidade] = useState(false);
    const [erroBusca, setErroBusca] = useState('');

    const recarregarApi = () => {
        setCarregando(true);
        setErro('');

        fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados/MA/municipios')
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`Erro na requisição à API do IBGE (Status ${response.status})`);
                }
                return response.json();
            })
            .then((dadosJson) => {
                setMunicipiosIbge(dadosJson);
            })
            .catch(() => {
                setErro('Não foi possível carregar os dados da API do IBGE neste momento. Verifique sua conexão.');
            })
            .finally(() => setCarregando(false));
    };

    useEffect(() => {
        const controlador = new AbortController();

        fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados/MA/municipios', {
            signal: controlador.signal,
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`Erro na requisição à API do IBGE (Status ${response.status})`);
                }
                return response.json();
            })
            .then((dadosJson) => {
                setMunicipiosIbge(dadosJson);
            })
            .catch((error) => {
                if (error.name !== 'AbortError') {
                    setErro('Não foi possível carregar os dados da API do IBGE neste momento. Verifique sua conexão.');
                }
            })
            .finally(() => setCarregando(false));

        return () => controlador.abort();
    }, []);

    // Cruza os dados da API do IBGE com os municípios prioritários de expansão
    const cidadesComDadosIbge = useMemo(() => {
        const mapaIbge = new Map(
            municipiosIbge.map((item) => [
                item.nome.trim().toLowerCase(),
                {
                    id: item.id,
                    microrregiao: item.microrregiao?.nome || 'Maranhão',
                    mesorregiao: item.microrregiao?.mesorregiao?.nome || 'Maranhão',
                },
            ])
        );

        return [
            timbiras,
            ...municipiosExpansao.map((m) => {
                const chave = (m.apiNome || m.nome).trim().toLowerCase();
                const infoIbge = mapaIbge.get(chave);
                return {
                    ...m,
                    ibgeId: infoIbge ? infoIbge.id : 'Consultando...',
                    microrregiao: infoIbge ? infoIbge.microrregiao : 'Região dos Cocais',
                    mesorregiao: infoIbge ? infoIbge.mesorregiao : 'Leste Maranhense',
                };
            }),
        ];
    }, [municipiosIbge]);

    // Filtro para os cards rápidos regionais
    const cidadesFiltradas = useMemo(() => {
        if (!filtroPesquisa.trim()) return cidadesComDadosIbge.slice(0, 8);
        const termo = filtroPesquisa.trim().toLowerCase();
        return cidadesComDadosIbge.filter((c) =>
            c.nome.toLowerCase().includes(termo) ||
            c.microrregiao.toLowerCase().includes(termo)
        );
    }, [cidadesComDadosIbge, filtroPesquisa]);

    // Busca personalizada via OpenStreetMap Nominatim
    const marcarCidadePersonalizada = async (evento) => {
        evento.preventDefault();
        const busca = filtroPesquisa.trim();
        if (!busca) return;

        // Primeiro verifica se é um município do Maranhão que já temos na lista do IBGE
        const cidadeEncontrada = cidadesComDadosIbge.find(
            (c) => c.nome.toLowerCase() === busca.toLowerCase()
        );

        if (cidadeEncontrada && cidadeEncontrada.coordenadas) {
            setCidadeAtiva(cidadeEncontrada);
            setErroBusca('');
            return;
        }

        setBuscandoCidade(true);
        setErroBusca('');
        try {
            const resposta = await fetch(
                `https://nominatim.openstreetmap.org/search?format=jsonv2&limit=1&countrycodes=br&addressdetails=1&q=${encodeURIComponent(
                    `${busca}, Maranhão`
                )}`
            );
            if (!resposta.ok) throw new Error('Não foi possível consultar a localidade.');
            const resultados = await resposta.json();
            const resultado = resultados[0];
            if (!resultado) throw new Error(`Cidade "${busca}" não encontrada no Maranhão.`);

            const nome =
                resultado.address?.city ??
                resultado.address?.town ??
                resultado.address?.municipality ??
                resultado.name;

            setCidadeAtiva({
                nome,
                ibgeId: 'Consulta Externa',
                microrregiao: 'Região Maranhense',
                coordenadas: [Number(resultado.lat), Number(resultado.lon)],
                filial: `${nome}-Solidária`,
                distanciaKm: 'Calculando...',
            });
        } catch (error) {
            setErroBusca(error.message);
        } finally {
            setBuscandoCidade(false);
        }
    };

    return (
        <section id="rede-expansao" className="bg-light py-5 border-top border-bottom">
            <div className="container">
                <div className="p-4 p-lg-5 bg-white rounded-4 shadow-sm border-start border-success border-4">
                    
                    {/* Cabeçalho da Seção de Consumo de Dados */}
                    <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-4">
                        <div>
                            <span className="badge bg-success-subtle text-success px-3 py-2 rounded-pill fw-semibold mb-2">
                                <i className="bi bi-cloud-arrow-down-fill me-1"></i> Consumo de Dados em Tempo Real
                            </span>
                            <h3 className="fw-bold text-success mb-1">
                                <i className="bi bi-signpost-2-fill me-2"></i> Rota da Solidariedade & API do IBGE
                            </h3>
                            <p className="text-muted small mb-0">
                                Integração com a <strong>Fetch API</strong> consultando a base de dados do IBGE para o Maranhão.
                            </p>
                        </div>
                        <div className="text-end">
                            <span className="badge bg-primary-subtle text-primary px-3 py-2 rounded-pill fs-7">
                                <i className="bi bi-database-check me-1"></i> {municipiosIbge.length} Municípios MA Carregados
                            </span>
                        </div>
                    </div>

                    {/* Barra de Busca e Seleção Rápida */}
                    <div className="row g-3 mb-4">
                        <div className="col-lg-7">
                            <form className="input-group" onSubmit={marcarCidadePersonalizada}>
                                <input
                                    type="search"
                                    className="form-control"
                                    value={filtroPesquisa}
                                    onChange={(evento) => setFiltroPesquisa(evento.target.value)}
                                    placeholder="Buscar cidade parceira ou município do MA..."
                                    aria-label="Buscar cidade no mapa"
                                />
                                <button className="btn btn-success" type="submit" disabled={buscandoCidade}>
                                    <i className="bi bi-search me-1"></i>
                                    {buscandoCidade ? 'Localizando...' : 'Localizar'}
                                </button>
                            </form>
                        </div>
                        <div className="col-lg-5">
                            <select
                                className="form-select"
                                value={cidadeAtiva.nome}
                                onChange={(e) => {
                                    const selecionada = cidadesComDadosIbge.find((c) => c.nome === e.target.value);
                                    if (selecionada) setCidadeAtiva(selecionada);
                                }}
                                aria-label="Selecione um município parceiro"
                            >
                                <option value="">-- Cidades da Rede Solidária --</option>
                                {cidadesComDadosIbge.map((c) => (
                                    <option key={c.nome} value={c.nome}>
                                        {c.nome} {c.distanciaKm ? `(${c.distanciaKm} km)` : '(Sede)'}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {erroBusca && (
                        <div className="alert alert-warning py-2 mb-3 small">
                            <i className="bi bi-exclamation-triangle-fill me-2"></i>{erroBusca}
                        </div>
                    )}

                    {/* Exibição dos Estados da API: Carregamento ou Erro */}
                    {carregando && (
                        <div className="text-center py-4 bg-light rounded-3 mb-4">
                            <div className="spinner-border text-success mb-2" role="status">
                                <span className="visually-hidden">Carregando dados da API...</span>
                            </div>
                            <p className="text-muted small mb-0">Consultando API pública do IBGE (Serviço de Localidades)...</p>
                        </div>
                    )}

                    {erro && (
                        <div className="alert alert-danger d-flex align-items-center justify-content-between p-3 rounded-3 mb-4">
                            <div>
                                <i className="bi bi-exclamation-octagon-fill me-2 fs-5"></i>
                                <span>{erro}</span>
                            </div>
                            <button className="btn btn-sm btn-outline-danger" onClick={recarregarApi}>
                                <i className="bi bi-arrow-clockwise me-1"></i> Recarregar API
                            </button>
                        </div>
                    )}

                    {/* Cards Visuais com Dados Recebidos no Formato JSON da API do IBGE */}
                    {!carregando && !erro && (
                        <div className="mb-4">
                            <div className="d-flex justify-content-between align-items-center mb-2">
                                <span className="fw-semibold text-dark small">
                                    <i className="bi bi-buildings me-1 text-success"></i> Municípios da Rede (Dados oficiais da API):
                                </span>
                                <small className="text-muted">Clique para focar no mapa interativo</small>
                            </div>
                            <div className="row g-2">
                                {cidadesFiltradas.map((cidade) => {
                                    const estaAtiva = cidadeAtiva.nome === cidade.nome;
                                    return (
                                        <div className="col-sm-6 col-md-4 col-lg-3" key={cidade.nome}>
                                            <div
                                                onClick={() => setCidadeAtiva(cidade)}
                                                className={`p-3 rounded-3 border h-100 cursor-pointer transition-all ${
                                                    estaAtiva
                                                        ? 'border-success bg-success-subtle shadow-sm'
                                                        : 'border-light-subtle bg-light hover-shadow'
                                                }`}
                                                style={{ cursor: 'pointer' }}
                                                role="button"
                                                tabIndex={0}
                                                onKeyDown={(e) => { if (e.key === 'Enter') setCidadeAtiva(cidade); }}
                                            >
                                                <div className="d-flex justify-content-between align-items-start mb-1">
                                                    <strong className="text-success">{cidade.nome}</strong>
                                                    {estaAtiva ? (
                                                        <span className="badge bg-success">Ativa</span>
                                                    ) : (
                                                        <span className="badge bg-light text-secondary border">
                                                            {cidade.distanciaKm === 0 ? 'Sede' : `${cidade.distanciaKm} km`}
                                                        </span>
                                                    )}
                                                </div>
                                                <div className="small text-muted mb-1">
                                                    <span>Micro: {cidade.microrregiao}</span>
                                                </div>
                                                <div className="d-flex justify-content-between align-items-center">
                                                    <span className="badge bg-secondary-subtle text-secondary" style={{ fontSize: '0.7rem' }}>
                                                        IBGE: {cidade.ibgeId}
                                                    </span>
                                                    <span className="text-success small fw-semibold">
                                                        <i className="bi bi-geo-alt-fill"></i>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                    {/* Mapa Interativo com Cidades Parceiras */}
                    <div className="mapa-rede mb-3" aria-label="Mapa das cidades previstas para expansão">
                        <MapContainer center={timbiras.coordenadas} zoom={7} scrollWheelZoom={false}>
                            <FocoCidade cidade={cidadeAtiva} />
                            <TileLayer
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />

                            {/* Marcadores de todas as cidades parceiras com dados */}
                            {cidadesComDadosIbge.map((cidade) => {
                                const ehSede = cidade.nome === 'Timbiras';
                                const ehAtiva = cidadeAtiva.nome === cidade.nome;
                                return (
                                    <CircleMarker
                                        key={cidade.nome}
                                        center={cidade.coordenadas}
                                        pathOptions={{
                                            color: ehAtiva ? '#ffc107' : (ehSede ? '#009e49' : '#0099ff'),
                                            fillColor: ehAtiva ? '#0d6efd' : (ehSede ? '#009e49' : '#0099ff'),
                                            fillOpacity: ehAtiva ? 1 : 0.8,
                                            weight: ehAtiva ? 5 : 2,
                                        }}
                                        radius={ehAtiva ? 11 : (ehSede ? 9 : 7)}
                                        eventHandlers={{
                                            click: () => setCidadeAtiva(cidade),
                                        }}
                                    >
                                        <Tooltip direction="top" offset={[0, -8]} className="cidade-tooltip">
                                            {cidade.nome}
                                        </Tooltip>
                                        <Popup>
                                            <div className="p-1">
                                                <strong className="text-success">{cidade.nome} (MA)</strong>
                                                <div className="small text-muted">
                                                    {ehSede ? 'Sede da Iniciativa Timbiras Solidária' : `Polo de Expansão: ${cidade.filial || cidade.nome}`}
                                                </div>
                                                <hr className="my-1" />
                                                <div className="small">
                                                    <strong>Código IBGE:</strong> {cidade.ibgeId}<br />
                                                    <strong>Microrregião:</strong> {cidade.microrregiao}<br />
                                                    {cidade.distanciaKm ? <><strong>Distância de Timbiras:</strong> {cidade.distanciaKm} km</> : null}
                                                </div>
                                            </div>
                                        </Popup>
                                    </CircleMarker>
                                );
                            })}
                        </MapContainer>
                    </div>

                    <div className="d-flex flex-wrap justify-content-between align-items-center text-muted small pt-2 border-top">
                        <span>
                            <i className="bi bi-info-circle me-1"></i> Cidade ativa selecionada: <strong>{cidadeAtiva.nome}</strong> (Cód. IBGE: {cidadeAtiva.ibgeId})
                        </span>
                        <span>
                            Quer levar este movimento para sua cidade? <a href="#contato" className="text-success fw-semibold">Fale conosco</a>
                        </span>
                    </div>

                </div>
            </div>
        </section>
    );
}