import { passosComoFunciona } from '../data/siteData';

export default function ComoFunciona() {

    return (
        <section id="como-funciona" className="bg-alt py-5">
            <div className="container">
                <div className="text-center mb-5">
                    <h2 className="fw-bold">Como Funciona</h2>
                    <p className="text-muted">Em poucos passos qualquer cidadão, empresa ou órgão pode ajudar em Timbiras.</p>
                </div>
                <div className="row g-4 text-center">
                    {passosComoFunciona.map((item) => (
                        <div className="col-md-3" key={item.numero}>
                            <div className="p-4 bg-white rounded-4 shadow-sm h-100">
                                <div className="bg-success-subtle text-success rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{ width: '60px', height: '60px', fontSize: '24px', fontWeight: 'bold' }}>
                                    {item.numero}
                                </div>
                                <h4 className="h6 fw-bold">{item.titulo}</h4>
                                <p className="text-muted small">{item.descricao}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}