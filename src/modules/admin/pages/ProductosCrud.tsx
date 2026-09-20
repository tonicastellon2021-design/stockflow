import { useSearchParams } from "react-router-dom";
import { useProducts } from "../../../api/productsAPI";
import {
  ProductForm,
  type ProductformData,
} from "../../../components/forms/ProductForm";
import { Modal } from "../../../components/Modal";
import { Tabla } from "../../../components/Tabla";
import { useCrudProductos } from "../../../hooks/useCrudProductos";
import { useSearchParamDebounced } from "../../../hooks/useSearchParamDebounced";
import type { Product } from "../../../types/Product";
import FilaProducto from "../../../components/filas/FilaProducto";

function ProductosCrud() {
  const [searchParams] = useSearchParams();
  const { searchTerm, setSearchTerm, searchParam } =
    useSearchParamDebounced("search");
  const pageParams = searchParams.get("page");
  const page = pageParams ? Number(pageParams) : 1;

  const {
    data: productos,
    isError,
    isLoading,
  } = useProducts({ limit: 10, page: page, search: searchParam });
  const isLastPage = !productos || productos.length < 10;

  const {
    abrirModalCrear,
    abrirModalEditar,
    modalIsOpen,
    cerrarModal,
    producSelect,
    deleteProduct,
    postProduct,
    putProduct,
  } = useCrudProductos();

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

  const onSubmit = async (data: ProductformData) => {
    const nombre = data.nombre.trim();
    const precio = data.precio;
    const stock = data.stock;
    const descripcion = data.descripcion.trim();
    const categoria = data.categoria.trim();
    const image = data.image?.trim() ?? "";

    if (!nombre || !descripcion || !categoria) return;

    if (producSelect) {
      const newProduct: Product = {
        id: producSelect.id,
        nombre: nombre,
        precio: precio,
        stock: stock,
        descripcion: descripcion,
        categoria: categoria,
        image: image,
      };

      await putProduct(newProduct);
      cerrarModal();
      return;
    }

    const newProduct: Product = {
      id: crypto.randomUUID(),
      nombre: nombre,
      precio: precio,
      stock: stock,
      descripcion: descripcion,
      categoria: categoria,
      image: image,
    };

    await postProduct(newProduct);
    cerrarModal();
  };

  return (
    <div className="page-shell">
      <Tabla
        title="Gestion de productos"
        description="Administra los productos, cantidades y precios"
        titleButtonNew="Nuevo producto"
        isLastPage={isLastPage}
        actionButton={abrirModalCrear}
        searchValue={searchTerm}
        onSearchChange={setSearchTerm}
      >
        <thead className="table-light text-secondary small text-uppercase">
          <tr>
            <th className="ps-4" style={{ width: "80px" }}>
              ID
            </th>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Categoria</th>
            <th>Stock</th>
            <th>Descripcion</th>
            <th className="text-end pe-4" style={{ width: "140px" }}>
              Acciones
            </th>
          </tr>
        </thead>
        <tbody>
          {!productos || productos.length === 0 ? (
            <tr>
              <td colSpan={7} className="text-center py-5 text-muted">
                <i className="bi bi-person-exclamation fs-2 d-block mb-2"></i>
                <span>
                  No se encontraron productos que coincidan con la búsqueda.
                </span>
              </td>
            </tr>
          ) : (
            productos.map((producto) => (
              <FilaProducto
                key={producto.id}
                producto={producto}
                onEditar={abrirModalEditar}
                onEliminar={deleteProduct}
              />
            ))
          )}
        </tbody>
      </Tabla>
      {modalIsOpen && (
        <Modal
          isOpen={modalIsOpen}
          onClose={cerrarModal}
          scrollable
          title={
            producSelect === null ? "Crear un producto" : "Editar un producto"
          }
        >
          <ProductForm
            cerrarModal={cerrarModal}
            productSeleccionado={producSelect}
            onSubmit={onSubmit}
          ></ProductForm>
        </Modal>
      )}
    </div>
  );
}

export default ProductosCrud;
