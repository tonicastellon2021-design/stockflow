import { useSearchParams } from "react-router-dom";
import AsyncSelect from "react-select/async";
import { getCategorias } from "../api/productsAPI";
import type { CategoryOption } from "../types/CategoryOption";
import debouncePromise from "debounce-promise";

const funcionesConRetraso = debouncePromise(
  (inputValue: string) => getCategorias(inputValue),
  500,
);

export function CategoryFilter() {
  const [searchParams, setSearchParams] = useSearchParams();

  const categoriaParam = searchParams.get("categoria") || "";

  const currentOption: CategoryOption | null = categoriaParam
    ? { value: categoriaParam, label: categoriaParam }
    : null;

  const handleChange = (selectedOption: CategoryOption | null) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      if (selectedOption) {
        next.set("categoria", selectedOption.value);
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

          <div className="flex-grow-1" style={{ maxWidth: "260px" }}>
            <AsyncSelect<CategoryOption>
              cacheOptions
              defaultOptions
              isClearable
              value={currentOption}
              loadOptions={funcionesConRetraso}
              onChange={handleChange}
              placeholder="Todas las categorías"
              noOptionsMessage={() => "No hay resultados"}
              loadingMessage={() => "Cargando..."}
              styles={{
                control: (base) => ({
                  ...base,
                  backgroundColor: "transparent",
                  border: "none",
                  boxShadow: "none",
                  minHeight: "auto",
                  cursor: "pointer",
                }),
                menu: (base) => ({
                  ...base,
                  zIndex: 9999,
                }),
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
