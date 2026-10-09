import { useState, useEffect } from 'react';
// 1. Importação do hook do React Router para consumir o contexto vindo do Layout
import { useOutletContext } from 'react-router-dom';
import MovieCard from '../components/MovieCard';

function Home() {
  // 2. Extração dos favoritos e da função alternarFavorito compartilhados pelo Layout (<Outlet context={...} />)
  const { favoritos, alternarFavorito } = useOutletContext();

  // Estados locais para controlar o ciclo de vida da requisição
  const [filmes, setFilmes] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  // Efeito executado apenas na montagem inicial ([])
  useEffect(() => {
    async function carregarFilmesPopulares() {
      try {
        setCarregando(true);
        setErro(null);

        const apiKey = import.meta.env.VITE_TMDB_API_KEY;
        const url = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=pt-BR`;

        const resposta = await fetch(url);

        if (!resposta.ok) {
          throw new Error(`Erro na resposta: status ${resposta.status}`);
        }

        const dados = await resposta.json();
        setFilmes(dados.results || []);
      } catch (err) {
        setErro('Não foi possível carregar os filmes. Verifique sua conexão ou chave de API.');
      } finally {
        setCarregando(false);
      }
    }

    carregarFilmesPopulares();
  }, []);

  // Renderizações condicionais de feedback
  if (carregando) {
    return <p style={{ textAlign: 'center', marginTop: '2rem' }}>Carregando filmes populares...</p>;
  }

  if (erro) {
    return <p style={{ textAlign: 'center', color: '#e50914', marginTop: '2rem' }}>{erro}</p>;
  }

  return (
    <div>
      <h1 style={{ marginBottom: '1.5rem' }}>Filmes Mais Populares</h1>

      <div className="movies-grid">
        {filmes.map((filme) => (
          <MovieCard
            key={filme.id}
            filme={filme}
            // 3. Propriedades necessárias para ativar o botão de favoritar/remover
            aoFavoritar={alternarFavorito}
            isFavorito={favoritos?.some((fav) => fav.id === filme.id)}
          />
        ))}
      </div>
    </div>
  );
}

export default Home;