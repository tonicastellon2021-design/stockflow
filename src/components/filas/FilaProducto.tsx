import { memo } from "react";
import { formatPrecio } from "../../utils/precios";
import type { Product } from "../../types/Product";

interface Props {
  producto: Product;
  onEditar: (producto: Product) => void;
  onEliminar: (producto: Product) => void;
}

const FilaProducto = memo(function FilaProducto({
  producto,
  onEditar,
  onEliminar,
}: Props) {
  return (
    <tr>
      <td className="ps-4 fw-semibold text-muted">#{producto.id}</td>
      <td>
        <div className="d-flex align-items-center gap-2">
          {producto.image ? (
            <img
              src={producto.image}
              alt={producto.nombre}
              className="rounded-circle border"
              style={{
                width: "32px",
                height: "32px",
                objectFit: "cover",
                display: "block",
              }}
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
          ) : (
            <div
              className="bg-light rounded-circle d-flex align-items-center justify-content-center text-muted"
              style={{ width: "32px", height: "32px" }}
            >
              <i className="bi bi-bag"></i>
            </div>
          )}
          <span className="fw-medium text-dark">{producto.nombre}</span>
        </div>
      </td>
      <td className="text-success fw-bold fs-5">
        ${formatPrecio(producto.precio)}
      </td>
      <td className="text-secondary">{producto.categoria}</td>
      <td>
        <span
          className={`badge border px-2 py-1 fw-normal ${
            producto.stock === 0
              ? "bg-danger-subtle text-danger border-danger-subtle"
              : "bg-success-subtle text-success border-success-subtle"
          }`}
        >
          {producto.stock}
        </span>
      </td>
      <td className="descripcion-cell">
        <span className="descripcion-text">{producto.descripcion}</span>
      </td>
      <td className="text-end pe-4">
        <div className="d-flex justify-content-end gap-1">
          <button
            onClick={() => onEditar(producto)}
            className="btn btn-sm user-action user-action-edit"
            title="Editar"
            aria-label={`Editar producto ${producto.nombre}`}
          >
            <i className="bi bi-pencil-square"></i>
          </button>
          <button
            onClick={() => onEliminar(producto)}
            className="btn btn-sm user-action user-action-delete"
            title="Eliminar"
            aria-label={`Eliminar producto ${producto.nombre}`}
          >
            <i className="bi bi-trash3"></i>
          </button>
        </div>
      </td>
    </tr>
  );
});

export default FilaProducto;
