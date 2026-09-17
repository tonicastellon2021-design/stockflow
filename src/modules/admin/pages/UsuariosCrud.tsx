import { Tabla } from "../../../components/Tabla";
import { useGetUsers } from "../../../api/usuariosAPI";
import { useSearchParams } from "react-router-dom";
import { useCrudUsuarios } from "../../../hooks/useCrudUsuarios";
import { useDebounce } from "../../../hooks/useDebounce";
import { useEffect, useState } from "react";
import { Modal } from "../../../components/Modal";

export function UsuariosCruds() {
  const [searchParams, setSearchParams] = useSearchParams();
  const pageParams = searchParams.get("page");
  const page = pageParams ? Number(pageParams) : 1;
  const page_limit = 10;
  const searchParam = searchParams.get("search") ?? "";
  const [searchTerm, setSearchTerm] = useState(searchParam);

  const debounce = useDebounce(searchTerm).trim();

  useEffect(() => {
    if (!debounce) {
      setSearchParams({ page: "1" });
      return;
    }

    setSearchParams({ search: debounce, page: "1" });
  }, [debounce, setSearchParams]);

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
  } = useCrudUsuarios();

  if (isLoading) {
    return (
      <div className="alert alert-warning" role="alert">
        cargando usuarios!
      </div>
    );
  }

  if (isError) {
    return (
      <div className="alert alert-danger" role="alert">
        No se pudieron cargar los usuarios!
      </div>
    );
  }

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
                  <span className="badge bg-white text-dark border px-2 py-1.5 fw-normal">
                    {usuario.rol}
                  </span>
                </td>
                <td className="text-end pe-4">
                  <div className="d-flex justify-content-end gap-1">
                    <button
                      onClick={() => abrirModalEditar(usuario)}
                      className="btn btn-sm user-action user-action-edit"
                      title="Editar"
                      aria-label={`Editar usuario ${usuario.correo}`}
                    >
                      <i className="bi bi-pencil-square"></i>
                    </button>
                    <button
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
      <Modal
        isOpen={modalIsOpen}
        onClose={cerrarModal}
        title={userSeleccionado ? "Editar un cliente" : "Crear un cliente"}
      >
        <form>
          <div className="mb-3">
            <label className="form-label fw-semibold">Correo electrónico</label>
            <input
              type="text"
              className="form-control"
              placeholder="nombre@correo.com"
            />
          </div>
          <div className="mb-3">
            <label className="form-label fw-semibold">Contraseña</label>
            <input
              type="password"
              className="form-control"
              placeholder="0801XXXXXXXXXX"
            />
          </div>
          <div className="d-flex justify-content-end gap-2 mt-4">
            <button
              onClick={cerrarModal}
              type="button"
              className="btn btn-light"
            >
              Cancelar
            </button>
            <button type="submit" className="btn btn-success">
              {userSeleccionado ? "Actualizar cliente" : "Guardar cliente"}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
