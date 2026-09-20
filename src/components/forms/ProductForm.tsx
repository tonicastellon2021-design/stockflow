import { useForm } from "react-hook-form";
import type { Product } from "../../types/Product";
import { CATEGORIAS } from "../../constants/categorias";

export interface ProductformData {
  nombre: string;
  precio: number;
  categoria: string;
  stock: number;
  image?: string;
  descripcion: string;
}

interface Props {
  cerrarModal: () => void;
  productSeleccionado: Product | null;
  onSubmit: (data: ProductformData) => void | Promise<void>;
}

export function ProductForm({
  cerrarModal,
  productSeleccionado,
  onSubmit,
}: Props) {
  const {
    handleSubmit,
    register,
    formState: { errors },
    watch,
  } = useForm<ProductformData>({
    defaultValues: {
      nombre: productSeleccionado?.nombre ?? "",
      precio: productSeleccionado?.precio ?? 0,
      categoria: productSeleccionado?.categoria ?? "",
      stock: productSeleccionado?.stock ?? 0,
      image: productSeleccionado?.image ?? "",
      descripcion: productSeleccionado?.descripcion ?? "",
    },
  });

  // eslint-disable-next-line react-hooks/incompatible-library
  const previewUrl = (watch("image") ?? "").trim();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-3">
        <label className="form-label fw-semibold">Nombre del producto</label>
        <input
          type="text"
          className={`form-control ${errors.nombre ? "is-invalid" : ""}`}
          placeholder="ejem: AMD Ryzen 5 5600"
          {...register("nombre", {
            required: "El nombre es obligatorio",
            setValueAs: (value) => value?.trim(),
            minLength: {
              value: 3,
              message: "El nombre debe tener al menos 3 caracteres",
            },
          })}
        />
        <span className="error_text">{errors.nombre?.message}</span>
      </div>

      <div className="mb-3">
        <label className="form-label fw-semibold">Precio</label>
        <input
          type="number"
          step="0.01"
          className={`form-control ${errors.precio ? "is-invalid" : ""}`}
          placeholder="1200"
          {...register("precio", {
            required: "El precio es obligatorio",
            valueAsNumber: true,
            min: {
              value: 1,
              message: "El precio debe ser mayor a 0",
            },
          })}
        />
        <span className="error_text">{errors.precio?.message}</span>
      </div>

      <div className="mb-3">
        <label className="form-label fw-semibold">Categoría</label>
        <select
          className={`form-select ${errors.categoria ? "is-invalid" : ""}`}
          {...register("categoria", {
            required: "La categoría es obligatoria",
            validate: (value) =>
              value.trim().length > 0 || "La categoría es obligatoria",
          })}
        >
          <option value="">Selecciona una categoría</option>
          {CATEGORIAS.map(({ value }) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </select>
        <span className="error_text">{errors.categoria?.message}</span>
      </div>

      <div className="mb-3">
        <label className="form-label fw-semibold">Stock</label>
        <input
          type="number"
          className={`form-control ${errors.stock ? "is-invalid" : ""}`}
          placeholder="50"
          {...register("stock", {
            required: "El stock es obligatorio",
            valueAsNumber: true,
            min: {
              value: 0,
              message: "El stock no puede ser negativo",
            },
          })}
        />
        <span className="error_text">{errors.stock?.message}</span>
      </div>

      <div className="mb-3">
        <label className="form-label fw-semibold">URL de la imagen</label>
        <input
          type="url"
          className={`form-control ${errors.image ? "is-invalid" : ""}`}
          placeholder="https://example.com/producto.jpg"
          {...register("image", {
            setValueAs: (value) => value?.trim() ?? "",
            validate: (value) =>
              !value ||
              /^https?:\/\/.+/.test(value) ||
              "La URL de la imagen no es válida",
          })}
        />
        <span className="error_text">{errors.image?.message}</span>

        {previewUrl && (
          <div className="mt-3">
            <div className="small text-muted mb-2">Vista previa</div>
            <img
              src={previewUrl}
              alt="Vista previa del producto"
              className="img-fluid rounded border"
              style={{
                maxWidth: "120px",
                maxHeight: "120px",
                objectFit: "cover",
              }}
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
          </div>
        )}
      </div>

      <div className="mb-3">
        <label className="form-label fw-semibold">Descripción</label>
        <textarea
          className={`form-control ${errors.descripcion ? "is-invalid" : ""}`}
          rows={4}
          placeholder="Describe las características del producto"
          {...register("descripcion", {
            required: "La descripción es obligatoria",
            setValueAs: (value) => value?.trim(),
            validate: (value) =>
              value.trim().length >= 10 ||
              "La descripción debe tener al menos 10 caracteres",
          })}
        />
        <span className="error_text">{errors.descripcion?.message}</span>
      </div>

      <div className="d-flex justify-content-end gap-2 mt-4">
        <button onClick={cerrarModal} type="button" className="btn btn-light">
          Cancelar
        </button>
        <button type="submit" className="btn btn-success">
          {productSeleccionado ? "Actualizar producto" : "Guardar producto"}
        </button>
      </div>
    </form>
  );
}
