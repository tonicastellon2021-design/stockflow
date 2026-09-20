import { useCallback, useState } from "react";
import { Outlet } from "react-router-dom";
import { Sidebar } from "../../../components/SidebarAdmin";

const AdminLayout = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = useCallback(() => {
    setIsCollapsed((prev) => !prev);
  }, []);

  return (
    <div className="admin-wrapper">
      <Sidebar isCollapsed={isCollapsed} toggleSidebar={toggleSidebar} />

      <div className="flex-grow-1 d-flex flex-column min-vh-100 overflow-auto">
        <main className="p-4 flex-grow-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
