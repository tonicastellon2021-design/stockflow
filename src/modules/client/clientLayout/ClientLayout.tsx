import { Outlet } from "react-router-dom";
import { NavbarClien } from "../../../components/NavbarClien";
import { Footer } from "../../../components/Footer";

function ClientLayout() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <NavbarClien />
      <main className="container my-4">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default ClientLayout;
