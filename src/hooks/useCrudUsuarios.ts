import { useState } from "react";
import { useDeleteUser } from "../api/usuariosAPI";
import type { User } from "../types/User";
import { confirmDelete, errorValid, successF } from "../utils/cartAlerts";

export function useCrudUsuarios() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [userSeleccionado, setUserSeleccionado] = useState<User | null>(null);
  const deleteMutation = useDeleteUser();

  const cerrarModal = () => {
    setModalIsOpen(false);
    setUserSeleccionado(null);
  };

  const abrirModalEditar = (user: User) => {
    setUserSeleccionado(user);
    setModalIsOpen(true);
  };

  const abrirModalCrear = () => {
    setUserSeleccionado(null);
    setModalIsOpen(true);
  };

  const deleteUser = async (user: User) => {
    const confir = await confirmDelete(
      "¿Eliminar usuario?",
      `El usuario con el email: ${user.correo} se va a eliminar`,
    );

    if (!confir) return;

    try {
      await deleteMutation.mutateAsync(user.id);

      successF("Usuario eliminado", "El usuario ha sido eliminado con exito");
    } catch (error) {
      const mensaje =
        error instanceof Error ? error.message : "Error desconocido";

      errorValid("Error al eliminar", mensaje);
      console.error(error);
    }
  };

  return {
    modalIsOpen,
    userSeleccionado,
    cerrarModal,
    abrirModalEditar,
    abrirModalCrear,
    deleteUser,
  };
}
