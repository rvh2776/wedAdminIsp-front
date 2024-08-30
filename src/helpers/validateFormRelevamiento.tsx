import { ILoginProps, ILoginPropsError } from "@/types/login.types";

interface RelevamientoFormData {
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
    provinciaId: string; 
    localidadId: string; 
    codigoPostal: string;
  }

  interface RelevamientoFormDataError {
    nombre?: string;
    codArea?: string; 
    telefono?: string;
    direccion?: string;
    latitud?: string;
    longitud?: string;
    tipoDocum?: string; 
    documento?: string;
    email?: string;
    password?: string;
    provinciaId?: string;
    localidadId?: string; 
    codigoPostal?: string;
    [key: string]: string | undefined;
  }

export const validateFormRelevamiento = (input: RelevamientoFormData): RelevamientoFormDataError => {
    const errors: RelevamientoFormDataError = {};
    const regexLettersOnly = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const regexStrongPassword = /^[A-Za-z0-9@$!%*?&]+$/;

      if (input.nombre.trim().length < 1) {
        errors.nombre = `El campo nombre es obligatorio`;
      } 
      if (input.codArea.trim().length < 1) {
        errors.codArea = `El campo codArea es obligatorio`;
      } 
      if (input.telefono.trim().length < 1) {
        errors.telefono = `El campo telefono es obligatorio`;
      } 
      if (input.direccion.trim().length < 1) {
        errors.direccion = `El campo direccion es obligatorio`;
      } 
      if (input.latitud.toString().length < 1) {
        errors.latitud = `El campo latitud es obligatorio`;
      } 
      if (input.longitud.toString().length < 1) {
        errors.longitud = `El campo longitud es obligatorio`;
      } 
      if (input.tipoDocum.trim().length < 1) {
        errors.tipoDocum = `El campo tipoDocum es obligatorio`;
      } 
      if (input.documento.trim().length < 1) {
        errors.documento = `El campo documento es obligatorio`;
      } 
      if (input.email.trim().length < 1) {
        errors.email = `El campo email es obligatorio`;
      } 
      if (input.password.trim().length < 1) {
        errors.password = `El campo password es obligatorio`;
      } 
      if (input.provinciaId.trim().length < 1) {
        errors.provinciaId = `El campo provinciaId es obligatorio`;
      } 
      if (input.localidadId.trim().length < 1) {
        errors.localidadId = `El campo localidadId es obligatorio`;
      } 
      if (input.codigoPostal.trim().length < 1) {
        errors.codigoPostal = `El campo codigoPostal es obligatorio`;
      } 

    return errors;
}

