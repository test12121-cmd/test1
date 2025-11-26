import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, decimal, date, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const clientes = pgTable("clientes", {
  id: integer("id_cliente").primaryKey().generatedAlwaysAsIdentity(),
  nombre: varchar("nombre", { length: 100 }),
  apellido: varchar("apellido", { length: 100 }),
  dni: varchar("dni", { length: 20 }).unique(),
  telefono: varchar("telefono", { length: 20 }),
  email: varchar("email", { length: 100 }),
});

export type Cliente = typeof clientes.$inferSelect;
export type InsertCliente = Omit<Cliente, 'id'>;

export const empleados = pgTable("empleados", {
  id: integer("id_empleado").primaryKey().generatedAlwaysAsIdentity(),
  nombre: varchar("nombre", { length: 100 }).notNull(),
  apellido: varchar("apellido", { length: 100 }).notNull(),
  dni: varchar("dni", { length: 20 }).unique(),
  telefono: varchar("telefono", { length: 20 }),
  puesto: varchar("puesto", { length: 50 }),
  fechaContratacion: date("fecha_contratacion"),
});

export type Empleado = typeof empleados.$inferSelect;
export type InsertEmpleado = Omit<Empleado, 'id'>;

export const proveedores = pgTable("proveedores", {
  id: integer("id_proveedor").primaryKey().generatedAlwaysAsIdentity(),
  nombre: varchar("nombre", { length: 100 }).notNull(),
  telefono: varchar("telefono", { length: 20 }),
  email: varchar("email", { length: 100 }),
  direccion: varchar("direccion", { length: 255 }),
});

export type Proveedor = typeof proveedores.$inferSelect;
export type InsertProveedor = Omit<Proveedor, 'id'>;

export const medicamentos = pgTable("medicamentos", {
  id: integer("id_medicamento").primaryKey().generatedAlwaysAsIdentity(),
  nombre: varchar("nombre", { length: 150 }).notNull(),
  descripcion: text("descripcion"),
  precio: decimal("precio", { precision: 10, scale: 2 }).notNull(),
  stock: integer("stock").notNull().default(0),
  idProveedor: integer("id_proveedor"),
  fechaVencimiento: date("fecha_vencimiento"),
});

export type Medicamento = typeof medicamentos.$inferSelect;
export type InsertMedicamento = Omit<Medicamento, 'id'>;

export const ventas = pgTable("ventas", {
  id: integer("id_venta").primaryKey().generatedAlwaysAsIdentity(),
  idCliente: integer("id_cliente"),
  idEmpleado: integer("id_empleado").notNull(),
  fechaVenta: timestamp("fecha_venta").defaultNow(),
  total: decimal("total", { precision: 10, scale: 2 }).notNull(),
});

export type Venta = typeof ventas.$inferSelect;
export type InsertVenta = Omit<Venta, 'id' | 'fechaVenta'>;

export const detallesVenta = pgTable("detalles_venta", {
  id: integer("id_detalle").primaryKey().generatedAlwaysAsIdentity(),
  idVenta: integer("id_venta").notNull(),
  idMedicamento: integer("id_medicamento").notNull(),
  cantidad: integer("cantidad").notNull(),
  precioUnitario: decimal("precio_unitario", { precision: 10, scale: 2 }).notNull(),
});

export type DetalleVenta = typeof detallesVenta.$inferSelect;
export type InsertDetalleVenta = Omit<DetalleVenta, 'id'>;
