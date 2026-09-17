import { useEffect, useRef, useState } from 'react';

export default function PlayerAudio() {
    const musicaRef = useRef(null);
    const [tocando, setTocando] = useState(false);
    const [recolhido, setRecolhido] = useState(false);
    const [volume, setVolume] = useState(0.35);
    const [mutado, setMutado] = useState(false);
    const usuarioPausouManual = useRef(false);
    const usuarioMexeuRecolher = useRef(false);

    // Ajustar volume do elemento de áudio
    useEffect(() => {
        if (musicaRef.current) {
            musicaRef.current.volume = volume;
        }
    }, [volume]);

    // Autoplay com rolagem da página e recolhimento automático para não cobrir conteúdo
    useEffect(() => {
        const iniciarMusica = () => {
            if (!usuarioPausouManual.current && musicaRef.current && musicaRef.current.paused) {
                musicaRef.current.play().then(() => {
                    setTocando(true);
                }).catch(() => {
                    // Bloqueio preventivo de navegadores; aguardará próximo gesto
                });
            }
        };

        const handleScroll = () => {
            // 1. Inicia música ao rolar a página
            iniciarMusica();

            // 2. Recolhe automaticamente ao rolar a página para não cobrir texto ou imagem
            if (window.scrollY > 60) {
                setRecolhido(true);
            } else if (window.scrollY < 20 && !usuarioMexeuRecolher.current) {
                // Ao voltar ao topo extremo, reabre se o usuário não tiver recolhido manualmente
                setRecolhido(false);
            }
        };

        // Captura gestos de rolagem, toque e clique para destravar o áudio no navegador
        window.addEventListener('scroll', handleScroll, { passive: true });
        window.addEventListener('wheel', handleScroll, { passive: true });
        window.addEventListener('touchmove', handleScroll, { passive: true });
        window.addEventListener('touchstart', iniciarMusica, { passive: true });
        window.addEventListener('pointerdown', iniciarMusica, { passive: true });
        window.addEventListener('keydown', iniciarMusica, { once: true });
        window.addEventListener('click', iniciarMusica, { once: true });

        // Tentativa de autoplay inicial
        const timerAutoplay = setTimeout(iniciarMusica, 1400);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('wheel', handleScroll);
            window.removeEventListener('touchmove', handleScroll);
            window.removeEventListener('touchstart', iniciarMusica);
            window.removeEventListener('pointerdown', iniciarMusica);
            window.removeEventListener('keydown', iniciarMusica);
            window.removeEventListener('click', iniciarMusica);
            clearTimeout(timerAutoplay);
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
        usuarioMexeuRecolher.current = true;
        setRecolhido(prev => !prev);
    };

    return (
        <>
            {/* Elemento de áudio com caminho relativo e absoluto para compatibilidade total */}
            <audio ref={musicaRef} src="/imagine.mp3" loop preload="auto" />

            <div 
                className={`player-flutuante-emocional ${recolhido ? 'recolhido' : 'expandido'}`} 
                id="playerBox"
                title={recolhido ? "Clique para expandir a trilha sonora" : "Trilha Sonora Solidária — John Lennon (Imagine)"}
                onClick={recolhido ? toggleRecolhido : undefined}
            >
                {/* Botão Play / Pause (sempre visível e clicável) */}
                <button 
                    type="button"
                    id="btnMusica" 
                    onClick={togglePlay} 
                    title={tocando ? "Pausar música" : "Tocar Imagine (John Lennon)"}
                    aria-label={tocando ? "Pausar música" : "Tocar música"}
                >
                    <i className={`bi ${tocando ? 'bi-pause-fill' : 'bi-play-fill'}`}></i>
                </button>

                {/* Modo EXPANDIDO */}
                {!recolhido ? (
                    <div className="conteudo-expansivel">
                        <div className="player-texto">
                            <strong title="Imagine — John Lennon">Imagine</strong>
                            <span>John Lennon (1971)</span>
                        </div>

                        <div className={`equalizador ${tocando ? 'animando' : 'parado'}`} title={tocando ? "Tocando trilha sonora" : "Pausado"}>
                            <span></span><span></span><span></span>
                        </div>

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
                                min="0" 
                                max="1" 
                                step="0.05" 
                                value={mutado ? 0 : volume} 
                                onChange={handleVolume} 
                                onClick={(e) => e.stopPropagation()}
                                title={`Volume: ${Math.round((mutado ? 0 : volume) * 100)}%`} 
                                aria-label="Controle de volume"
                            />
                        </div>

                        <button 
                            type="button"
                            onClick={toggleRecolhido} 
                            className="btn-recolher" 
                            title="Recolher player (minimizar para não cobrir a página)"
                            aria-label="Minimizar player"
                        >
                            <i className="bi bi-chevron-down"></i>
                        </button>
                    </div>
                ) : (
                    /* Modo RECOLHIDO (discreto no canto, não cobre texto nem imagem) */
                    <div className="conteudo-recolhido" onClick={toggleRecolhido}>
                        <span className="badge-recolhido" title="Trilha Sonora: Imagine (John Lennon)">
                            <i className={`bi bi-music-note-beamed ${tocando ? 'text-success note-pulse' : 'text-muted'}`}></i>
                            <span className="mini-rotulo">Imagine</span>
                        </span>
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