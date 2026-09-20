import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import type { Product } from "../types/Product";
import { catalogApi } from "./axiosClients";
import axios from "axios";

async function getProducts(
  page?: number | undefined,
  limit?: number | undefined,
  categoria?: string | undefined,
  search?: string | undefined,
): Promise<Product[]> {
  const params: Record<string, unknown> = { page, limit, categoria, search };

  const response = await catalogApi.get<Product[]>("/productos", { params });
  return response.data;
}

async function postProduct(product: Product) {
  try {
    const response = catalogApi.post("/productos", product);
    return (await response).data;
  } catch (error) {
    throw new Error("Error creando el producto", {
      cause: error,
    });
  }
}

async function deleteProduct(product: Product) {
  try {
    const response = await catalogApi.delete(`/productos/${product.id}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      throw new Error("El producto no existe o ya fue eliminado.", {
        cause: error,
      });
    }
    throw new Error("Error eliminando el producto", {
      cause: error,
    });
  }
}

async function putProduct(product: Product) {
  try {
    const response = await catalogApi.put(`/productos/${product.id}`, product);
    return response.data;
  } catch (error) {
    throw new Error("Error al actualizar el producto", {
      cause: error,
    });
  }
}

export function useProducts({
  page,
  limit,
  categoria,
  search,
}: {
  page?: number;
  limit?: number;
  categoria?: string | null;
  search?: string | null;
} = {}) {
  return useQuery({
    queryKey: ["productos", { page, limit, categoria, search }],
    queryFn: () =>
      getProducts(page, limit, categoria ?? undefined, search ?? undefined),
    // evita el parpadeo al canbiar de paguina
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 5, // 5 minutos (Datos frescos por 5 min)
    gcTime: 1000 * 60 * 15, // 15 minutos (Datos en caché por 15 min antes de eliminarse)
  });
}

export function usePostProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["productos"],
      });
    },
  });
}

export function useDeleteProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["productos"],
      });
    },
  });
}

export function usePutProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: putProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["productos"],
      });
    },
  });
}
