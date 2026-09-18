import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import ClientLayout from "../modules/client/clientLayout/ClientLayout";
import AdminLayout from "../modules/admin/adminLayout/adminLayout";
import { CatalogPage } from "../modules/client/page/CatalogPage";
import LoginLayout from "../modules/login/layout/LoginLayout";
import { LoginPage } from "../modules/login/pages/LoginPage";
import { RegisterPage } from "../modules/login/pages/RegisterPage";
import { PedidosCrud } from "../modules/admin/pages/PedidosCrud";
import { UsuariosCruds } from "../modules/admin/pages/UsuariosCrud";
import { Reportes } from "../modules/admin/pages/Reportes";
import { ProductosCrud } from "../modules/admin/pages/ProductosCrud";
import { RouterAdmin, RouterClient, RouterLogin } from "./protectedRoute";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: (
        <RouterClient>
          <ClientLayout />
        </RouterClient>
      ),
      children: [
        {
          index: true,
          element: <CatalogPage />,
        },
      ],
    },
    {
      path: "/login",
      element: (
        <RouterLogin>
          <LoginLayout />
        </RouterLogin>
      ),
      children: [
        {
          index: true,
          element: <LoginPage />,
        },
        {
          path: "register",
          element: <RegisterPage />,
        },
      ],
    },
    {
      path: "/admin",
      element: (
        <RouterAdmin>
          <AdminLayout />
        </RouterAdmin>
      ),
      children: [
        { index: true, element: <Navigate replace to="/admin/reportes" /> },
        { path: "reportes", element: <Reportes /> },
        { path: "usuarios", element: <UsuariosCruds /> },
        { path: "pedidos", element: <PedidosCrud /> },
        { path: "productos", element: <ProductosCrud /> },
      ],
    },
    {
      path: "*",
      element: <Navigate replace to="/" />,
    },
  ],
  {
    basename: "/stockflow",
  },
);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}
