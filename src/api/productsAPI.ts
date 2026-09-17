import { keepPreviousData, useQuery } from "@tanstack/react-query";
import type { Product } from "../types/Product";
import { catalogApi } from "./axiosClients";

export async function getProducts({
  page = 1,
  limit = 6,
  categoria = null,
}: {
  page?: number;
  limit?: number;
  categoria?: string | null;
} = {}): Promise<Product[]> {
  const params: Record<string, unknown> = { page, limit };

  if (categoria) {
    params.categoria = categoria;
  }

  const response = await catalogApi.get<Product[]>("/productos", { params });
  return response.data;
}

export function useProducts({
  page,
  limit,
  categoria,
}: {
  page?: number;
  limit?: number;
  categoria?: string | null;
} = {}) {
  return useQuery({
    queryKey: ["productos", { page, limit, categoria }],
    queryFn: () => getProducts({ page, limit, categoria }),
    // evita el parpadeo al canbiar de paguina
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 5, // 5 minutos (Datos frescos por 5 min)
    gcTime: 1000 * 60 * 15, // 15 minutos (Datos en caché por 15 min antes de eliminarse)
  });
}
