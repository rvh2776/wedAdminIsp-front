import Factura from "./factura.types";
import { RelevamientoData } from "./relevamiento.types";

interface IUserData {
  id: string;
  isAdmin: boolean;
  createdAt: string;
  agente: string;
  imgUrl: string;
  nombre: string;
  telefono: string;
  direccion: string;
  latitud: number;
  longitud: number;
  documento: number;
  email: string;
  password: string;
  razonSocial: string;
  impuesto: {
    id: string;
    nombre: string;
    users: string[];
  };
  provincia: {
    id: string;
    nombre: string;
    users: string[];
    localidades: {
      id: string;
      agente: string;
      nombre: string;
      users: string[];
      provincia: string;
      relevamiento: {
        id: string;
        fechaIngreso: string;
        agente: string;
        nombre: string;
        email: string;
        telefono: number;
        razon: string;
        direccion: string;
        latitud: number;
        longitud: number;
        provincia: string;
        localidad: string;
        diaCliente: string;
        horarios: string;
        domicilioInstal: string;
        localidadInstal: string;
        emailInstal: string;
        observaciones: string;
      }[];
    }[];
    relevamiento: {
      id: string;
      fechaIngreso: string;
      agente: string;
      nombre: string;
      email: string;
      telefono: number;
      razon: string;
      direccion: string;
      latitud: number;
      longitud: number;
      provincia: string;
      localidad: string;
      diaCliente: string;
      horarios: string;
      domicilioInstal: string;
      localidadInstal: string;
      emailInstal: string;
      observaciones: string;
    }[];
  };
  localidad: {
    id: string;
    agente: string;
    nombre: string;
    users: string[];
    provincia: string;
    relevamiento: RelevamientoData[];
  };
  codigoPostal: string;
  domicilioInstal: string;
  localidadInstal: string;
  telefonoInstal: string;
  emailInstal: string;
  observaciones: string;
  senalConexion: string;
  equipos: {
    id: string;
    nombre: string;
    agente: string;
    ipPc: string;
    ipAp: string;
    mascaraSubRed: string;
    puertaEnlace: string;
    dns1: string;
    dns2: string;
    nodo: string;
    equipo: string;
    cableMts: string;
    macEquipo: string;
    antena: string;
    user: string;
  }[];
  servicios: {
    id: string;
    agente: string;
    velocidadBajada: string;
    velocidadSubida: string;
    costoConexion: string;
    abono: string;
    nombre: string;
    user: string;
  }[];
  facturas: Factura[];
}


interface CrearUsuarioRequest {
  imgUrl: string;
  nombre: string;
  codArea: string;
  telefono: string;
  direccion: string;
  latitud: number;
  longitud: number;
  tipoDocum: string;
  documento: string;
  email: string;
  password: string;
  passwordconfirm:string
  provinciaId: string;
  localidadId: string;
  codigoPostal: string;
}

export default CrearUsuarioRequest