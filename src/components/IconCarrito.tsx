import { useState } from "react";
import { useCartStore } from "../store/cartStore";
import { Modal } from "./Modal";
import { usePedido } from "../hooks/usePedido";
import { formatPrecio } from "../utils/precios";

export function IconCarrito() {
  const cart = useCartStore((s) => s.cart);
  const totalItems = useCartStore((s) => s.totalItems);
  const totalPrice = useCartStore((s) => s.totalPrice);
  const removeFromCart = useCartStore((s) => s.removeFromCart);
  const clearCart = useCartStore((s) => s.clearCart);
  const addToCart = useCartStore((s) => s.addToCart);
  const decrementCartItem = useCartStore((s) => s.decrementCartItem);
  const [isOpen, setIsOpen] = useState(false);
  const [metodoPago, setMetodoPago] = useState<"contado" | "credito">(
    "contado",
  );
  const { procesarPedido } = usePedido();

  const handleProcesarPedido = async () => {
    const procesado = await procesarPedido({
      tipoPago: metodoPago,
      cart,
      montoTotal: totalPrice(),
    });

    if (procesado) setIsOpen(false);
  };

  return (
    <>
      <button
        type="button"
        className="btn btn-outline-light position-relative px-3"
        onClick={() => setIsOpen(true)}
        aria-label="Abrir carrito"
      >
        <i className="bi bi-cart3 fs-5"></i>
        {totalItems() > 0 && (
          <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
            {totalItems()}
          </span>
        )}
      </button>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Tu carrito"
      >
        <div className="cart-modal container-fluid px-0">
          {cart.length === 0 ? (
            <p className="text-center text-dark mb-0 py-3">
              Tu carrito está vacío.
            </p>
          ) : (
            <>
              <div className="list-group list-group-flush mb-4 cart-items modal-scroll-list">
                {cart.map(({ producto, cantidad }) => (
                  <div
                    key={producto.id}
                    className="list-group-item cart-item border-light px-0 py-3"
                  >
                    <div className="d-flex align-items-center gap-3">
                      <img
                        src={producto.image}
                        alt={producto.nombre}
                        className="rounded object-fit-cover cart-item-image"
                        style={{ width: "64px", height: "64px" }}
                      />

                      <div className="flex-grow-1">
                        <h3 className="h6 mb-1 text-dark">{producto.nombre}</h3>
                        <p className="small text-muted mb-1">
                          ${formatPrecio(producto.precio)} c/u
                        </p>
                        <strong className="text-dark">
                          ${formatPrecio(producto.precio * cantidad)}
                        </strong>
                      </div>

                      <div className="d-flex align-items-center gap-2">
                        <button
                          type="button"
                          className="btn btn-sm btn-outline-dark cart-qty-btn px-2 py-1 fw-bold"
                          onClick={() => addToCart(producto)}
                        >
                          +
                        </button>
                        <span className="small fw-bold px-1 text-dark">
                          {cantidad} u.
                        </span>
                      </div>
                      <div className="d-flex align-items-center gap-2">
                        <button
                          type="button"
                          className="btn btn-sm btn-outline-dark cart-qty-btn px-2 py-1 fw-bold"
                          onClick={() => decrementCartItem(producto.id)}
                          title="Quitar una unidad"
                        >
                          -
                        </button>
                      </div>
                      <button
                        type="button"
                        className="btn btn-link cart-delete-btn p-0 ms-2"
                        onClick={() => removeFromCart(producto.id)}
                        aria-label={`Eliminar ${producto.nombre}`}
                      >
                        <i className="bi bi-trash3 fs-5"></i>
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="d-flex justify-content-between align-items-center pt-2 border-top border-light mb-4">
                <button
                  type="button"
                  className="btn btn-sm btn-outline-danger"
                  onClick={clearCart}
                >
                  Vaciar carrito
                </button>

                <div className="text-end">
                  <span className="fw-bold me-2 text-dark">Total:</span>
                  <span className="fs-4 fw-bold text-success">
                    ${formatPrecio(totalPrice())}
                  </span>
                </div>
              </div>

              <div className="pt-3 border-top border-light">
                <div className="row g-2 align-items-end">
                  <div className="col-6">
                    <label
                      htmlFor="paymentMethod"
                      className="form-label text-dark small fw-bold mb-1"
                    >
                      Método de Pago
                    </label>
                    <select
                      id="paymentMethod"
                      className="form-select border-secondary text-dark"
                      value={metodoPago}
                      onChange={(e) =>
                        setMetodoPago(e.target.value as "contado" | "credito")
                      }
                    >
                      <option value="contado">Contado</option>
                      <option value="credito">Crédito</option>
                    </select>
                  </div>

                  <div className="col-6">
                    <button
                      onClick={handleProcesarPedido}
                      type="button"
                      className="btn btn-stockflow w-100 fw-bold py-2 text-center"
                    >
                      Procesar Pago
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </Modal>
    </>
  );
}
