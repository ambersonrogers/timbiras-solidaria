import { useEffect, useRef, useState } from 'react';

export default function PlayerAudio() {
    const musicaRef = useRef(null);
    const [tocando, setTocando] = useState(false);
    const [recolhido, setRecolhido] = useState(false);
    const [volume, setVolume] = useState(0.35);
    const [mutado, setMutado] = useState(false);
    const usuarioPausouManual = useRef(false);

    useEffect(() => {
        if (musicaRef.current) {
            musicaRef.current.volume = volume;
        }
    }, [volume]);

    useEffect(() => {
        const iniciarMusica = () => {
            if (!tocando && !usuarioPausouManual.current && musicaRef.current) {
                musicaRef.current.play().then(() => {
                    setTocando(true);
                }).catch(() => {});
            }
        };

        window.addEventListener('scroll', iniciarMusica, { passive: true });
        window.addEventListener('click', iniciarMusica, { once: true });
        window.addEventListener('keydown', iniciarMusica, { once: true });

        setTimeout(iniciarMusica, 1000);

        return () => {
            window.removeEventListener('scroll', iniciarMusica);
            window.removeEventListener('click', iniciarMusica);
            window.removeEventListener('keydown', iniciarMusica);
        };
    }, [tocando]);

    const togglePlay = () => {
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
        const val = parseFloat(e.target.value);
        setVolume(val);
        setMutado(val === 0);
        if (musicaRef.current) musicaRef.current.volume = val;
    };

    const toggleMute = () => {
        if (!musicaRef.current) return;
        if (mutado) {
            musicaRef.current.muted = false;
            setMutado(false);
            setVolume(musicaRef.current.volume > 0 ? musicaRef.current.volume : 0.35);
        } else {
            musicaRef.current.muted = true;
            setMutado(true);
        }
    };

    return (
        <>
            {/* Elemento de áudio puxando da pasta public */}
            <audio ref={musicaRef} src="./imagine.mp3" loop preload="auto" />

            <div className={`player-flutuante-emocional ${recolhido ? 'recolhido' : ''}`} id="playerBox" title="Trilha Sonora Solidária">
                <button id="btnMusica" onClick={togglePlay} title="Tocar / Pausar">
                    <i className={`bi ${tocando ? 'bi-pause-fill' : 'bi-play-fill'}`}></i>
                </button>
                
                <div className="conteudo-expansivel" style={{ display: recolhido ? 'none' : 'flex' }}>
                    <div className="player-texto">
                        <strong>Imagine (John Lennon)</strong>
                        <span>Trilha Sonora Solidária (1971)</span>
                    </div>
                    <div className="equalizador" style={{ display: tocando ? 'flex' : 'none' }}>
                        <span></span><span></span><span></span>
                    </div>
                    <div className="controles-audio-inf">
                        <button onClick={toggleMute} className="btn-mute" title="Mutar">
                            <i className={`bi ${mutado || volume === 0 ? 'bi-volume-mute-fill' : 'bi-volume-up-fill'}`}></i>
                        </button>
                        <input type="range" min="0" max="1" step="0.05" value={mutado ? 0 : volume} onChange={handleVolume} title="Volume" />
                    </div>
                </div>

                <button onClick={() => setRecolhido(!recolhido)} className="btn-recolher ms-1" title="Recolher / Expandir">
                    <i className={`bi ${recolhido ? 'bi-chevron-left' : 'bi-chevron-right'}`}></i>
                </button>
            </div>
        </>
    );
}