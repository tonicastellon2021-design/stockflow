import type { User } from "../../types/User";
import { useForm } from "react-hook-form";

export interface UserFormData {
  correo: string;
  password: string;
  rol: string;
}

interface Props {
  cerrarModal: () => void;
  userSeleccionado: User | null;
  onSubmit: (data: UserFormData) => void | Promise<void>;
}

export function UserForm({ cerrarModal, userSeleccionado, onSubmit }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserFormData>({
    defaultValues: {
      correo: userSeleccionado?.correo ?? "",
      password: userSeleccionado?.password ?? "",
      rol: userSeleccionado?.rol ?? "cliente",
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-3">
        <label className="form-label fw-semibold">Correo electrónico</label>
        <input
          type="text"
          className={`form-control ${errors.correo ? "is-invalid" : ""}`}
          placeholder="nombre@correo.com"
          {...register("correo", {
            required: "El correo es obligatorio",
            setValueAs: (value) => value?.trim(),
            validate: (value) =>
              value.trim().length > 0 || "El correo es obligatorio",
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: "Formato de correo inválido",
            },
          })}
        />
        <span className="error_text">{errors.correo?.message}</span>
      </div>
      <div className="mb-3">
        <label className="form-label fw-semibold">Contraseña</label>
        <input
          type="password"
          className={`form-control ${errors.password ? "is-invalid" : ""}`}
          placeholder="0801XXXXXXXXXX"
          {...register("password", {
            required: "La contraseña es obligatoria",
            minLength: {
              value: 5,
              message: "La contraseña debe tener al menos 5 caracteres",
            },
          })}
        />
        <span className="error_text">{errors.password?.message}</span>
      </div>
      <div className="mb-3">
        <label className="form-label fw-semibold">Rol</label>
        <select
          className={`form-select ${errors.rol ? "is-invalid" : ""}`}
          {...register("rol", {
            required: "El rol es obligatorio",
          })}
        >
          <option value="">Selecciona un rol</option>
          <option value="cliente">Cliente</option>
          <option value="admin">Administrador</option>
        </select>
        <span className="error_text">{errors.rol?.message}</span>
      </div>
      <div className="d-flex justify-content-end gap-2 mt-4">
        <button onClick={cerrarModal} type="button" className="btn btn-light">
          Cancelar
        </button>
        <button type="submit" className="btn btn-success">
          {userSeleccionado ? "Actualizar cliente" : "Guardar cliente"}
        </button>
      </div>
    </form>
  );
}
