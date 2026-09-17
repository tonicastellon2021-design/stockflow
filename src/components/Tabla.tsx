import type { ReactNode } from "react";
import { Pagination } from "./Pagination";

interface Props {
  title: string;
  description: string;
  titleButtonNew: string;
  children: ReactNode;
  isLastPage: boolean;
  className?: string;
  searchValue: string;
  onSearchChange: (value: string) => void;
  actionButton: () => void;
}

export function Tabla({
  title,
  description,
  titleButtonNew,
  actionButton,
  children,
  className = "",
  isLastPage,
  searchValue,
  onSearchChange,
}: Props) {
  return (
    <div className="container-fluid p-0">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="h4 mb-1 text-dark fw-bold">{title}</h2>
          <p className="text-muted small mb-0">{description}</p>
        </div>
        <button
          onClick={actionButton}
          className="btn btn-stockflow d-flex align-items-center gap-2 px-3 py-2 fw-medium shadow-sm"
        >
          <i className="bi bi-person-plus-fill"></i>
          {titleButtonNew}
        </button>
      </div>

      {/* TARJETA PRINCIPAL */}
      <div className={`card shadow-sm border-0 rounded-3 ${className}`}>
        <div className="card-header bg-white py-3 border-bottom-0">
          <div className="row">
            <div className="col-md-4">
              <div className="input-group">
                <span className="input-group-text bg-light border-end-0 text-muted">
                  <i className="bi bi-search"></i>
                </span>
                <input
                  value={searchValue}
                  onChange={(e) => onSearchChange(e.target.value)}
                  type="text"
                  className="form-control bg-light border-start-0 ps-0"
                  placeholder="Buscar..."
                />
              </div>
            </div>
          </div>
        </div>

        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            {children}
          </table>
        </div>

        {/* CORRECCIÓN DE LA PAGINACIÓN */}
        <div className="card-footer bg-white d-flex justify-content-between align-items-center py-3 border-top-0">
          <Pagination isLastPage={isLastPage} />
        </div>
      </div>
    </div>
  );
}
