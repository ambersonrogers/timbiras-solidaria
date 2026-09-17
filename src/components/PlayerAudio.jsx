import { useEffect, useRef, useState } from 'react';

export default function PlayerAudio() {
    const musicaRef = useRef(null);
    const [tocando, setTocando] = useState(false);
    const [recolhido, setRecolhido] = useState(false);
    const [volume, setVolume] = useState(0.35);
    const [mutado, setMutado] = useState(false);
    const usuarioPausouManual = useRef(false);

    // Sincroniza o volume diretamente no elemento HTML5
    useEffect(() => {
        if (musicaRef.current) {
            musicaRef.current.volume = volume;
        }
    }, [volume]);

    // Disparador de reprodução automática com qualquer rolagem (scroll, wheel do mouse, touch) ou interação
    useEffect(() => {
        const tentarIniciarMusica = () => {
            if (usuarioPausouManual.current) return;
            const audio = musicaRef.current;
            if (!audio) return;

            if (audio.paused) {
                const promise = audio.play();
                if (promise !== undefined) {
                    promise.then(() => {
                        setTocando(true);
                    }).catch(() => {
                        // Se o navegador bloquear preventivamente, aguardará a próxima interação de rolagem ou toque
                    });
                }
            }
        };

        // Escuta eventos em window e document para capturar rolagem da bolinha do mouse e toque
        window.addEventListener('wheel', tentarIniciarMusica, { passive: true });
        document.addEventListener('wheel', tentarIniciarMusica, { passive: true });
        window.addEventListener('scroll', tentarIniciarMusica, { passive: true });
        document.addEventListener('scroll', tentarIniciarMusica, { passive: true });
        window.addEventListener('touchmove', tentarIniciarMusica, { passive: true });
        window.addEventListener('touchstart', tentarIniciarMusica, { passive: true });
        window.addEventListener('pointerdown', tentarIniciarMusica, { passive: true });
        window.addEventListener('mousedown', tentarIniciarMusica, { passive: true });
        window.addEventListener('keydown', tentarIniciarMusica, { passive: true });
        window.addEventListener('click', tentarIniciarMusica, { passive: true });
        document.body.addEventListener('mousemove', tentarIniciarMusica, { passive: true });

        // Tentativas automáticas temporizadas
        const t1 = setTimeout(tentarIniciarMusica, 800);
        const t2 = setTimeout(tentarIniciarMusica, 1600);

        return () => {
            window.removeEventListener('wheel', tentarIniciarMusica);
            document.removeEventListener('wheel', tentarIniciarMusica);
            window.removeEventListener('scroll', tentarIniciarMusica);
            document.removeEventListener('scroll', tentarIniciarMusica);
            window.removeEventListener('touchmove', tentarIniciarMusica);
            window.removeEventListener('touchstart', tentarIniciarMusica);
            window.removeEventListener('pointerdown', tentarIniciarMusica);
            window.removeEventListener('mousedown', tentarIniciarMusica);
            window.removeEventListener('keydown', tentarIniciarMusica);
            window.removeEventListener('click', tentarIniciarMusica);
            document.body.removeEventListener('mousemove', tentarIniciarMusica);
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
        setRecolhido(prev => !prev);
    };

    const volumePorcentagem = mutado ? 0 : Math.round(volume * 100);

    return (
        <>
            {/* Elemento de áudio com caminho relativo e absoluto para compatibilidade total */}
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
                title={recolhido ? "Clique para expandir o player da Trilha Solidária" : "Trilha Sonora Solidária — Toque para inspirar!"}
            >
                {/* Botão Play / Pause com círculo verde idêntico ao modelo */}
                <button 
                    type="button"
                    id="btnMusica" 
                    onClick={togglePlay} 
                    title={tocando ? "Pausar música" : "Tocar Trilha Sonora Solidária (Imagine)"}
                    aria-label={tocando ? "Pausar música" : "Tocar música"}
                >
                    <i className={`bi ${tocando ? 'bi-pause-fill' : 'bi-play-fill'}`}></i>
                </button>

                {/* Conteúdo no Modo Expandido */}
                {!recolhido ? (
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

                        {/* Botão Chevron Azul para Recolher (à direita, conforme imagem) */}
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
                ) : (
                    /* Conteúdo no Modo Recolhido (mostra o termo Trilha Solidária e chevron de expandir) */
                    <div className="conteudo-recolhido" onClick={toggleRecolhido} style={{ cursor: 'pointer' }}>
                        <strong className="titulo-trilha-compacto">Trilha Solidária</strong>
                        <button 
                            type="button"
                            className="btn-expandir" 
                            title="Expandir controles do player"
                            aria-label="Expandir controles"
                        >
                            <i className="bi bi-chevron-left"></i>
                        </button>
                    </div>
                )}
            </div>
        </>
    );
}