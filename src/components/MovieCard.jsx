import { Link } from 'react-router-dom';

// O componente recebe o objeto 'filme' e eventuais funções via props
function MovieCard({ filme, aoFavoritar, isFavorito }) {
  // 1. Base oficial de imagens do TMDb definida na especificação
  const urlBaseImagem = 'https://image.tmdb.org/t/p/w500';

  // 2. Fallback de imagem caso o filme não possua poster_path cadastrado
  const imagemPoster = filme.poster_path
    ? `${urlBaseImagem}${filme.poster_path}`
    : 'https://via.placeholder.com/500x750?text=Sem+Imagem';

  return (
    <div className="movie-card">
      {/* Pôster com texto alternativo para acessibilidade */}
      <img 
        src={imagemPoster} 
        alt={`Pôster do filme ${filme.title}`} 
        className="movie-poster"
      />

      <div className="movie-info">
        {/* Título do filme */}
        <h3 className="movie-title">{filme.title}</h3>

        {/* Nota média formatada (ex: 8.4) */}
        <p className="movie-rating">
          ⭐ {filme.vote_average ? filme.vote_average.toFixed(1) : 'N/A'}
        </p>

        {/* Link para a rota dinâmica do Entregável 3 */}
        <Link to={`/filme/${filme.id}`} className="btn-detalhes">
          Ver Detalhes
        </Link>

        {/* Botão de favoritos (preparado para o Entregável 5) */}
        {aoFavoritar && (
          <button 
            type="button" 
            onClick={() => aoFavoritar(filme)}
            className="btn-favorito"
          >
            {isFavorito ? '❤️ Remover' : '🤍 Favoritar'}
          </button>
        )}
      </div>
    </div>
  );
}

export default MovieCard;