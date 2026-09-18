import { useSearchParams } from "react-router-dom";
import { useProducts } from "../../../api/productsAPI";
import { Pagination } from "../../../components/Pagination";
import { CategoryFilter } from "../../../components/categoryFiltrer";
import { useCartStore } from "../../../store/cartStore";
import { formatPrecio } from "../../../utils/precios";

export function CatalogPage() {
  const [searchParams] = useSearchParams();
  const PAGE_SIZE = 6;
  const cart = useCartStore((s) => s.cart);
  const addToCart = useCartStore((s) => s.addToCart);

  const pageParam = searchParams.get("page");
  const categoryParam = searchParams.get("categoria");

  const page = pageParam ? Number(pageParam) : 1;
  const categoria = categoryParam || null;

  const {
    data: products,
    isLoading,
    isError,
  } = useProducts({
    page,
    limit: PAGE_SIZE,
    categoria,
  });

  const isLastPage = !products || products.length < PAGE_SIZE;

  if (isLoading) {
    return (
      <div className="alert alert-warning" role="alert">
        ¡cargando productos!
      </div>
    );
  }

  if (isError) {
    return (
      <div className="alert alert-danger" role="alert">
        ¡No se pudieron cargar los productos!
      </div>
    );
  }

  return (
    <div>
      <CategoryFilter />
      <div className="row row-cols-1 row-cols-md-3 g-4 mb-4">
        {products?.map((p) => {
          const itemEnCarrito = cart.find((item) => item.producto.id === p.id);
          const cantidadEnCarrito = itemEnCarrito ? itemEnCarrito.cantidad : 0;

          const stockDisponible = p.stock - cantidadEnCarrito;
          const sinStock = stockDisponible <= 0;

          return (
            <div key={p.id} className="col">
              <div className="card h-100 shadow-sm border border-secondary-subtle rounded-3 position-relative bg-white text-dark">
                <div
                  className="bg-light d-flex align-items-center justify-content-center rounded-top border-bottom border-light-subtle position-relative"
                  style={{ height: "200px" }}
                >
                  <img
                    src={p.image}
                    alt={p.nombre}
                    className="img-fluid h-100 w-100 object-fit-cover rounded-top"
                    loading="lazy"
                  />

                  <span
                    className="position-absolute bottom-0 end-0 m-2 badge bg-dark text-white text-uppercase px-2 py-1 shadow"
                    style={{
                      fontSize: "0.65rem",
                      letterSpacing: "0.5px",
                      zIndex: 2,
                    }}
                  >
                    {p.categoria}
                  </span>
                </div>

                <div className="card-body d-flex flex-column pt-3">
                  <h5 className="card-title fw-bold text-truncate mb-1">
                    {p.nombre}
                  </h5>

                  <p className="card-text text-secondary small flex-grow-1 text-clamp-2 mb-3">
                    {p.descripcion}
                  </p>

                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <span className="fs-4 fw-bold text-success">
                      ${formatPrecio(p.precio)}
                    </span>

                    {sinStock ? (
                      <span className="badge bg-danger-subtle text-danger border border-danger-subtle px-2 py-2 rounded-pill small fw-bold">
                        <i className="bi bi-x-circle-fill me-1"></i>Agotado
                      </span>
                    ) : (
                      <span className="badge bg-success-subtle text-success border border-success-subtle px-2 py-2 rounded-pill small fw-bold">
                        Cantidad: {stockDisponible} u.
                      </span>
                    )}
                  </div>

                  <button
                    className="btn btn-dark w-100 mt-auto d-flex align-items-center justify-content-center gap-2"
                    disabled={sinStock}
                    onClick={() => addToCart(p)}
                  >
                    <i className="bi bi-cart-plus-fill"></i>
                    {sinStock ? "Producto agotado" : "Agregar al carrito"}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <Pagination isLastPage={isLastPage} />
    </div>
  );
}
