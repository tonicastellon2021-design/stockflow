import { useSearchParams } from "react-router-dom";

export function CategoryFilter() {
  const [searchParams, setSearchParams] = useSearchParams();

  const categoria = searchParams.get("categoria") || "";

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      if (selectedValue) {
        next.set("categoria", selectedValue);
      } else {
        next.delete("categoria");
      }
      next.set("page", "1");
      return next;
    });
  };

  return (
    <div className="row justify-content-center my-4">
      <div className="col-12 col-md-5">
        <div className="d-flex align-items-center justify-content-center gap-2 rounded-4 border border-light-subtle bg-light px-3 py-2 shadow-sm">
          <i className="bi bi-funnel text-success fs-5"></i>
          <span className="small fw-semibold text-secondary">Categoría</span>
          <select
            className="form-select border-0 bg-transparent shadow-none text-dark fw-medium"
            value={categoria}
            onChange={handleChange}
            aria-label="Seleccionar categoría"
            style={{ maxWidth: "260px" }}
          >
            <option value="">Todas las categorías</option>
            <option value="Procesador">Procesadores</option>
            <option value="Memoria RAM">Memoria RAM</option>
            <option value="Tarjeta gráfica">Tarjetas de gráficas</option>
            <option value="Tarjeta madre">Tarjeta madre</option>
            <option value="Almacenamiento">Almacenamiento</option>
            <option value="Refrigeración">Refrigeración</option>
            <option value="Fuente de poder">Fuente de poder</option>
          </select>
        </div>
      </div>
    </div>
  );
}
