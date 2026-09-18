import { useNavigate } from "react-router-dom";
import { FormAuth, type AuthData } from "../../../components/FormAuth";
import { errorValid } from "../../../utils/cartAlerts";
import { getUSerLogin, useCreateUser } from "../../../api/usuariosAPI";
import type { User } from "../../../types/User";
import { useAuthStore } from "../../../store/authStore";

export function RegisterPage() {
  const mutation = useCreateUser();
  const login = useAuthStore((s) => s.login);
  const navigate = useNavigate();

  const handleSubmitRe = async (data: AuthData) => {
    const mailLim = data.email.trim();
    const paswordLim = data.password.trim();

    const usuarioExiste = await getUSerLogin(mailLim);

    if (usuarioExiste !== null) {
      errorValid(
        "Correo existente",
        "está dirección de correo ya esta registrada",
      );
      return;
    }

    const newUser: User = {
      id: crypto.randomUUID(),
      correo: mailLim,
      password: paswordLim,
      rol: "cliente",
    };

    try {
      await mutation.mutateAsync(newUser);
      const user = await login(mailLim, paswordLim);

      navigate(user.rol === "admin" ? "/admin" : "/");
    } catch {
      errorValid(
        "Error en registro",
        "No se pudo completar el inicio de sesión automático.",
      );
    }
  };

  return (
    <FormAuth
      onSubmit={handleSubmitRe}
      title="Empieza creando una cuenta"
      subTitle="Comienza a usar nuestra aplicación, solo crea una cuenta y disfruta
            de la experiencia."
      buttonText="Crear cuenta"
    />
  );
}
