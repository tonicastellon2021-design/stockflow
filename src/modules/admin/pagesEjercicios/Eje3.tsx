import { formatoLempiras } from "../../../utils/precios";

function InventarioEmpresa() {
  const sucursales = [
    {
      id: 1,
      nombre: "San Pedro Sula",
      bodegas: [
        {
          id: 101,
          nombre: "Bodega Principal",
          productos: [
            {
              codigo: "P001",
              nombre: "Laptop Dell",
              categoria: "Computadoras",
              existencia: 8,
              minimo: 5,
              precio: 18500,
            },
            {
              codigo: "P002",
              nombre: "Monitor 24 pulgadas",
              categoria: "Monitores",
              existencia: 3,
              minimo: 5,
              precio: 4200,
            },
            {
              codigo: "P003",
              nombre: "Teclado inalámbrico",
              categoria: "Accesorios",
              existencia: 0,
              minimo: 10,
              precio: 850,
            },
          ],
        },
        {
          id: 102,
          nombre: "Bodega Secundaria",
          productos: [
            {
              codigo: "P004",
              nombre: "Mouse inalámbrico",
              categoria: "Accesorios",
              existencia: 15,
              minimo: 10,
              precio: 450,
            },
            {
              codigo: "P005",
              nombre: "UPS 1000VA",
              categoria: "Energía",
              existencia: 2,
              minimo: 3,
              precio: 3200,
            },
          ],
        },
      ],
    },
    {
      id: 2,
      nombre: "Tegucigalpa",
      bodegas: [
        {
          id: 201,
          nombre: "Bodega Principal",
          productos: [
            {
              codigo: "P006",
              nombre: "Laptop Lenovo",
              categoria: "Computadoras",
              existencia: 4,
              minimo: 3,
              precio: 17200,
            },
            {
              codigo: "P007",
              nombre: "Monitor 27 pulgadas",
              categoria: "Monitores",
              existencia: 0,
              minimo: 4,
              precio: 6100,
            },
            {
              codigo: "P008",
              nombre: "Docking Station",
              categoria: "Accesorios",
              existencia: 6,
              minimo: 5,
              precio: 2800,
            },
          ],
        },
        {
          id: 202,
          nombre: "Bodega de Distribución",
          productos: [
            {
              codigo: "P009",
              nombre: "Webcam HD",
              categoria: "Accesorios",
              existencia: 10,
              minimo: 6,
              precio: 1250,
            },
            {
              codigo: "P010",
              nombre: "Laptop HP",
              categoria: "Computadoras",
              existencia: 2,
              minimo: 4,
              precio: 19500,
            },
            {
              codigo: "P011",
              nombre: "Regulador de voltaje",
              categoria: "Energía",
              existencia: 7,
              minimo: 5,
              precio: 1100,
            },
          ],
        },
      ],
    },
  ];

  const totalSucursales = sucursales.length;
  const totalBodegasEmpresa = sucursales.reduce(
    (acc, sucursal) => acc + sucursal.bodegas.length,
    0,
  );
  const totalProductosEmpresa = sucursales.reduce(
    (acc, sucursal) =>
      acc +
      sucursal.bodegas.reduce(
        (bodegasAcc, bodega) => bodegasAcc + bodega.productos.length,
        0,
      ),
    0,
  );

  const totalProductosAgotadosEmpresa = sucursales.reduce(
    (acc, sucursal) =>
      acc +
      sucursal.bodegas.reduce(
        (acc, bodega) =>
          acc + bodega.productos.filter((p) => p.existencia === 0).length,
        0,
      ),
    0,
  );

  const totalUnidadesDisponiblesEmpresa = sucursales.reduce(
    (acc, sucursal) =>
      acc +
      sucursal.bodegas.reduce(
        (acc, bodega) =>
          acc +
          bodega.productos.reduce(
            (acc, producto) =>
              producto.existencia > 0 ? acc + producto.existencia : acc,
            0,
          ),
        0,
      ),
    0,
  );

  const valorTotalInventarioEmpresa = sucursales.reduce(
    (acc, sucursal) =>
      acc +
      sucursal.bodegas.reduce(
        (acc, bodega) =>
          acc +
          bodega.productos.reduce(
            (acc, producto) => acc + producto.existencia * producto.precio,
            0,
          ),
        0,
      ),
    0,
  );

  const totalProductosInventarioBajoEmpresa = sucursales.reduce(
    (acc, itemSucu) =>
      acc +
      itemSucu.bodegas.reduce(
        (acc, itemBodega) =>
          acc +
          itemBodega.productos.filter(
            (p) => p.existencia <= p.minimo && p.existencia > 0,
          ).length,
        0,
      ),
    0,
  );

  return (
    <div className="container my-4">
      {sucursales.map((sucursal) => {
        const totalBodegasSucursal = sucursal.bodegas.length;
        const totalProductosSucursal = sucursal.bodegas.reduce(
          (acc, item) => acc + item.productos.length,
          0,
        );
        const totalProductosAgotadosSucursal = sucursal.bodegas.reduce(
          (acc, item) =>
            acc + item.productos.filter((p) => p.existencia === 0).length,
          0,
        );

        const totalProductosInventarioBajoSucursal = sucursal.bodegas.reduce(
          (acc, item) =>
            acc +
            item.productos.filter(
              (p) => p.existencia <= p.minimo && p.existencia > 0,
            ).length,
          0,
        );

        const totalUnidadesDisponiblesSucursal = sucursal.bodegas.reduce(
          (acc, item) =>
            acc +
            item.productos.reduce(
              (acc, producto) =>
                producto.existencia > 0 ? acc + producto.existencia : acc,
              0,
            ),
          0,
        );

        const valorTotalInventarioSucursal = sucursal.bodegas.reduce(
          (acc, item) =>
            acc +
            item.productos.reduce(
              (acc, item) => acc + item.existencia * item.precio,
              0,
            ),
          0,
        );

        return (
          <div key={sucursal.id} className="card mb-4 shadow-sm">
            <div className="card-header bg-dark text-white">
              <h2>{sucursal.nombre}</h2>
            </div>

            <div className="card-body">
              {sucursal.bodegas.map((bodega) => {
                const productosRegis = bodega.productos.length;
                const productDispo = bodega.productos.filter(
                  (p) => p.existencia > 0,
                );
                const productAgotados = bodega.productos.filter(
                  (p) => p.existencia === 0,
                ).length;

                const valorTotalInventario = bodega.productos.reduce(
                  (acc, item) => {
                    return acc + item.existencia * item.precio;
                  },
                  0,
                );
                const tamanio =
                  productDispo.length > 0
                    ? Math.floor(12 / productDispo.length)
                    : 12;

                return (
                  <div key={bodega.id} className="card my-3">
                    <div className="card-header bg-light text-dark">
                      <h3>{bodega.nombre}</h3>
                    </div>
                    <div className="card-body">
                      <div className="d-flex flex-wrap gap-2 mb-3">
                        <span className="badge bg-secondary rounded-pill px-3 py-2">
                          Registrados: {productosRegis}
                        </span>

                        <span className="badge bg-success rounded-pill px-3 py-2">
                          Disponibles: {productDispo.length}
                        </span>

                        <span className="badge bg-danger rounded-pill px-3 py-2">
                          Agotados: {productAgotados}
                        </span>

                        <span className="badge bg-info text-dark rounded-pill px-3 py-2">
                          Valor total: {formatoLempiras(valorTotalInventario)}
                        </span>
                      </div>

                      <div className="row g-3">
                        {productDispo.map((producto) => {
                          const estadoInventario =
                            producto.existencia > 0 &&
                            producto.existencia <= producto.minimo
                              ? "INVENTARIO BAJO"
                              : "DISPONIBLE";

                          const claseEstado =
                            estadoInventario === "INVENTARIO BAJO"
                              ? "badge bg-warning text-dark rounded-pill px-3 py-2"
                              : "badge bg-success rounded-pill px-3 py-2";

                          return (
                            <div
                              key={producto.codigo}
                              className={`col-${tamanio}`}
                            >
                              <div className="card h-100 border-0 shadow-sm mt-2 bg-light-subtle">
                                <div className="card-header bg-secondary-subtle border-0">
                                  <div className="d-flex justify-content-between align-items-center gap-2">
                                    <h4 className="mb-0 fs-6 fw-bold">
                                      {producto.nombre}
                                    </h4>
                                    <span className="badge bg-secondary rounded-pill">
                                      {producto.codigo}
                                    </span>
                                  </div>
                                </div>
                                <div className="card-body d-flex flex-column gap-2 bg-light">
                                  <span className="text-muted small">
                                    Categoría: {producto.categoria}
                                  </span>
                                  <span className="fw-semibold">
                                    Existencias: {producto.existencia}
                                  </span>
                                  <span className="text-muted">
                                    Cantidad mínima: {producto.minimo}
                                  </span>
                                  <span className="fw-semibold text-body">
                                    {formatoLempiras(producto.precio)}
                                  </span>
                                  <span className={claseEstado}>
                                    {estadoInventario}
                                  </span>
                                  <span className="small text-body-secondary">
                                    Valor total del inventario:{" "}
                                    {formatoLempiras(
                                      producto.existencia * producto.precio,
                                    )}
                                  </span>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="card-footer bg-dark text-white">
              <div className="d-flex flex-wrap gap-3 justify-content-between align-items-center">
                <span className="badge bg-light text-dark rounded-pill px-3 py-2">
                  Cantidad de bodegas: {totalBodegasSucursal}
                </span>
                <span className="badge bg-light text-dark rounded-pill px-3 py-2">
                  Cantidad de productos: {totalProductosSucursal}
                </span>
                <span className="badge bg-danger rounded-pill px-3 py-2">
                  Total productos agotados: {totalProductosAgotadosSucursal}
                </span>
                <span className="badge bg-light text-dark rounded-pill px-3 py-2">
                  Productos con inventario bajo:{" "}
                  {totalProductosInventarioBajoSucursal}
                </span>
                <span className="badge bg-light text-dark rounded-pill px-3 py-2">
                  Cantidad total de unidades disponibles:{" "}
                  {totalUnidadesDisponiblesSucursal}
                </span>
                <span className="badge bg-light text-dark rounded-pill px-3 py-2">
                  Valor total del inventario de la sucursal:{" "}
                  {formatoLempiras(valorTotalInventarioSucursal)}
                </span>
              </div>
            </div>
          </div>
        );
      })}
      <div className="card bg-dark text-white my-4 border-0 shadow-sm">
        <h2>Resumen general</h2>
        <div className="card-body d-flex flex-wrap gap-3 justify-content-between align-items-center p-3">
          <span className="badge bg-light text-dark rounded-pill px-3 py-2">
            Total sucursales: {totalSucursales}
          </span>
          <span className="badge bg-light text-dark rounded-pill px-3 py-2">
            Total bodegas: {totalBodegasEmpresa}
          </span>
          <span className="badge bg-light text-dark rounded-pill px-3 py-2">
            Total productos: {totalProductosEmpresa}
          </span>
          <span className="badge bg-danger rounded-pill px-3 py-2">
            Total productos agotados: {totalProductosAgotadosEmpresa}
          </span>
          <span className="badge bg-light text-dark rounded-pill px-3 py-2">
            Total de productos con inventario bajo:{" "}
            {totalProductosInventarioBajoEmpresa}
          </span>
          <span className="badge bg-success rounded-pill px-3 py-2">
            Total de unidades disponibles: {totalUnidadesDisponiblesEmpresa}
          </span>
          <span className="badge bg-info text-dark rounded-pill px-3 py-2">
            Valor total del inventario de toda la empresa:{" "}
            {formatoLempiras(valorTotalInventarioEmpresa)}
          </span>
        </div>
      </div>
    </div>
  );
}

export default InventarioEmpresa;
