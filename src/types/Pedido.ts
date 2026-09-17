export interface Pedido {
  id: string;
  fechaCreacion: string;
  mailCliente: string;
  montoTotal: number;
  estado: string;
  items: ItemPedido[];
  tipoPago: string;
}

export interface ItemPedido {
  productoId: string;
  nombre: string;
  cantidad: number;
  precioUnitario: number;
}
