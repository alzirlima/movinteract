import { useState } from 'react';
// 1. Hook para acessar os favoritos e a função do Layout (<Outlet context={...} />)
import { useOutletContext } from 'react-router-dom';
import MovieCard from '../components/MovieCard';

function Busca() {
  // 2. Extração dos favoritos e da função de alternar favoritados
  const { favoritos, alternarFavorito } = useOutletContext();

  // Estados locais do formulário e da busca
  const [termoBusca, setTermoBusca] = useState('');
  const [filmes, setFilmes] = useState([]);
  const [carregando, setCarregando] = useState(false);
  const [erroValidacao, setErroValidacao] = useState('');
  const [pesquisaFeita, setPesquisaFeita] = useState(false);

  // Manipulador de submissão do formulário
  async function tratarSubmissao(e) {
    // Impede o recarregamento tradicional da página
    e.preventDefault();

    // Validação obrigatória: bloqueia buscas vazias ou apenas com espaços (.trim())
    if (termoBusca.trim() === '') {
      setErroValidacao('Por favor, digite o nome de um filme antes de pesquisar.');
      return;
    }

    setErroValidacao('');
    setCarregando(true);
    setPesquisaFeita(true);

    try {
      const apiKey = import.meta.env.VITE_TMDB_API_KEY;
      const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=pt-BR&query=${encodeURIComponent(termoBusca.trim())}`;

      const resposta = await fetch(url);

      if (!resposta.ok) {
        throw new Error(`Falha na busca: status ${resposta.status}`);
      }

      const dados = await resposta.json();
      setFilmes(dados.results || []);
    } catch (err) {
      setErroValidacao('Ocorreu um erro ao buscar os filmes. Tente novamente mais tarde.');
      setFilmes([]);
    } finally {
      setCarregando(false);
    }
  }

  return (
    <div>
      <h1 style={{ marginBottom: '1.5rem' }}>Buscar Filmes</h1>

      {/* Formulário controlado com onSubmit */}
      <form onSubmit={tratarSubmissao} className="form-busca">
        <input
          type="text"
          placeholder="Digite o título do filme..."
          value={termoBusca}
          onChange={(e) => setTermoBusca(e.target.value)}
          className="input-busca"
        />
        <button type="submit" className="btn-busca">
          Pesquisar
        </button>
      </form>

      {/* Feedback de erro/validação */}
      {erroValidacao && (
        <p style={{ color: '#e50914', marginTop: '1rem', fontWeight: '500' }}>
          {erroValidacao}
        </p>
      )}

      {/* Indicador de carregamento */}
      {carregando && (
        <p style={{ textAlign: 'center', marginTop: '2rem' }}>Pesquisando filmes...</p>
      )}

      {/* Feedback visual quando nenhum resultado for encontrado */}
      {!carregando && pesquisaFeita && filmes.length === 0 && !erroValidacao && (
        <p style={{ textAlign: 'center', marginTop: '2rem', color: '#aaaaaa' }}>
          Nenhum filme encontrado para o termo pesquisado.
        </p>
      )}

      {/* Renderização dos resultados reaproveitando MovieCard e botão de favoritos */}
      {!carregando && filmes.length > 0 && (
        <div className="movies-grid">
          {filmes.map((filme) => (
            <MovieCard
              key={filme.id}
              filme={filme}
              aoFavoritar={alternarFavorito}
              isFavorito={favoritos?.some((fav) => fav.id === filme.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Busca;