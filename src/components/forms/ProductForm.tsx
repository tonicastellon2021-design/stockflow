import { useState } from "react";
import { useForm } from "react-hook-form";
import type { Product } from "../../types/Product";
import { CATEGORIAS } from "../../constants/categorias";
import Select from "react-select";

export interface ProductformData {
  nombre: string;
  precio: number;
  categoria: string;
  stock: number;
  image?: string;
  descripcion: string;
}

type ProductFormFields = Omit<ProductformData, "categoria">;

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
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(
    () =>
      CATEGORIAS.find(
        (categoria) => categoria.value === productSeleccionado?.categoria,
      ) ?? CATEGORIAS[0],
  );

  const {
    handleSubmit,
    register,
    formState: { errors },
    watch,
  } = useForm<ProductFormFields>({
    defaultValues: {
      nombre: productSeleccionado?.nombre ?? "",
      precio: productSeleccionado?.precio ?? 0,
      stock: productSeleccionado?.stock ?? 0,
      image: productSeleccionado?.image ?? "",
      descripcion: productSeleccionado?.descripcion ?? "",
    },
  });

  // eslint-disable-next-line react-hooks/incompatible-library
  const previewUrl = (watch("image") ?? "").trim();

  return (
    <form
      onSubmit={handleSubmit((data) =>
        onSubmit({ ...data, categoria: categoriaSeleccionada.value }),
      )}
    >
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
        <Select<(typeof CATEGORIAS)[number]>
          options={CATEGORIAS}
          value={categoriaSeleccionada}
          onChange={(opcion) => {
            if (opcion) setCategoriaSeleccionada(opcion);
          }}
          isClearable={false}
          isSearchable={false}
          menuPortalTarget={document.body}
          styles={{
            control: (base, state) => ({
              ...base,
              minWidth: 0,
              backgroundColor: "#ffffff",
              borderColor: state.isFocused ? "var(--sf-green)" : "#ced4da",
              boxShadow: state.isFocused
                ? "0 0 0 0.2rem rgba(25, 135, 84, 0.25)"
                : "none",
              cursor: "pointer",
              ":hover": { borderColor: "var(--sf-green)" },
            }),
            singleValue: (base) => ({ ...base, color: "#212529" }),
            placeholder: (base) => ({ ...base, color: "#6c757d" }),
            dropdownIndicator: (base, state) => ({
              ...base,
              color: state.isFocused ? "var(--sf-green)" : "#6c757d",
              ":hover": { color: "var(--sf-green)" },
            }),
            indicatorSeparator: (base) => ({
              ...base,
              backgroundColor: "#ced4da",
            }),
            menu: (base) => ({
              ...base,
              backgroundColor: "#ffffff",
              border: "1px solid #ced4da",
              zIndex: 2000,
            }),
            menuPortal: (base) => ({ ...base, zIndex: 2000 }),
            option: (base, state) => ({
              ...base,
              backgroundColor: state.isSelected
                ? "var(--sf-green)"
                : state.isFocused
                  ? "rgba(25, 135, 84, 0.12)"
                  : "#ffffff",
              color: state.isSelected ? "#ffffff" : "#212529",
              cursor: "pointer",
              ":active": {
                backgroundColor: "var(--sf-green-hover)",
                color: "#ffffff",
              },
            }),
          }}
        />
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
