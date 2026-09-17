import { useState } from 'react';
import SplashScreen from './components/SplashScreen';
import PlayerAudio from './components/PlayerAudio';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ConsumoApi from './components/ConsumoApi';
import SobreCompleto from './components/SobreCompleto';
import ComoFunciona from './components/ComoFunciona';
import Fluxo from './components/Fluxo';
import PrestacaoContas from './components/PrestacaoContas';
import Doar from './components/Doar';
import Contato from './components/Contato';
import Footer from './components/Footer';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './index.css';

function App() {
  const [totalDoacoes, setTotalDoacoes] = useState(() => {
    try {
      const doacoesSalvas = JSON.parse(localStorage.getItem('doacoes') || '[]');
      return 12 + (Array.isArray(doacoesSalvas) ? doacoesSalvas.length : 0);
    } catch {
      return 12;
    }
  });

  const handleNovaDoacao = () => {
    setTotalDoacoes(prev => prev + 1);
  };

  return (
    <div>
      <SplashScreen />
      <PlayerAudio />
      <Navbar />
      <main>
        <Hero totalDoacoes={totalDoacoes} />
        <ConsumoApi />
        <SobreCompleto />
        <ComoFunciona />
        <Fluxo />
        <PrestacaoContas />
        <Doar onDoacaoSucesso={handleNovaDoacao} />
        <Contato />
      </main>
      <Footer />
    </div>
  );
}

export default App;