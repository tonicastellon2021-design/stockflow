import { useMutation, useQueryClient } from "@tanstack/react-query";
import { catalogApi } from "../api/axiosClients";
import type { ItemPedido } from "../types/Pedido";
import type { Product } from "../types/Product";

export async function reducirStock(items: ItemPedido[]) {
  //primise.all ejecuta todas las acciones al mismo tiempo lo utilisamos aca porque un item no depende de que otro se haya finalisado
  await Promise.all(
    items.map(async (item) => {
      const { data: producto } = await catalogApi.get<Product>(
        `/productos/${item.productoId}`,
      );

      const nuevoStock = producto.stock - item.cantidad;

      await catalogApi.put(`/productos/${item.productoId}`, {
        ...producto,
        stock: nuevoStock,
      });
    }),
  );
}

export function useReducirStock() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: reducirStock,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["productos"] });
    },
  });
}
