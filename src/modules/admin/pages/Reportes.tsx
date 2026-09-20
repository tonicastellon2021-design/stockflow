import { useReportes } from "../../../hooks/useReportes";
import { formatPrecio } from "../../../utils/precios";

function Reportes() {
  const {
    isLoading,
    isError,
    ingresosTotales,
    pedidosPendientes,
    usersCantidad,
    productosStock,
  } = useReportes();

  if (isLoading) {
    return (
      <div className="alert alert-warning" role="alert">
        ¡Cargando reportes!
      </div>
    );
  }

  if (isError) {
    return (
      <div className="alert alert-danger" role="alert">
        ¡No se pudieron cargar los reportes!
      </div>
    );
  }

  return (
    <div className="page-shell">
      <h2 className="h4 mb-1 text-dark fw-bold">Reportes</h2>
      <p className="text-muted small mb-4">Resumen general de la tienda.</p>

      <div className="row g-3">
        <div className="col-6 col-md-3">
          <div className="card border-0 shadow-sm p-3 h-100">
            <div className="d-flex align-items-center gap-2 mb-2">
              <div
                className="bg-success-subtle text-success rounded-circle d-flex align-items-center justify-content-center"
                style={{ width: "36px", height: "36px" }}
              >
                <i className="bi bi-cash-coin"></i>
              </div>
              <span className="text-muted small">Ingresos totales</span>
            </div>
            <span className="fs-3 fw-bold text-success">
              ${formatPrecio(ingresosTotales ?? 0)}
            </span>
          </div>
        </div>

        <div className="col-6 col-md-3">
          <div className="card border-0 shadow-sm p-3 h-100">
            <div className="d-flex align-items-center gap-2 mb-2">
              <div
                className="bg-warning-subtle text-warning rounded-circle d-flex align-items-center justify-content-center"
                style={{ width: "36px", height: "36px" }}
              >
                <i className="bi bi-hourglass-split"></i>
              </div>
              <span className="text-muted small">Pedidos pendientes</span>
            </div>
            <span className="fs-3 fw-bold text-dark">
              {pedidosPendientes ?? 0}
            </span>
          </div>
        </div>

        <div className="col-6 col-md-3">
          <div className="card border-0 shadow-sm p-3 h-100">
            <div className="d-flex align-items-center gap-2 mb-2">
              <div
                className="bg-primary-subtle text-primary rounded-circle d-flex align-items-center justify-content-center"
                style={{ width: "36px", height: "36px" }}
              >
                <i className="bi bi-people"></i>
              </div>
              <span className="text-muted small">Usuarios registrados</span>
            </div>
            <span className="fs-3 fw-bold text-dark">{usersCantidad ?? 0}</span>
          </div>
        </div>

        <div className="col-6 col-md-3">
          <div className="card border-0 shadow-sm p-3 h-100">
            <div className="d-flex align-items-center gap-2 mb-2">
              <div
                className="bg-danger-subtle text-danger rounded-circle d-flex align-items-center justify-content-center"
                style={{ width: "36px", height: "36px" }}
              >
                <i className="bi bi-exclamation-triangle"></i>
              </div>
              <span className="text-muted small">Stock bajo</span>
            </div>
            <span className="fs-3 fw-bold text-danger">
              {productosStock ?? 0}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Reportes;
