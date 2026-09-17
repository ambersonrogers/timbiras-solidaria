import { useEffect, useRef, useState } from 'react';

export default function PlayerAudio() {
    const musicaRef = useRef(null);
    const [tocando, setTocando] = useState(false);
    const [recolhido, setRecolhido] = useState(() => typeof window !== 'undefined' && window.innerWidth <= 576);
    const [volume, setVolume] = useState(0.35);
    const [mutado, setMutado] = useState(false);
    const usuarioPausouManual = useRef(false);
    const usuarioControlouManual = useRef(false);

    // Sincroniza o volume diretamente no elemento HTML5
    useEffect(() => {
        if (musicaRef.current) {
            musicaRef.current.volume = volume;
        }
    }, [volume]);

    // Controle de estado e reprodução automática (scroll, wheel da bolinha do mouse, clique ou toque)
    useEffect(() => {
        const audio = musicaRef.current;
        if (audio && audio.readyState === 0) {
            audio.load();
        }

        const tentarIniciarMusica = () => {
            if (usuarioPausouManual.current) return;
            const el = musicaRef.current;
            if (!el) return;

            if (el.paused) {
                const promise = el.play();
                if (promise !== undefined) {
                    promise.then(() => {
                        setTocando(true);
                    }).catch(() => {
                        // Navegador aguarda o primeiro clique físico caso a política seja estrita
                    });
                }
            }
        };

        const handleScrollPosicao = () => {
            // 1. Tenta iniciar música ao rolar ou mexer na bolinha do mouse
            tentarIniciarMusica();

            // 2. Regra: Aberto inteiro SOMENTE na tela inicial da página (Hero / topo)
            // Nas outras seções (telas), recolhe automaticamente para não cobrir textos e imagens
            const scrollAtual = window.scrollY || document.documentElement.scrollTop;
            if (scrollAtual > 80) {
                setRecolhido(true);
            } else if (scrollAtual <= 40) {
                usuarioControlouManual.current = false;
                setRecolhido(false);
            }
        };

        // Ouvintes globais em fase de CAPTURA para garantir disparo com clique, toque ou bolinha do mouse
        const options = { capture: true, passive: true };
        window.addEventListener('wheel', handleScrollPosicao, options);
        document.addEventListener('wheel', handleScrollPosicao, options);
        window.addEventListener('scroll', handleScrollPosicao, options);
        document.addEventListener('scroll', handleScrollPosicao, options);
        window.addEventListener('touchmove', handleScrollPosicao, options);
        
        window.addEventListener('pointerdown', tentarIniciarMusica, options);
        document.addEventListener('pointerdown', tentarIniciarMusica, options);
        window.addEventListener('mousedown', tentarIniciarMusica, options);
        document.addEventListener('mousedown', tentarIniciarMusica, options);
        window.addEventListener('click', tentarIniciarMusica, options);
        document.addEventListener('click', tentarIniciarMusica, options);
        window.addEventListener('touchstart', tentarIniciarMusica, options);
        window.addEventListener('keydown', tentarIniciarMusica, options);

        // Tentativas de autoplay inicial
        const t1 = setTimeout(tentarIniciarMusica, 400);
        const t2 = setTimeout(tentarIniciarMusica, 1000);

        return () => {
            window.removeEventListener('wheel', handleScrollPosicao, true);
            document.removeEventListener('wheel', handleScrollPosicao, true);
            window.removeEventListener('scroll', handleScrollPosicao, true);
            document.removeEventListener('scroll', handleScrollPosicao, true);
            window.removeEventListener('touchmove', handleScrollPosicao, true);
            window.removeEventListener('pointerdown', tentarIniciarMusica, true);
            document.removeEventListener('pointerdown', tentarIniciarMusica, true);
            window.removeEventListener('mousedown', tentarIniciarMusica, true);
            document.removeEventListener('mousedown', tentarIniciarMusica, true);
            window.removeEventListener('click', tentarIniciarMusica, true);
            document.removeEventListener('click', tentarIniciarMusica, true);
            window.removeEventListener('touchstart', tentarIniciarMusica, true);
            window.removeEventListener('keydown', tentarIniciarMusica, true);
            clearTimeout(t1);
            clearTimeout(t2);
        };
    }, []);

    const togglePlay = (e) => {
        if (e) e.stopPropagation();
        if (!musicaRef.current) return;

        if (musicaRef.current.paused) {
            musicaRef.current.play().then(() => {
                setTocando(true);
                usuarioPausouManual.current = false;
            }).catch(() => {});
        } else {
            musicaRef.current.pause();
            setTocando(false);
            usuarioPausouManual.current = true;
        }
    };

    const handleVolume = (e) => {
        if (e) e.stopPropagation();
        const val = parseFloat(e.target.value);
        setVolume(val);
        setMutado(val === 0);
        if (musicaRef.current) {
            musicaRef.current.volume = val;
            musicaRef.current.muted = (val === 0);
        }
    };

    const toggleMute = (e) => {
        if (e) e.stopPropagation();
        if (!musicaRef.current) return;
        if (mutado || volume === 0) {
            musicaRef.current.muted = false;
            setMutado(false);
            const novoVol = volume > 0 ? volume : 0.35;
            setVolume(novoVol);
            musicaRef.current.volume = novoVol;
        } else {
            musicaRef.current.muted = true;
            setMutado(true);
        }
    };

    const toggleRecolhido = (e) => {
        if (e) e.stopPropagation();
        usuarioControlouManual.current = true;
        setRecolhido(prev => !prev);
    };

    const volumePorcentagem = mutado ? 0 : Math.round(volume * 100);

    return (
        <>
            {/* Elemento de áudio da Trilha Sonora Solidária */}
            <audio 
                ref={musicaRef} 
                src="/imagine.mp3" 
                loop 
                preload="auto"
                onPlay={() => setTocando(true)}
                onPause={() => setTocando(false)}
            />

            <div 
                className={`player-flutuante-emocional ${recolhido ? 'recolhido' : 'expandido'}`} 
                id="playerBox"
                title={recolhido ? (tocando ? "Trilha Sonora Solidária (Imagine) — Pausar" : "Trilha Sonora Solidária (Imagine) — Tocar") : "Trilha Sonora Solidária — Toque para inspirar!"}
            >
                {/* Botão Play / Pause (círculo verde conforme o modelo original) */}
                <button 
                    type="button"
                    id="btnMusica" 
                    onClick={togglePlay} 
                    title={tocando ? "Pausar música (Imagine - John Lennon)" : "Tocar Trilha Sonora Solidária (Imagine)"}
                    aria-label={tocando ? "Pausar música" : "Tocar música"}
                >
                    <i className={`bi ${tocando ? 'bi-pause-fill' : 'bi-play-fill'}`}></i>
                </button>

                {/* No Modo Recolhido: apenas o squircle com o botão play/pause verde (fiel à imagem do usuário) */}
                {!recolhido && (
                    <div className="conteudo-expansivel">
                        {/* Texto com o termo Trilha Sonora Solidária e Toque para inspirar */}
                        <div className="player-texto" onClick={togglePlay} style={{ cursor: 'pointer' }}>
                            <strong className="titulo-trilha">Trilha Sonora Solidária</strong>
                            <span className="subtitulo-trilha">
                                {tocando ? 'Imagine (John Lennon)' : 'Toque para inspirar!'}
                            </span>
                        </div>

                        {/* Controles de Volume: Ícone azul e slider personalizado */}
                        <div className="controles-audio-inf">
                            <button 
                                type="button"
                                onClick={toggleMute} 
                                className="btn-mute" 
                                title={mutado || volume === 0 ? "Ativar som" : "Desativar som (mutar)"}
                                aria-label="Controle de som"
                            >
                                <i className={`bi ${mutado || volume === 0 ? 'bi-volume-mute-fill text-danger' : 'bi-volume-up-fill'}`}></i>
                            </button>
                            <input 
                                type="range" 
                                className="slider-volume-timbiras"
                                min="0" 
                                max="1" 
                                step="0.05" 
                                value={mutado ? 0 : volume} 
                                onChange={handleVolume} 
                                onClick={(e) => e.stopPropagation()}
                                style={{ '--vol-pct': `${volumePorcentagem}%` }}
                                title={`Volume: ${volumePorcentagem}%`} 
                                aria-label="Controle de volume"
                            />
                        </div>

                        {/* Botão Chevron Azul para Recolher manualmente */}
                        <button 
                            type="button"
                            onClick={toggleRecolhido} 
                            className="btn-recolher" 
                            title="Recolher player"
                            aria-label="Recolher player"
                        >
                            <i className="bi bi-chevron-right"></i>
                        </button>
                    </div>
                )}
            </div>
        </>
    );
}