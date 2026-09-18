import { Tabla } from "../../../components/Tabla";
import { useGetUsers } from "../../../api/usuariosAPI";
import { useSearchParams } from "react-router-dom";
import { useCrudUsuarios } from "../../../hooks/useCrudUsuarios";
import { useDebounce } from "../../../hooks/useDebounce";
import { useEffect, useState } from "react";
import {
  UserForm,
  type UserFormData,
} from "../../../components/forms/UserForm";
import type { User } from "../../../types/User";

export function UsuariosCruds() {
  const [searchParams, setSearchParams] = useSearchParams();
  const pageParams = searchParams.get("page");
  const page = pageParams ? Number(pageParams) : 1;
  const page_limit = 10;
  const searchParam = searchParams.get("search") ?? "";
  const [searchTerm, setSearchTerm] = useState(searchParam);

  const debounce = useDebounce(searchTerm).trim();

  useEffect(() => {
    if (debounce === searchParam) return;

    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);

      if (debounce) {
        next.set("search", debounce);
      } else {
        next.delete("search");
      }

      next.set("page", "1");
      return next;
    });
  }, [debounce, searchParam, setSearchParams]);

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
    if (userSeleccionado) {
      const userUpdate: User = {
        id: userSeleccionado.id,
        correo: data.correo,
        password: data.password,
        rol: data.rol,
      };

      await updateUser(userUpdate);
      return;
    }
    const newUSer: User = {
      id: crypto.randomUUID(),
      correo: data.correo,
      password: data.password,
      rol: data.rol,
    };

    await createUser(newUSer);
    cerrarModal();
  };

  return (
    <div className="usuarios-page-shell">
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
              <tr key={usuario.id}>
                <td className="ps-4 fw-semibold text-muted">#{usuario.id}</td>
                <td>
                  <div className="d-flex align-items-center gap-2">
                    <div
                      className="bg-light rounded-circle d-flex align-items-center justify-content-center text-muted"
                      style={{ width: "32px", height: "32px" }}
                    >
                      <i className="bi bi-person"></i>
                    </div>
                    <span className="fw-medium text-dark">
                      {usuario.correo}
                    </span>
                  </div>
                </td>
                <td className="text-secondary">{usuario.password}</td>
                <td>
                  <span
                    className={`badge border px-2 py-1 fw-normal ${
                      usuario.rol === "admin"
                        ? "bg-danger-subtle text-danger border-danger-subtle"
                        : "bg-success-subtle text-success border-success-subtle"
                    }`}
                  >
                    {usuario.rol}
                  </span>
                </td>
                <td className="text-end pe-4">
                  <div className="d-flex justify-content-end gap-1">
                    <button
                      disabled={usuario.rol === "admin"}
                      onClick={() => abrirModalEditar(usuario)}
                      className="btn btn-sm user-action user-action-edit"
                      title="Editar"
                      aria-label={`Editar usuario ${usuario.correo}`}
                    >
                      <i className="bi bi-pencil-square"></i>
                    </button>
                    <button
                      disabled={usuario.rol === "admin"}
                      onClick={() => deleteUser(usuario)}
                      className="btn btn-sm user-action user-action-delete"
                      title="Eliminar"
                      aria-label={`Eliminar usuario ${usuario.correo}`}
                    >
                      <i className="bi bi-trash3"></i>
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Tabla>
      {modalIsOpen && (
        <UserForm
          onSubmit={onSubmit}
          modalIsOpen={modalIsOpen}
          cerrarModal={cerrarModal}
          userSeleccionado={userSeleccionado}
        ></UserForm>
      )}
    </div>
  );
}
