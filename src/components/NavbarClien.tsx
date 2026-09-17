import { NavLink } from "react-router-dom";
import { IconCarrito } from "./IconCarrito";
import { useAuthStore } from "../store/authStore";

export function NavbarClien() {
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <a className="navbar-brand fw-bold text-success" href="#">
          <i className="bi bi-box-seam me-2"></i>StockFlow
        </a>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarStockFlow"
          aria-controls="navbarStockFlow"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarStockFlow">
          {user !== null ? (
            <div className="d-flex align-items-center border-start border-secondary ps-3 ms-3 text-nowrap">
              <span className="text-secondary small me-3">
                Bienvenido,{" "}
                <strong className="text-light fw-medium">{user?.correo}</strong>
              </span>

              <button
                onClick={logout}
                className="btn btn-outline-danger btn-sm text-nowrap ms-2"
                type="button"
              >
                Cerrar Sesión
              </button>
            </div>
          ) : (
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 d-flex flex-row align-items-center gap-3">
              <li className="nav-item">
                <NavLink
                  to="/login"
                  className="nav-link d-flex align-items-center text-nowrap gap-2"
                >
                  <i className="bi bi-person-circle fs-5"></i>
                  <span>Iniciar Sesión</span>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/"
                  className="nav-link d-flex align-items-center text-nowrap gap-2"
                  end
                >
                  <i className="bi bi-house-door fs-5"></i>
                  <span>Inicio</span>
                </NavLink>
              </li>
            </ul>
          )}

          <div className="d-flex align-items-center gap-3 w-100 w-lg-auto justify-content-end">
            <form className="d-flex" role="search">
              <div className="input-group">
                <span
                  className="input-group-text bg-secondary border-secondary text-white"
                  id="search-icon"
                >
                  <i className="bi bi-search"></i>
                </span>
                <input
                  className="form-control bg-dark text-white border-secondary text-opacity-75"
                  type="search"
                  placeholder="Buscar productos..."
                  aria-label="Buscar"
                  aria-describedby="search-icon"
                />
              </div>
            </form>

            <IconCarrito></IconCarrito>
          </div>
        </div>
      </div>
    </nav>
  );
}
