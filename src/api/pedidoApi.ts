import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import type { Pedido } from "../types/Pedido";
import { orderAPI } from "./axiosClients";

async function getPedidos(
  page?: number | undefined,
  limit?: number | undefined,
  search?: string | undefined,
): Promise<Pedido[] | null> {
  try {
    const params: Record<string, unknown> = { page, limit, search };

    const response = await orderAPI.get("/pedidos", { params });
    return response.data;
  } catch (error) {
    throw new Error("Error al traer la data de los pedidos", {
      cause: error,
    });
  }
}

async function putPedido(pedido: Pedido) {
  try {
    const response = await orderAPI.put(`/pedidos/${pedido.id}`, pedido);
    return response.data;
  } catch (error) {
    throw new Error("Error actualizando el pedido", {
      cause: error,
    });
  }
}

//funcion para crear pedido
async function postPedido(pedido: Pedido) {
  try {
    const response = await orderAPI.post("/pedidos", pedido);
    return response.data;
  } catch (error) {
    throw new Error("Error al crear el pedido", {
      cause: error,
    });
  }
}

export function useCreatePedido() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postPedido,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pedidos"] });
    },
  });
}

export function useGetPedidos(
  page?: number | undefined,
  limit?: number | undefined,
  search?: string | undefined,
) {
  return useQuery({
    queryKey: ["pedidos", { page, limit, search }],
    queryFn: () => getPedidos(page, limit, search),
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 15,
  });
}

export function usePutPedido() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: putPedido,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["pedidos"],
      });
    },
  });
}
