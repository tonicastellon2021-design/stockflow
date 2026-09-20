import { useMemo } from "react";
import { useGetPedidos } from "../api/pedidoApi";
import { useGetUsers } from "../api/usuariosAPI";
import { useProducts } from "../api/productsAPI";

export function useReportes() {
  const {
    data: dataPedido,
    isLoading: pedidosLoading,
    isError: pedidosError,
  } = useGetPedidos();
  const {
    data: dataUsuarios,
    isLoading: usuariosLoading,
    isError: usuariosError,
  } = useGetUsers();
  const {
    data: dataProductos,
    isLoading: productosLoading,
    isError: productosError,
  } = useProducts();

  const isLoading = pedidosLoading || usuariosLoading || productosLoading;
  const isError = pedidosError || usuariosError || productosError;

  const pedidosEstado = dataPedido?.filter((p) => p.estado !== "Cancelado");
  const pedidosPendientes =
    dataPedido?.filter((p) => p.estado === "Pendiente").length ?? 0;

  const usersCantidad = dataUsuarios?.length ?? 0;

  const ingresosTotales = useMemo(() => {
    return pedidosEstado?.reduce((acc, item) => acc + item.montoTotal, 0);
  }, [pedidosEstado]);

  const productosStock =
    dataProductos?.filter((p) => p.stock <= 10).length ?? 0;

  return {
    isLoading,
    isError,
    ingresosTotales,
    pedidosPendientes,
    usersCantidad,
    productosStock,
  };
}
