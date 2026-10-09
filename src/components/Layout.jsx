import { useState, useEffect } from 'react';
import Navbar from './Navbar';
import { Outlet } from 'react-router-dom';

function Layout() {
  // Inicialização lendo do localStorage
  const [favoritos, setFavoritos] = useState(() => {
    const salvos = localStorage.getItem('filmes_favoritos');
    return salvos ? JSON.parse(salvos) : [];
  });

  // Função para alternar o status respeitando a imutabilidade
  function alternarFavorito(filme) {
    const jaExiste = favoritos.some((item) => item.id === filme.id);
    let novaLista = [];

    if (jaExiste) {
      // Remoção imutável usando filter
      novaLista = favoritos.filter((item) => item.id !== filme.id);
    } else {
      // Adição imutável usando spread operator
      novaLista = [...favoritos, filme];
    }

    setFavoritos(novaLista);
    localStorage.setItem('filmes_favoritos', JSON.stringify(novaLista));
  }

  return (
    <div className="app-container">
      <header>
        <Navbar />
      </header>

      <main className="conteudo-principal">
        {/* Disponibiliza o contexto para todas as rotas filhas */}
        <Outlet context={{ favoritos, alternarFavorito }} />
      </main>

      <footer className="rodape">
        Francisco Alzir Lima Júnior - Fundação Edson Queiroz - Universidade de Fortaleza
      </footer>
    </div>
  );
}

export default Layout;