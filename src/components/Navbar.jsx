import { useState } from 'react';

const navItems = [
    { label: 'Início', href: '#inicio' },
    { label: 'Sobre & Expansão', href: '#sobre' },
    { label: 'Prestação de Contas', href: '#prestacao-contas' },
    { label: 'Fluxo de Doação', href: '#fluxo' },
    { label: 'Quero Doar', href: '#doar' },
    { label: 'Contato', href: '#contato' },
];

export default function Navbar() {
    const [menuAberto, setMenuAberto] = useState(false);

    return (
        <header>
            <nav className="navbar navbar-expand-lg navbar-light sticky-top bg-white shadow-sm">
                <div className="container">
                    <a className="navbar-brand d-flex align-items-center gap-2" href="#inicio">
                        <img
                            src="./img/bandeira.gif"
                            alt="Bandeira de Timbiras"
                            style={{ width: '32px', height: '22px', borderRadius: '3px', objectFit: 'cover', border: '1px solid #ddd' }}
                        />
                        <span className="fw-bold text-success">Timbiras Solidária 🏹</span>
                    </a>
                    
                    <button
                        className="navbar-toggler border-0"
                        type="button"
                        onClick={() => setMenuAberto(prev => !prev)}
                        aria-controls="navbarNav"
                        aria-expanded={menuAberto}
                        aria-label="Alternar menu de navegação"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className={`collapse navbar-collapse justify-content-end ${menuAberto ? 'show' : ''}`} id="navbarNav">
                        <div className="navbar-nav gap-2 gap-lg-3 align-items-lg-center pt-3 pt-lg-0 text-center text-lg-start">
                            {navItems.map((item) => (
                                <a
                                    className="nav-link"
                                    href={item.href}
                                    key={item.label}
                                    onClick={() => setMenuAberto(false)}
                                >
                                    {item.label}
                                </a>
                            ))}
                            <a
                                className="btn-solidario text-white text-decoration-none"
                                href="#doar"
                                onClick={() => setMenuAberto(false)}
                            >
                                Doar Agora
                            </a>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    );
}