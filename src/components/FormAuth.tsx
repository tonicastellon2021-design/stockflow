import { useForm } from "react-hook-form";

interface Props {
  title: string;
  subTitle: string;
  buttonText: string;
  onSubmit: (data: AuthData) => void;
}

export interface AuthData {
  email: string;
  password: string;
}

export function FormAuth({ title, subTitle, buttonText, onSubmit }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AuthData>();
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="form_container custom-modal-anim"
    >
      <div className="logo_container">
        <i
          className="bi bi-box-seam"
          style={{ fontSize: "36px", color: "var(--sf-green)" }}
        ></i>
      </div>

      <div className="title_container">
        <p className="title">{title}</p>
        <span className="subtitle">{subTitle}</span>
      </div>

      <div className="input_container">
        <label htmlFor="auth-email" className="input_label">
          Correo electrónico
        </label>
        <div className="input_field_wrapper">
          <i className="bi bi-envelope icon"></i>
          <input
            id="auth-email"
            placeholder="nombre@correo.com"
            title="Correo electrónico"
            type="email"
            className={errors.email ? "input_field input_error" : "input_field"}
            {...register("email", {
              required: "El correo es obligatorio",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Formato de correo inválido",
              },
            })}
          />
        </div>
        <p className="error_text">{errors.email?.message}</p>
      </div>

      <div className="input_container">
        <label htmlFor="auth-password" className="input_label">
          Contraseña
        </label>
        <div className="input_field_wrapper">
          <i className="bi bi-lock icon"></i>
          <input
            id="auth-password"
            {...register("password", {
              required: "La contraseña es obligatoria",
              minLength: {
                value: 5,
                message: "La contraseña debe tener al menos 5 caracteres",
              },
            })}
            placeholder="Introduce tu contraseña"
            title="Contraseña"
            type="password"
            className={
              errors.password ? "input_field input_error" : "input_field"
            }
          />
        </div>
        <p className="error_text">{errors.password?.message}</p>
      </div>

      <button
        disabled={isSubmitting}
        title="Iniciar sesión"
        type="submit"
        className="sign-in_btn "
      >
        <span>{isSubmitting ? "Cargando..." : buttonText}</span>
      </button>

      <p className="note">Términos de uso y Condiciones</p>
    </form>
  );
}
