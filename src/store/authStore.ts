import { create } from "zustand";
import type { User } from "../types/User";
import { persist } from "zustand/middleware";
import { logoutSwal, successF } from "../utils/cartAlerts";
import { getUSerLogin } from "../api/usuariosAPI";

interface UserState {
  user: User | null;
  login: (email: string, password: string) => Promise<User>;
  logout: () => void;
}

export const useAuthStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,

      login: async (email: string, password: string) => {
        const usuario = await getUSerLogin(email);

        if (!usuario || usuario.password !== password) {
          throw new Error("Correo o contraseña incorrectos");
        }
        successF("inicio de sesion", "has iniciado sesion correctamente");
        set({ user: usuario });
        return usuario;
      },

      logout: () => {
        logoutSwal().then(() => {
          set({ user: null });
        });
      },
    }),
    {
      name: "user",
    },
  ),
);
