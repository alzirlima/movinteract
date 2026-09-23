import Navbar from './Navbar';
import { Outlet } from 'react-router-dom';
import '../App.css'; // Ajuste o caminho até o App.css

function Layout() {
  return (
    <div className="app-container">
      <header>
        <Navbar />
      </header>

      <main className="conteudo-principal">
        <Outlet />
      </main>

      <footer className="rodape">
        Francisco Alzir Lima Júnior - Fundação Edson Queiroz - Universidade de Fortaleza
      </footer>
    </div>
  );
}

export default Layout;