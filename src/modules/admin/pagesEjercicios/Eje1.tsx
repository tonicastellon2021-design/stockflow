import { formatoLempiras } from "../../../utils/precios";

function ListaProductos() {
  const productos = [
    { codigo: "P001", nombre: "Mouse inalámbrico", precio: 450 },
    { codigo: "P002", nombre: "Teclado USB", precio: 650 },
    { codigo: "P003", nombre: "Monitor 24 pulgadas", precio: 4200 },
    { codigo: "P004", nombre: "Webcam HD", precio: 1250 },
  ];

  return (
    <div className="container-fluid">
      <div className="row">
        {productos.map((p) => (
          <div key={p.codigo} className="col-md-3 mb-3">
            <div className="card h-100 shadow-lg">
              <div className="card-body">
                <p className="card-text fw-bold">Codigo: {p.codigo}</p>
                <p className="card-text">{p.nombre}</p>
                <p className="card-text">Precio: {formatoLempiras(p.precio)}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ListaProductos;
