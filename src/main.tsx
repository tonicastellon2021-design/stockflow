import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./style/style.css";
import AppRouter from "./routes/router.tsx";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Suspense
        fallback={
          <div className="alert alert-info" role="status">
            Cargando vista...
          </div>
        }
      >
        <AppRouter />
      </Suspense>
    </QueryClientProvider>
  </StrictMode>,
);
