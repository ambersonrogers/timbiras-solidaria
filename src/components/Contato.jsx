import { useState } from 'react';
import { contatoInfo } from '../data/siteData';

export default function Contato() {
    const [enviado, setEnviado] = useState(false);

    const handleContato = (e) => {
        e.preventDefault();
        setEnviado(true);
        setTimeout(() => setEnviado(false), 3500);
        e.target.reset();
    };

    return (
        <section id="contato">
            <div className="container">
                <div className="row g-5">
                    <div className="col-lg-6">
                        <h2 className="fw-bold">Entre em Contato</h2>
                        <p className="text-muted">Dúvidas, sugestões ou parcerias em Timbiras e região? Fale conosco!</p>
                        <ul className="list-unstyled mt-4">
                            {contatoInfo.map((item) => (
                                <li className="mb-3" key={item.text}><i className={`bi ${item.icon} text-success me-2`}></i> {item.text}</li>
                            ))}
                        </ul>
                    </div>
                    <div className="col-lg-6">
                        <form onSubmit={handleContato} className="bg-white p-4 rounded-4 shadow-sm">
                            {enviado && <div className="alert alert-success py-2 mb-3">✅ Mensagem enviada com sucesso!</div>}
                            <div className="mb-3">
                                <label className="form-label fw-semibold">Seu Nome <small>*</small></label>
                                <input type="text" name="nome" className="form-control rounded-pill px-3" required />
                            </div>
                            <div className="mb-3">
                                <label className="form-label fw-semibold">Seu E-mail <small>*</small></label>
                                <input type="email" name="email" className="form-control rounded-pill px-3" required />
                            </div>
                            <div className="mb-3">
                                <label className="form-label fw-semibold">Seu Bairro / Local</label>
                                <input type="text" name="local" className="form-control rounded-pill px-3" placeholder="Ex: Centro, Timbiras - MA" />
                            </div>
                            <div className="mb-3">
                                <label className="form-label fw-semibold">Mensagem <small>*</small></label>
                                <textarea name="mensagem" className="form-control rounded-3 px-3" rows="4" required></textarea>
                            </div>
                            <button type="submit" className="btn-solidario w-100">Enviar Mensagem</button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}