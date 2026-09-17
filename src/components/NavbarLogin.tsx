import { NavLink, useLocation } from "react-router-dom";

export function NavbarLogin() {
  const location = useLocation();

  const isRegisterPage = location.pathname === "/login/register";

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <a className="navbar-brand fw-bold text-success" href="/">
          <i className="bi bi-box-seam me-2"></i>
          StockFlow
        </a>

        <div className="navbar-nav me-auto d-flex flex-row align-items-center gap-3">
          <NavLink
            to={isRegisterPage ? "/login" : "/login/register"}
            className="nav-link d-flex align-items-center gap-2"
          >
            <i
              className={
                isRegisterPage
                  ? "bi bi-person-circle fs-5"
                  : "bi bi-person-plus fs-5"
              }
            ></i>

            <span>{isRegisterPage ? "Iniciar sesión" : "Registrarse"}</span>
          </NavLink>

          <NavLink
            to="/"
            className="nav-link d-flex align-items-center gap-2"
            end
          >
            <i className="bi bi-house-door fs-5"></i>
            <span>Inicio</span>
          </NavLink>
        </div>
      </div>
    </nav>
  );
}
