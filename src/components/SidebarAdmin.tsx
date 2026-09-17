import { NavLink } from "react-router-dom";

type SidebarProps = {
  isCollapsed: boolean;
  toggleSidebar: () => void;
};

export const Sidebar = ({ isCollapsed, toggleSidebar }: SidebarProps) => {
  const navItems = [
    { path: "/admin/reportes", label: "Reportes", icon: "bi bi-bar-chart" },
    { path: "/admin/pedidos", label: "Pedidos", icon: "bi bi-box-seam" },
    { path: "/admin/usuarios", label: "Usuarios", icon: "bi bi-people" },
    { path: "/admin/productos", label: "Productos", icon: "bi bi-tag" },
  ];

  const handleLogout = () => {
    console.log("Cerrando sesión...");
  };

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
      </div>

      <div className="pt-3 border-top border-secondary">
        <button
          onClick={handleLogout}
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
};
