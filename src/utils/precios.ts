export function formatPrecio(value: number): string {
  return new Intl.NumberFormat("es-ES", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

export const formatoLempiras = (monto: number) =>
  new Intl.NumberFormat("es-HN", { style: "currency", currency: "HNL" }).format(
    monto,
  );
