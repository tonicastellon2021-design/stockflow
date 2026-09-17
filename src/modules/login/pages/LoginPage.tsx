import { FormAuth, type AuthData } from "../../../components/FormAuth";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../../store/authStore";

export function LoginPage() {
  const login = useAuthStore((s) => s.login);
  const navigate = useNavigate();

  const handleSubmitLo = async (data: AuthData) => {
    const email = data.email.trim();
    const password = data.password.trim();

    try {
      const user = await login(email, password);

      if (user.rol === "admin") {
        navigate("/admin", { replace: true });
      } else {
        navigate("/", { replace: true });
      }
    } catch (error) {
      const mensaje =
        error instanceof Error ? error.message : "Error desconocido";

      Swal.fire({
        icon: "error",
        title: "error",
        text: mensaje,
      });
    }
  };

  return (
    <FormAuth
      onSubmit={handleSubmitLo}
      title="Inicia sesión en tu cuenta"
      subTitle="Ingresa a tu cuenta para continuar y disfruta de toda la experiencia."
      buttonText="Iniciar sesión"
    />
  );
}
