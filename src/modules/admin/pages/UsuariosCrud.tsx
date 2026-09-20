import { Tabla } from "../../../components/Tabla";
import { useGetUsers } from "../../../api/usuariosAPI";
import { useSearchParams } from "react-router-dom";
import { useCrudUsuarios } from "../../../hooks/useCrudUsuarios";
import { useSearchParamDebounced } from "../../../hooks/useSearchParamDebounced";
import {
  UserForm,
  type UserFormData,
} from "../../../components/forms/UserForm";
import { Modal } from "../../../components/Modal";
import type { User } from "../../../types/User";
import FilaUsuarios from "../../../components/filas/FilaUsuarios";

function UsuariosCruds() {
  const [searchParams] = useSearchParams();
  const pageParams = searchParams.get("page");
  const page = pageParams ? Number(pageParams) : 1;
  const page_limit = 10;
  const { searchTerm, setSearchTerm, searchParam } =
    useSearchParamDebounced("search");

  const {
    data: usuarios,
    isLoading,
    isError,
  } = useGetUsers(page, page_limit, searchParam);
  const isLastPage = !usuarios || usuarios.length < page_limit;

  const {
    deleteUser,
    modalIsOpen,
    cerrarModal,
    userSeleccionado,
    abrirModalCrear,
    abrirModalEditar,
    createUser,
    updateUser,
  } = useCrudUsuarios();

  if (isLoading) {
    return (
      <div className="alert alert-warning" role="alert">
        ¡cargando usuarios!
      </div>
    );
  }

  if (isError) {
    return (
      <div className="alert alert-danger" role="alert">
        ¡No se pudieron cargar los usuarios!
      </div>
    );
  }

  const onSubmit = async (data: UserFormData) => {
    const correo = data.correo.trim();
    const password = data.password.trim();
    const rol = data.rol.trim();

    if (!correo || !password || !rol) {
      return;
    }

    if (userSeleccionado) {
      const userUpdate: User = {
        id: userSeleccionado.id,
        correo,
        password,
        rol,
      };

      await updateUser(userUpdate);
      cerrarModal();
      return;
    }

    const newUSer: User = {
      id: crypto.randomUUID(),
      correo,
      password,
      rol,
    };

    await createUser(newUSer);
    cerrarModal();
  };

  return (
    <div className="page-shell">
      <Tabla
        actionButton={abrirModalCrear}
        onSearchChange={setSearchTerm}
        searchValue={searchTerm}
        title="Gestión de Usuarios"
        description="Administra los accesos, roles y estados de los usuarios."
        titleButtonNew="Nuevo usuario"
        className="usuarios-table-card usuarios-pagination-compact"
        isLastPage={isLastPage}
      >
        <thead className="table-light text-secondary small text-uppercase">
          <tr>
            <th className="ps-4" style={{ width: "80px" }}>
              ID
            </th>
            <th>Correo electrónico</th>
            <th>Contraseña</th>
            <th>Rol</th>
            <th className="text-end pe-4" style={{ width: "140px" }}>
              Acciones
            </th>
          </tr>
        </thead>
        <tbody>
          {!usuarios || usuarios.length === 0 ? (
            <tr>
              <td colSpan={5} className="text-center py-5 text-muted">
                <i className="bi bi-person-exclamation fs-2 d-block mb-2"></i>
                <span>
                  No se encontraron usuarios que coincidan con la búsqueda.
                </span>
              </td>
            </tr>
          ) : (
            usuarios.map((usuario) => (
              <FilaUsuarios
                key={usuario.id}
                usuario={usuario}
                onEditar={abrirModalEditar}
                onEliminar={deleteUser}
              ></FilaUsuarios>
            ))
          )}
        </tbody>
      </Tabla>
      {modalIsOpen && (
        <Modal
          isOpen={modalIsOpen}
          onClose={cerrarModal}
          title={
            userSeleccionado === null ? "Crear un cliente" : "Editar un cliente"
          }
        >
          <UserForm
            onSubmit={onSubmit}
            cerrarModal={cerrarModal}
            userSeleccionado={userSeleccionado}
          />
        </Modal>
      )}
    </div>
  );
}

export default UsuariosCruds;
