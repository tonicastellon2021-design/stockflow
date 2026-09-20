import { memo } from "react";
import type { Pedido } from "../../types/Pedido";
import { formatPrecio } from "../../utils/precios";
import { badgeEstado } from "../../utils/badgeFunction";

interface Props {
  pedido: Pedido;
  onDetalle: (pedido: Pedido) => void;
  onCambioEstado: (pedido: Pedido) => void;
}

const FilaPedido = memo(function FilaPedido({
  pedido,
  onCambioEstado,
  onDetalle,
}: Props) {
  return (
    <tr>
      <td className="ps-4 fw-semibold text-muted">#{pedido.id}</td>
      <td className="fw-medium text-dark">{pedido.mailCliente}</td>
      <td className="text-secondary">
        {new Date(pedido.fechaCreacion).toLocaleDateString("es-HN", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        })}
      </td>
      <td className="fw-bold text-success">
        ${formatPrecio(pedido.montoTotal)}
      </td>
      <td className="text-secondary text-capitalize">{pedido.tipoPago}</td>
      <td>
        <span className={`badge border ${badgeEstado(pedido.estado)}`}>
          {pedido.estado}
        </span>
      </td>
      <td className="text-end pe-4">
        <div className="d-flex justify-content-end gap-1">
          <button
            onClick={() => onDetalle(pedido)}
            className="btn btn-sm user-action user-action-edit"
            title="Ver detalle"
          >
            <i className="bi bi-eye"></i>
          </button>
          <button
            onClick={() => onCambioEstado(pedido)}
            className="btn btn-sm user-action"
            title="Cambiar estado"
          >
            <i className="bi bi-arrow-repeat"></i>
          </button>
        </div>
      </td>
    </tr>
  );
});

export default FilaPedido;
