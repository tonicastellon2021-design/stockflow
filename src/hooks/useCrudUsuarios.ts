import { useCallback, useState } from "react";
import {
  getUSerLogin,
  useCreateUser,
  useDeleteUser,
  usePutUser,
} from "../api/usuariosAPI";
import type { User } from "../types/User";
import { confirmDelete, errorValid, successF } from "../utils/cartAlerts";

export function useCrudUsuarios() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [userSeleccionado, setUserSeleccionado] = useState<User | null>(null);
  const deleteMutation = useDeleteUser();
  const createMutation = useCreateUser();
  const updateMutation = usePutUser();

  const cerrarModal = useCallback(() => {
    setModalIsOpen(false);
    setUserSeleccionado(null);
  }, []);

  const abrirModalEditar = useCallback((user: User) => {
    setUserSeleccionado(user);
    setModalIsOpen(true);
  }, []);

  const abrirModalCrear = useCallback(() => {
    setUserSeleccionado(null);
    setModalIsOpen(true);
  }, []);

  const deleteUser = useCallback(
    async (user: User) => {
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
    },
    [deleteMutation],
  );

  const createUser = useCallback(
    async (user: User) => {
      try {
        const userExis = await getUSerLogin(user.correo);

        if (userExis) {
          errorValid(
            "Usuario invalido",
            "El correo ya pertenece a otro usuario",
          );
          return;
        }

        await createMutation.mutateAsync(user);
        successF("Usuario creado", "El usuario fue creado correctamente");
      } catch (error) {
        const mensaje =
          error instanceof Error
            ? error.message
            : "No se pudo crear el usuario";

        errorValid("Error al crear", mensaje);
      }
    },
    [createMutation],
  );

  const updateUser = useCallback(
    async (user: User) => {
      try {
        await updateMutation.mutateAsync(user);
        successF(
          "usuario actualizado",
          "El usuario se actualizo correctamente",
        );
      } catch (error) {
        const mensaje =
          error instanceof Error
            ? error.message
            : "No se pudo actualizar el usuario";

        errorValid("Error al actualizar", mensaje);
      }
    },
    [updateMutation],
  );

  return {
    modalIsOpen,
    userSeleccionado,
    cerrarModal,
    abrirModalEditar,
    abrirModalCrear,
    deleteUser,
    createUser,
    updateUser,
  };
}
