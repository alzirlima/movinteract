import { Link } from 'react-router-dom';

function NaoEncontrada() {
  return (
    <div style={{ textAlign: 'center', padding: '3rem' }}>
      <h1>404 - Página Não Encontrada</h1>
      <p style={{ margin: '1.5rem 0', color: '#aaaaaa' }}>
        Ops! A página que você tentou acessar não existe ou foi removida.
      </p>
      <Link 
        to="/" 
        style={{ 
          color: '#e50914', 
          fontWeight: 'bold', 
          textDecoration: 'none',
          border: '1px solid #e50914',
          padding: '0.5rem 1rem',
          borderRadius: '4px'
        }}
      >
        Voltar para a Página Inicial
      </Link>
    </div>
  );
}

export default NaoEncontrada;