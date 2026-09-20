import { useCallback, useState } from "react";
import type { Product } from "../types/Product";
import { confirmDelete, errorValid, successF } from "../utils/cartAlerts";
import {
  useDeleteProduct,
  usePostProduct,
  usePutProduct,
} from "../api/productsAPI";

export function useCrudProductos() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [producSelect, setProducSelect] = useState<Product | null>(null);
  const deleteMutatioin = useDeleteProduct();
  const postMutation = usePostProduct();
  const putMutation = usePutProduct();

  const cerrarModal = useCallback(() => {
    setModalIsOpen(false);
    setProducSelect(null);
  }, []);

  const abrirModalCrear = useCallback(() => {
    setModalIsOpen(true);
    setProducSelect(null);
  }, []);

  const abrirModalEditar = useCallback((product: Product) => {
    setModalIsOpen(true);
    setProducSelect(product);
  }, []);

  const deleteProduct = useCallback(
    async (product: Product) => {
      const confirm = await confirmDelete(
        "Eliminar producto",
        `El producto: ${product.nombre} se va a eliminar`,
      );

      if (!confirm) return;

      try {
        await deleteMutatioin.mutateAsync(product);
        successF("Producto eliminado", "El producto se ha eliminado con exito");
      } catch (error) {
        const mensaje =
          error instanceof Error ? error.message : "Error desconocido";

        errorValid("Error al eliminar", mensaje);
        console.error(error);
      }
    },
    [deleteMutatioin],
  );

  const postProduct = useCallback(
    async (product: Product) => {
      try {
        await postMutation.mutateAsync(product);
        successF("Producto creado", "Producto creado correctamente");
      } catch (error) {
        const mensaje =
          error instanceof Error ? error.message : "Error desconocido";

        errorValid("Error al crear", mensaje);
      }
    },
    [postMutation],
  );

  const putProduct = useCallback(
    async (product: Product) => {
      try {
        await putMutation.mutateAsync(product);
        successF(
          "Producto actualizado",
          "El producto se actualizo correctamente",
        );
      } catch (error) {
        const mensaje =
          error instanceof Error ? error.message : "Error desconocido";
        errorValid("Error al actualizar", mensaje);
      }
    },
    [putMutation],
  );

  return {
    producSelect,
    modalIsOpen,
    cerrarModal,
    abrirModalCrear,
    abrirModalEditar,
    deleteProduct,
    postProduct,
    putProduct,
  };
}
