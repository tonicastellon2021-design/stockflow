import { formatoLempiras } from "../../../utils/precios";

function InventarioBodegas() {
  const bodegas = [
    {
      nombre: "Bodega Principal",
      productos: [
        {
          codigo: "P001",
          nombre: "Laptop Dell",
          existencia: 8,
          precio: 18500,
        },
        {
          codigo: "P002",
          nombre: "Monitor 24 pulgadas",
          existencia: 12,
          precio: 4200,
        },
        {
          codigo: "P003",
          nombre: "Teclado inalámbrico",
          existencia: 0,
          precio: 850,
        },
      ],
    },
    {
      nombre: "Bodega Norte",
      productos: [
        {
          codigo: "P004",
          nombre: "Mouse inalámbrico",
          existencia: 15,
          precio: 450,
        },
        { codigo: "P005", nombre: "UPS 1000VA", existencia: 3, precio: 3200 },
      ],
    },
    {
      nombre: "Bodega Sur",
      productos: [
        {
          codigo: "P006",
          nombre: "Laptop Lenovo",
          existencia: 4,
          precio: 17200,
        },
        {
          codigo: "P007",
          nombre: "Monitor 27 pulgadas",
          existencia: 0,
          precio: 6100,
        },
        {
          codigo: "P008",
          nombre: "Docking Station",
          existencia: 6,
          precio: 2800,
        },
        { codigo: "P009", nombre: "Webcam", existencia: 10, precio: 1250 },
      ],
    },
  ];

  return (
    <div className="container">
      {bodegas.map((bodega) => {
        const productosFiltrados = bodega.productos.filter(
          (p) => p.existencia > 0,
        );
        const tamanio =
          productosFiltrados.length > 0
            ? Math.floor(12 / productosFiltrados.length)
            : 12;

        return (
          <div className="mb-5" key={bodega.nombre}>
            <h2 className="mb-3">{bodega.nombre}</h2>

            <div className="row">
              {productosFiltrados.map((p) => (
                <div key={p.codigo} className={`col-${tamanio}`}>
                  <div className="card h-100 shadow-sm">
                    <div className="card-header">{p.nombre}</div>
                    <div className="card-body d-flex flex-column gap-2 p-3">
                      <div className="d-flex flex-wrap gap-2">
                        <span className="badge bg-secondary rounded-pill">
                          {p.codigo}
                        </span>
                        <span className="badge bg-success-subtle rounded-pill text-dark">
                          {p.existencia} en stock
                        </span>
                      </div>

                      <p className="card-text mb-1 fw-semibold text-dark">
                        {formatoLempiras(p.precio)}
                      </p>
                      <p className="card-text text-muted mb-0">
                        valor de inventario{" "}
                        {formatoLempiras(p.existencia * p.precio)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default InventarioBodegas;
