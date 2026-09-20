import { useCreatePedido, usePutPedido } from "../api/pedidoApi";
import { useCartStore } from "../store/cartStore";
import { useAuthStore } from "../store/authStore";
import type { CartItem } from "../types/CartItem";
import type { ItemPedido, Pedido } from "../types/Pedido";
import { errorValid, successF } from "../utils/cartAlerts";
import { useReducirStock } from "./useReducirStock";

interface Props {
  montoTotal: number;
  cart: CartItem[];
  tipoPago: string;
}

export function usePedido() {
  const user = useAuthStore((s) => s.user);
  const vaciarCarrito = useCartStore((s) => s.vaciarCarrito);
  const mutate = useCreatePedido();
  const reducirStockMutation = useReducirStock();
  const putMutation = usePutPedido();

  const procesarPedido = async ({ montoTotal, cart, tipoPago }: Props) => {
    if (user === null) {
      errorValid(
        "No autenticado",
        "Necesitas iniciar sesion en tu cuenta para procesar el pedido",
      );
      return false;
    }

    const items: ItemPedido[] = cart.map((item) => {
      return {
        productoId: item.producto.id,
        nombre: item.producto.nombre,
        cantidad: item.cantidad,
        precioUnitario: item.producto.precio,
      };
    });

    const newPedido: Pedido = {
      id: crypto.randomUUID(),
      fechaCreacion: new Date().toISOString(),
      mailCliente: user.correo,
      montoTotal,
      estado: "Pendiente",
      items,
      tipoPago,
    };

    try {
      await mutate.mutateAsync(newPedido);
    } catch (error) {
      errorValid("No se pudo crear el pedido", "Intenta de nuevo.");
      console.log(error);
      return false;
    }

    try {
      await reducirStockMutation.mutateAsync(items);
    } catch (error) {
      errorValid(
        "Pedido registrado con un problema",
        "Tu pedido se guardó, pero hubo un error actualizando el inventario. Contáctanos con tu número de pedido.",
      );
      console.log(error);
      return false;
    }
    successF("Compra procesada", "El pedido se ha realizado con exito");
    vaciarCarrito();
    return true;
  };

  const putPedido = async (pedido: Pedido, nuevoEstado: string) => {
    try {
      const pedidoActualizado = {
        ...pedido,
        estado: nuevoEstado,
      };

      await putMutation.mutateAsync(pedidoActualizado);
      successF("Estado actualizado", "El estado se actualizo correctamente");
    } catch (error) {
      const mensaje =
        error instanceof Error ? error.message : "Error desconocido";
      errorValid("Error", mensaje);
    }
  };

  return { procesarPedido, putPedido };
}
