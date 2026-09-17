import { footerLinks, redesSociais } from '../data/siteData';

export default function Footer() {
    return (
        <footer>
            <div className="container">
                <div className="row g-4">
                    <div className="col-md-5">
                        <h4 className="h5 fw-bold mb-2">Timbiras Solidária 🇧🇷🏹</h4>
                        <p className="mb-3">Plataforma comunitária de apoio à segurança alimentar — Objetivo de Desenvolvimento Sustentável ODS 2 da ONU.</p>
                        <p className="small text-success mb-2"><i className="bi bi-pin-map-fill"></i> Desenvolvido pela Equipe Timbiranos — Timbiras — Maranhão</p>
                        <p className="small mb-2"><strong>Integrantes:</strong><br />Amberson Lindoso • Kelly Sousa • Jhony Fernandes • Weldes Reis</p>
                        <span className="small">© 2026 — Todos os direitos reservados.</span>
                    </div>
                    <div className="col-md-3">
                        <h5 className="h6 fw-bold mb-2">Links Rápidos</h5>
                        <ul className="list-unstyled small">
                            {footerLinks.map((link) => (
                                <li key={link.label}><a href={link.href}>{link.label}</a></li>
                            ))}
                        </ul>
                    </div>
                    <div className="col-md-4">
                        <h5 className="h6 fw-bold mb-2">Redes Sociais</h5>
                        <div className="d-flex gap-3 fs-5">
                            {redesSociais.map((rede) => (
                                <a href={rede.href} key={rede.icon}><i className={`bi ${rede.icon}`}></i></a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}