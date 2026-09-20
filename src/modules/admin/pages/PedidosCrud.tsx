import { useSearchParams } from "react-router-dom";
import { useGetPedidos } from "../../../api/pedidoApi";
import { Tabla } from "../../../components/Tabla";
import { useCallback, useState } from "react";
import { useSearchParamDebounced } from "../../../hooks/useSearchParamDebounced";
import { formatPrecio } from "../../../utils/precios";
import type { Pedido } from "../../../types/Pedido";
import { Modal } from "../../../components/Modal";
import { usePedido } from "../../../hooks/usePedido";
import FilaPedido from "../../../components/filas/FilaPedido";

const ESTADOS = ["Pendiente", "Completado", "Enviado", "Cancelado"];

function PedidosCrud() {
  const [searchParams] = useSearchParams();
  const { searchTerm, setSearchTerm, debouncedSearchTerm } =
    useSearchParamDebounced("search");
  const pageParams = searchParams.get("page");
  const page = pageParams ? Number(pageParams) : 1;

  const [pedidoDetalle, setPedidoDetalle] = useState<Pedido | null>(null);
  const [pedidoEditandoEstado, setPedidoEditandoEstado] =
    useState<Pedido | null>(null);
  const [nuevoEstado, setNuevoEstado] = useState<string>("");

  const { putPedido } = usePedido();

  const {
    data: pedidos,
    isLoading,
    isError,
  } = useGetPedidos(page, 10, debouncedSearchTerm);
  const isLastPage = !pedidos || pedidos.length < 10;

  const abrirCambioEstado = useCallback((pedido: Pedido) => {
    setPedidoEditandoEstado(pedido);
    setNuevoEstado(pedido.estado);
  }, []);
  const abrirDetalle = useCallback(
    (pedido: Pedido) => setPedidoDetalle(pedido),
    [],
  );

  if (isLoading) {
    return (
      <div className="alert alert-warning" role="alert">
        ¡cargando pedidos!
      </div>
    );
  }

  if (isError) {
    return (
      <div className="alert alert-danger" role="alert">
        ¡No se pudieron cargar los pedidos!
      </div>
    );
  }

  const cerrarDetalle = () => setPedidoDetalle(null);

  const cerrarCambioEstado = () => setPedidoEditandoEstado(null);

  const handleGuardarEstado = (pedido: Pedido) => {
    putPedido(pedido, nuevoEstado);
    cerrarCambioEstado();
  };

  return (
    <div className="page-shell">
      <Tabla
        title="Gestión de pedidos"
        description="Administra los pedidos y sus estados"
        titleButtonNew=""
        isLastPage={isLastPage}
        actionButton={() => {}}
        searchValue={searchTerm}
        onSearchChange={setSearchTerm}
      >
        <thead className="table-light text-secondary small text-uppercase">
          <tr>
            <th className="ps-4" style={{ width: "80px" }}>
              ID
            </th>
            <th>Cliente</th>
            <th>Fecha</th>
            <th>Total</th>
            <th>Pago</th>
            <th>Estado</th>
            <th className="text-end pe-4" style={{ width: "120px" }}>
              Acciones
            </th>
          </tr>
        </thead>
        <tbody>
          {!pedidos || pedidos.length === 0 ? (
            <tr>
              <td colSpan={7} className="text-center py-5 text-muted">
                <i className="bi bi-person-exclamation fs-2 d-block mb-2"></i>
                <span>
                  No se encontraron pedidos que coincidan con la búsqueda.
                </span>
              </td>
            </tr>
          ) : (
            pedidos.map((pedido) => (
              <FilaPedido
                key={pedido.id}
                pedido={pedido}
                onDetalle={abrirDetalle}
                onCambioEstado={abrirCambioEstado}
              />
            ))
          )}
        </tbody>
      </Tabla>
      {/* Modal de detalle — solo lectura */}
      <Modal
        isOpen={pedidoDetalle !== null}
        onClose={cerrarDetalle}
        title="Detalle del pedido"
      >
        {pedidoDetalle && (
          <div>
            <p className="text-muted mb-3">
              Cliente: {pedidoDetalle.mailCliente} · {pedidoDetalle.tipoPago}
            </p>
            <div className="pedido-items-list modal-scroll-list mb-3">
              {pedidoDetalle.items.map((item) => (
                <div
                  key={item.productoId}
                  className="pedido-item-card d-flex justify-content-between align-items-center"
                >
                  <div>
                    <div className="fw-semibold text-dark">{item.nombre}</div>
                    <small className="text-muted">
                      Cantidad: {item.cantidad}
                    </small>
                  </div>
                  <span className="fw-bold text-success">
                    ${formatPrecio(item.precioUnitario * item.cantidad)}
                  </span>
                </div>
              ))}
            </div>
            <div className="text-end fw-bold text-dark">
              Total: ${formatPrecio(pedidoDetalle.montoTotal)}
            </div>
          </div>
        )}
      </Modal>

      {/* Modal de cambio de estado */}
      <Modal
        isOpen={pedidoEditandoEstado !== null}
        onClose={cerrarCambioEstado}
        title="Actualizar estado"
      >
        {pedidoEditandoEstado && (
          <div>
            <p className="text-muted mb-3">Pedido #{pedidoEditandoEstado.id}</p>
            <select
              className="form-select border-secondary text-dark mb-3"
              value={nuevoEstado}
              onChange={(e) => setNuevoEstado(e.target.value)}
            >
              {ESTADOS.map((estado) => (
                <option key={estado} value={estado}>
                  {estado}
                </option>
              ))}
            </select>
            <button
              className="btn btn-stockflow w-100"
              onClick={() => handleGuardarEstado(pedidoEditandoEstado)}
            >
              Guardar cambios
            </button>
          </div>
        )}
      </Modal>
    </div>
  );
}

export default PedidosCrud;
