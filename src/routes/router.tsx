import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import ClientLayout from "../modules/client/clientLayout/ClientLayout";
import { CatalogPage } from "../modules/client/page/CatalogPage";
import { LoginPage } from "../modules/login/pages/LoginPage";
import { RegisterPage } from "../modules/login/pages/RegisterPage";
import { RouterAdmin, RouterClient, RouterLogin } from "./protectedRoute";
import { lazy } from "react";
import LoginLayout from "../modules/login/layout/LoginLayout";

const AdminLayout = lazy(
  () => import("../modules/admin/adminLayout/adminLayout"),
);
const PedidosCrud = lazy(() => import("../modules/admin/pages/PedidosCrud"));
const UsuariosCruds = lazy(() => import("../modules/admin/pages/UsuariosCrud"));
const Reportes = lazy(() => import("../modules/admin/pages/Reportes"));
const ProductosCrud = lazy(
  () => import("../modules/admin/pages/ProductosCrud"),
);

const ListaProductos = lazy(
  () => import("../modules/admin/pagesEjercicios/Eje1"),
);

const InventarioBodegas = lazy(
  () => import("../modules/admin/pagesEjercicios/Eje2"),
);

const InventarioEmpresa = lazy(
  () => import("../modules/admin/pagesEjercicios/Eje3"),
);

const DashboardCorporativo = lazy(
  () => import("../modules/admin/pagesEjercicios/Eje4"),
);

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
        { path: "ejercicio-1", element: <ListaProductos /> },
        { path: "ejercicio-2", element: <InventarioBodegas /> },
        { path: "ejercicio-3", element: <InventarioEmpresa /> },
        { path: "ejercicio-4", element: <DashboardCorporativo /> },
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
