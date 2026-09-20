import Swal from "sweetalert2";

const APP_COLORS = {
  success: "#198754",
  danger: "#dc3545",
  muted: "#6c757d",
  white: "#ffffff",
};

const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 1500,
  timerProgressBar: true,
  background: APP_COLORS.success,
  color: APP_COLORS.white,
});

export function showProductAdded(productName: string) {
  Toast.fire({ icon: "success", title: `${productName} agregado` });
}

export function showStockLimitReached() {
  Toast.fire({ icon: "warning", title: "Límite de stock alcanzado" });
}

export function showProductDecreased(productName: string) {
  Toast.fire({ icon: "info", title: `Cantidad de ${productName} disminuida` });
}

export function showProductRemoved(productName: string) {
  Toast.fire({
    icon: "success",
    title: `${productName} eliminado del carrito`,
  });
}

export async function confirmClearCart() {
  const result = await Swal.fire({
    icon: "warning",
    title: "¿Vaciar el carrito?",
    text: "Se eliminarán todos los productos del carrito.",
    showCancelButton: true,
    confirmButtonText: "Sí, vaciar carrito",
    cancelButtonText: "Cancelar",
    confirmButtonColor: APP_COLORS.danger,
    cancelButtonColor: APP_COLORS.muted,
    reverseButtons: true,
  });

  return result.isConfirmed;
}

export async function confirmDelete(title: string, text: string) {
  const result = await Swal.fire({
    icon: "warning",
    title: title,
    text: text,
    showCancelButton: true,
    confirmButtonText: "Sí, eliminar",
    cancelButtonText: "Cancelar",
    confirmButtonColor: APP_COLORS.danger,
    cancelButtonColor: APP_COLORS.muted,
    reverseButtons: true,
  });

  return result.isConfirmed;
}

export function showCartCleared() {
  Toast.fire({
    icon: "success",
    title: "Se vació el carrito por completo",
  });
}

export function errorValid(
  title = "Campos incompletos",
  text = "!Todos los campos son obligatorios y no pueden estar vacíos!",
) {
  Swal.fire({
    icon: "error",
    title,
    text,
  });
}

export function successF(title: string, text: string) {
  Swal.fire({
    title: title,
    text: text,
    icon: "success",
    confirmButtonText: "Genial",
    confirmButtonColor: APP_COLORS.success,
    timer: 3000,
    timerProgressBar: true,
  });
}
export function logoutSwal() {
  return Swal.fire({
    title: "Cerrando sesión",
    text: "Por favor, espera un momento...",
    icon: "info",
    timer: 1500,
    timerProgressBar: true,
    showConfirmButton: false,
    allowOutsideClick: false,
    allowEscapeKey: false,
    didOpen: () => {
      Swal.showLoading();
    },
  });
}
