import { NavLink, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { memo } from "react";
import Select from "react-select";

type SidebarProps = {
  isCollapsed: boolean;
  toggleSidebar: () => void;
};

export const Sidebar = memo(({ isCollapsed, toggleSidebar }: SidebarProps) => {
  const navItems = [
    { path: "/admin/reportes", label: "Reportes", icon: "bi bi-bar-chart" },
    { path: "/admin/pedidos", label: "Pedidos", icon: "bi bi-box-seam" },
    { path: "/admin/usuarios", label: "Usuarios", icon: "bi bi-people" },
    { path: "/admin/productos", label: "Productos", icon: "bi bi-tag" },
  ];

  const navigate = useNavigate();

  const otrasRutas = [
    { value: "/admin/ejercicio-1", label: "Ejercicio 1" },
    { value: "/admin/ejercicio-2", label: "Ejercicio 2" },
    { value: "/admin/ejercicio-3", label: "Ejercicio 3" },
    { value: "/admin/ejercicio-4", label: "Ejercicio 4" },
  ];

  const { logout } = useAuthStore();

  return (
    <aside
      className={`sidebar-container d-flex flex-column justify-content-between p-3 text-white ${isCollapsed ? "collapsed" : ""}`}
    >
      <div>
        <div className="d-flex align-items-center justify-content-between mb-4 pb-2 border-bottom border-secondary">
          <div className="d-flex align-items-center gap-2 overflow-hidden">
            <i className="bi bi-box-seam-fill fs-3 brand-green"></i>
            <span className="fw-bold fs-4 brand-green hide-on-collapse">
              StockFlow
            </span>
          </div>
          <button
            className="btn btn-sm text-secondary p-0 border-0"
            onClick={toggleSidebar}
            title={isCollapsed ? "Expandir" : "Colapsar"}
          >
            <i
              className={`bi ${isCollapsed ? "bi-chevron-right" : "bi-chevron-left"} fs-5`}
            ></i>
          </button>
        </div>

        <nav className="d-flex flex-column gap-1">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `sidebar-nav-link ${isActive ? "active" : ""}`
              }
              title={isCollapsed ? item.label : ""}
            >
              <i className={`bi ${item.icon} fs-5`}></i>
              <span className="hide-on-collapse">{item.label}</span>
            </NavLink>
          ))}
        </nav>
        {!isCollapsed && (
          <Select
            className="mt-3"
            classNamePrefix="sidebar-route"
            options={otrasRutas}
            placeholder="Otras secciones..."
            isClearable={false}
            isSearchable={false}
            menuPortalTarget={document.body}
            onChange={(opcion) => {
              if (opcion) navigate(opcion.value);
            }}
            styles={{
              control: (base, state) => ({
                ...base,
                minWidth: 0,
                backgroundColor: "var(--sf-dark-hover)",
                borderColor: state.isFocused ? "var(--sf-green)" : "#495057",
                boxShadow: state.isFocused
                  ? "0 0 0 1px var(--sf-green)"
                  : "none",
                color: "#f8f9fa",
                cursor: "pointer",
                ":hover": { borderColor: "var(--sf-green)" },
              }),
              singleValue: (base) => ({ ...base, color: "#f8f9fa" }),
              placeholder: (base) => ({ ...base, color: "#adb5bd" }),
              dropdownIndicator: (base, state) => ({
                ...base,
                color: state.isFocused ? "#ffffff" : "#adb5bd",
                ":hover": { color: "#ffffff" },
              }),
              indicatorSeparator: (base) => ({
                ...base,
                backgroundColor: "#495057",
              }),
              menu: (base) => ({
                ...base,
                backgroundColor: "var(--sf-dark)",
                border: "1px solid #495057",
                zIndex: 2000,
              }),
              menuPortal: (base) => ({ ...base, zIndex: 2000 }),
              option: (base, state) => ({
                ...base,
                backgroundColor: state.isSelected
                  ? "var(--sf-green)"
                  : state.isFocused
                    ? "var(--sf-dark-hover)"
                    : "var(--sf-dark)",
                color: "#f8f9fa",
                cursor: "pointer",
                ":active": { backgroundColor: "var(--sf-green-hover)" },
              }),
            }}
          />
        )}
      </div>

      <div className="pt-3 border-top border-secondary">
        <button
          onClick={logout}
          className="sidebar-nav-link btn w-100 text-start text-danger border-0 bg-transparent p-2"
          title={isCollapsed ? "Cerrar sesión" : ""}
        >
          <i className="bi bi-box-arrow-right fs-5 text-danger"></i>
          <span className="hide-on-collapse text-danger fw-semibold">
            Cerrar sesión
          </span>
        </button>
      </div>
    </aside>
  );
});
