import axios from "axios";
import type { User } from "../types/User";
import { orderAPI } from "./axiosClients";
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { errorValid } from "../utils/cartAlerts";

//funcion para traer usuarios (10 por peticion)
export async function getUsers(
  page: number | undefined,
  limit: number | undefined,
  search?: string | undefined,
): Promise<User[] | null> {
  try {
    const params: Record<string, unknown> = { page, limit, search };

    const response = await orderAPI.get<User[]>("/usuarios", {
      params,
    });

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      return null;
    }
    throw new Error("Error al traer la data de los usuarios", {
      cause: error,
    });
  }
}

//funcion para traer un usuario
export async function getUSerLogin(email: string): Promise<User | null> {
  try {
    const response = await orderAPI.get<User[]>("/usuarios", {
      params: {
        correo: email,
      },
    });
    return response.data[0] ?? null; // si el array viene vacío, no hay usuario
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      return null;
    }
    throw new Error("No se pudo verificar el correo, intenta de nuevo", {
      cause: error,
    });
  }
}

export async function deleteUserApi(userId: string) {
  try {
    const response = await orderAPI.delete(`/usuarios/${userId}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      throw new Error("El usuario no existe o ya fue eliminado.", {
        cause: error,
      });
    }
    throw new Error("Error eliminando el usuario", {
      cause: error,
    });
  }
}

//funcion para crear un nuevo usuario
async function postUser(user: User) {
  try {
    const response = await orderAPI.post("/usuarios", user);

    return response.data;
  } catch (error) {
    throw new Error("Error al crear el usuario", {
      cause: error,
    });
  }
}

export function useCreateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["usuarios"] });
    },
    onError: () => {
      errorValid("Error", "Error creando el usuario");
    },
  });
}

export function useGetUsers(
  page: number | undefined,
  limit: number | undefined,
  search?: string | undefined,
) {
  return useQuery({
    queryKey: ["usuarios", { page, limit, search }],
    queryFn: () => getUsers(page, limit, search),
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 15,
  });
}

export function useDeleteUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteUserApi,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["usuarios"],
      });
    },
  });
}
