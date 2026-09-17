import { useEffect, useState } from 'react';

export default function SplashScreen() {
    const [hidden, setHidden] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setHidden(true);
        }, 1200);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div 
            id="splash-screen" 
            className={hidden ? 'hidden' : ''} 
            onClick={() => setHidden(true)}
            style={{ cursor: 'pointer' }}
            title="Clique para entrar no site"
        >
            <span className="particle" style={{ top: '15%', left: '10%' }}>🌾</span>
            <span className="particle" style={{ top: '20%', right: '15%' }}>🥕</span>
            <span className="particle" style={{ bottom: '25%', left: '20%' }}>🍅</span>
            <span className="particle" style={{ bottom: '20%', right: '12%' }}>🌽</span>

            <div className="splash-content">
                <div className="splash-scene">
                    <span className="person-1">👨‍🌾</span>
                    <span className="food-basket">🧺</span>
                    <span className="heart-float">❤️</span>
                    <span className="person-2">👨‍👩‍👧</span>
                </div>
                <h1 className="splash-title">Timbiras Solidária 🇧🇷🏹</h1>
                <p className="splash-subtitle">Iniciativa local rumo ao impacto global — ODS 2</p>
            </div>
        </div>
    );
}