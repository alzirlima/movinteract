import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Importação do Layout base
import Layout from './components/Layout';

// Importação das Páginas
import Home from './pages/Home';
import Detalhes from './pages/Detalhes';
import Busca from './pages/Busca';
import Favoritos from './pages/Favoritos';
import NaoEncontrada from './pages/NaoEncontrada';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rota Pai: renderiza o Layout compartilhado (Navbar, Outlet e Footer) */}
        <Route path="/" element={<Layout />}>
          {/* Rota padrão (index): carrega a Home em "/" dentro do <Outlet /> */}
          <Route index element={<Home />} />

          {/* Rota dinâmica: captura o ID do filme (Entregável 3) */}
          <Route path="filme/:id" element={<Detalhes />} />

          {/* Rota de busca (Entregável 4) */}
          <Route path="busca" element={<Busca />} />

          {/* Rota de favoritos salvos (Entregável 5) */}
          <Route path="favoritos" element={<Favoritos />} />
        </Route>

        {/* Rota Coringa 404: captura qualquer endereço inválido */}
        <Route path="*" element={<NaoEncontrada />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;