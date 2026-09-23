import { NavLink } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar">
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive ? 'link-navegacao link-ativo' : 'link-navegacao'
        }
      >
        Home
      </NavLink>

      <NavLink
        to="/busca"
        className={({ isActive }) =>
          isActive ? 'link-navegacao link-ativo' : 'link-navegacao'
        }
      >
        Busca
      </NavLink>

      <NavLink
        to="/favoritos"
        className={({ isActive }) =>
          isActive ? 'link-navegacao link-ativo' : 'link-navegacao'
        }
      >
        Favoritos
      </NavLink>
    </nav>
  );
}

export default Navbar;