import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Pedido } from "../types/Pedido";
import { orderAPI } from "./axiosClients";

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
