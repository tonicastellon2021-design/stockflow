import { memo } from "react";
import type { User } from "../../types/User";
import { useAuthStore } from "../../store/authStore";

interface Props {
  usuario: User;
  onEditar: (usuario: User) => void;
  onEliminar: (usuario: User) => void;
}

const FilaUsuarios = memo(function ({ usuario, onEditar, onEliminar }: Props) {
  const user = useAuthStore((state) => state.user);
  return (
    <tr>
      <td className="ps-4 fw-semibold text-muted">#{usuario.id}</td>
      <td>
        <div className="d-flex align-items-center gap-2">
          <div
            className="bg-light rounded-circle d-flex align-items-center justify-content-center text-muted"
            style={{ width: "32px", height: "32px" }}
          >
            <i className="bi bi-person"></i>
          </div>
          <span className="fw-medium text-dark">{usuario.correo}</span>
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
            disabled={usuario.id === user?.id}
            onClick={() => onEditar(usuario)}
            className="btn btn-sm user-action user-action-edit"
            title="Editar"
            aria-label={`Editar usuario ${usuario.correo}`}
          >
            <i className="bi bi-pencil-square"></i>
          </button>
          <button
            disabled={usuario.id === user?.id}
            onClick={() => onEliminar(usuario)}
            className="btn btn-sm user-action user-action-delete"
            title="Eliminar"
            aria-label={`Eliminar usuario ${usuario.correo}`}
          >
            <i className="bi bi-trash3"></i>
          </button>
        </div>
      </td>
    </tr>
  );
});

export default FilaUsuarios;
