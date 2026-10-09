import { useOutletContext } from 'react-router-dom';
import MovieCard from '../components/MovieCard';

function Favoritos() {
  // 1. Recebe a lista e a função via contexto do Layout (Outlet)
  const { favoritos, alternarFavorito } = useOutletContext();

  return (
    <div>
      <h1 style={{ marginBottom: '1.5rem' }}>Os Meus Filmes Favoritos</h1>

      {/* Renderização Condicional para lista vazia (Requisito do Entregável 5) */}
      {favoritos.length === 0 ? (
        <div style={{ textAlign: 'center', marginTop: '3rem', color: '#aaaaaa' }}>
          <p style={{ fontSize: '1.2rem' }}>A sua lista de favoritos está vazia.</p>
          <p style={{ marginTop: '0.5rem', fontSize: '0.9rem' }}>
            Aceda à Home ou à Busca para adicionar títulos à sua coleção!
          </p>
        </div>
      ) : (
        /* Grid de cards favoritados reaproveitando o MovieCard */
        <div className="movies-grid">
          {favoritos.map((filme) => (
            <MovieCard
              key={filme.id}
              filme={filme}
              aoFavoritar={alternarFavorito}
              isFavorito={true}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Favoritos;