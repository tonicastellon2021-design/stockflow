import { Outlet } from "react-router-dom";
import { Footer } from "../../../components/Footer";
import { NavbarLogin } from "../../../components/NavbarLogin";

function LoginLayout() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <NavbarLogin />
      <main className="container my-4">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default LoginLayout;
