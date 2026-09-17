import { Navigate } from "react-router-dom";
import type { PropsWithChildren } from "react";
import { useAuthStore } from "../store/authStore";

export function RouterLogin({ children }: PropsWithChildren) {
  const user = useAuthStore((s) => s.user);

  if (user) {
    return <Navigate to={user.rol === "admin" ? "/admin" : "/"} replace />;
  }

  return children;
}

export function RouterAdmin({ children }: PropsWithChildren) {
  const user = useAuthStore((s) => s.user);

  if (user?.rol !== "admin") {
    return <Navigate to="/" replace />;
  }
  return children;
}

export function RouterClient({ children }: PropsWithChildren) {
  const user = useAuthStore((s) => s.user);

  if (user?.rol === "admin") {
    return <Navigate to="/admin" replace />;
  }

  return children;
}
