export function badgeEstado(estado: string) {
  const estilos: Record<string, string> = {
    Pendiente: "bg-warning-subtle text-warning border-warning-subtle",
    Completado: "bg-success-subtle text-success border-success-subtle",
    Enviado: "bg-primary-subtle text-primary border-primary-subtle",
    Cancelado: "bg-danger-subtle text-danger border-danger-subtle",
  };
  return (
    estilos[estado] ??
    "bg-secondary-subtle text-secondary border-secondary-subtle"
  );
}
