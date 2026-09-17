export function Footer() {
  return (
    <footer className="bg-dark text-secondary py-4 mt-auto border-top border-secondary">
      <div className="container">
        <div className="row align-items-center gy-3">
          <div className="col-10 col-md-4 text-center text-md-start">
            <a
              className="text-white text-decoration-none fw-bold me-2"
              href="#"
            >
              <i className="bi bi-box-seam text-success me-1"></i>StockFlow
            </a>
            <span className="small">
              &copy; 2026 Todos los derechos reservados.
            </span>
          </div>

          <div className="col-12 col-md-4 text-center">
            <ul className="list-inline mb-0">
              <li className="list-inline-item">
                <a
                  href="#"
                  className="nav-link d-inline p-0 text-secondary link-light small"
                >
                  Términos
                </a>
              </li>
              <li className="list-inline-item mx-3">
                <a
                  href="#"
                  className="nav-link d-inline p-0 text-secondary link-light small"
                >
                  Privacidad
                </a>
              </li>
              <li className="list-inline-item">
                <a
                  href="#"
                  className="nav-link d-inline p-0 text-secondary link-light small"
                >
                  Soporte
                </a>
              </li>
            </ul>
          </div>

          <div className="col-12 col-md-4 text-center text-md-end">
            <a href="#" className="text-secondary link-light me-3 fs-5">
              <i className="bi bi-facebook"></i>
            </a>
            <a href="#" className="text-secondary link-light me-3 fs-5">
              <i className="bi bi-twitter-x"></i>
            </a>
            <a href="#" className="text-secondary link-light me-3 fs-5">
              <i className="bi bi-github"></i>
            </a>
            <a href="#" className="text-secondary link-light fs-5">
              <i className="bi bi-envelope-fill"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
