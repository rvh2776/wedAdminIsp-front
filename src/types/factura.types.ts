// types/factura.types.ts

import { IUserData } from "./login.types";


export default interface Factura {
  id: string;
  agente: string;
  fechaGen: string;
  concepto: string;
  observaciones: string;
  numFactura: number;
  tipoPago: string;
  fechaVencimiento: string;
  importe: number;
  user: IUserData; 
  nombre:string
  pagado:boolean;
}

export interface FacturasResponse {
  message?: string;
  id?: string;
  isAdmin?: boolean;
  createdAt?: string;
  agente?: string;
  imgUrl?: string;
  nombre?: string;
  telefono?: string;
  direccion?: string;
  latitud?: number;
  longitud?: number;
  documento?: number;
  email?: string;
  razonSocial?: string;
  codigoPostal?: string;
  domicilioInstal?: string;
  localidadInstal?: string;
  telefonoInstal?: string;
  emailInstal?: string;
  observaciones?: string;
  senalConexion?: string;
  facturas?: Factura[];
}