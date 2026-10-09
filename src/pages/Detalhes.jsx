import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function Detalhes() {
  // 1. Extração do parâmetro dinâmico da URL (:id definido no App.jsx)
  const { id } = useParams();

  // 2. Hook de navegação programática para o histórico do navegador
  const navigate = useNavigate();

  // 3. Estados locais para gerenciar o ciclo assíncrono
  const [filme, setFilme] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  // 4. Efeito colateral acoplado à dependência [id]
  useEffect(() => {
    async function carregarDetalhes() {
      try {
        setCarregando(true);
        setErro(null);

        const apiKey = import.meta.env.VITE_TMDB_API_KEY;
        // Endpoint individual do filme com o id dinâmico
        const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=pt-BR`;

        const resposta = await fetch(url);

        if (!resposta.ok) {
          throw new Error(`Falha ao obter detalhes: status ${resposta.status}`);
        }

        const dados = await resposta.json();
        setFilme(dados);
      } catch (err) {
        setErro('Não foi possível carregar os detalhes do filme.');
      } finally {
        setCarregando(false);
      }
    }

    carregarDetalhes();
  }, [id]); // Executa novamente sempre que o parâmetro 'id' da rota mudar

  // 5. Renderização Condicional: Carregamento
  if (carregando) {
    return <p style={{ textAlign: 'center', marginTop: '2rem' }}>Carregando detalhes do filme...</p>;
  }

  // 6. Renderização Condicional: Erro
  if (erro) {
    return (
      <div style={{ textAlign: 'center', marginTop: '2rem' }}>
        <p style={{ color: '#e50914' }}>{erro}</p>
        <button type="button" onClick={() => navigate(-1)} style={{ marginTop: '1rem' }}>
          Voltar
        </button>
      </div>
    );
  }

  // 7. Se não houver filme carregado
  if (!filme) return null;

  // Base da imagem do TMDb
  const urlBaseImagem = 'https://image.tmdb.org/t/p/w500';
  const imagemPoster = filme.poster_path
    ? `${urlBaseImagem}${filme.poster_path}`
    : 'https://via.placeholder.com/500x750?text=Sem+Imagem';

  return (
    <div className="detalhes-container">
      {/* Botão com navegação histórica usando useNavigate */}
      <button 
        type="button" 
        onClick={() => navigate(-1)} 
        className="btn-voltar"
      >
        ← Voltar
      </button>

      <div className="detalhes-conteudo">
        <img 
          src={imagemPoster} 
          alt={`Pôster de ${filme.title}`} 
          className="detalhes-poster"
        />

        <div className="detalhes-info">
          <h1>{filme.title}</h1>
          
          {filme.tagline && <p className="detalhes-tagline"><em>"{filme.tagline}"</em></p>}

          <p><strong>Nota:</strong> ⭐ {filme.vote_average ? filme.vote_average.toFixed(1) : 'N/A'}</p>
          <p><strong>Lançamento:</strong> {filme.release_date || 'Não informada'}</p>
          
          {/* Mapeamento dos gêneros retornados pela API */}
          {filme.genres && (
            <p>
              <strong>Gêneros:</strong> {filme.genres.map(g => g.name).join(', ')}
            </p>
          )}

          <div style={{ marginTop: '1rem' }}>
            <h3>Sinopse</h3>
            <p style={{ lineHeight: '1.6', marginTop: '0.5rem', color: '#cccccc' }}>
              {filme.overview || 'Sinopse não disponível em português.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Detalhes;