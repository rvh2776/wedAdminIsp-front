export interface ILoginProps {
      email: string;    
      password: string | null; 
}

export interface ILoginPropsError {
      email?: string;    
      password?: string; 
      [key: string]: string | undefined;
}

export interface ITokenSession {
      succes: string;
      token: string;
      issuedAt: string;
      expiresAt: string;
      agente: string;
      user: {
            id: string;
            email: string;
            nombre: string;
            roles: string[];
          };
      keyProperty: string | null;    
      }

      export interface IUserSession {
            message: string;
            id: string;
            isAdmin: boolean;
            createdAt: string;  
            agente: string;
            nombre: string;
            telefono: string;
            direccion: string;
            latitud: number;
            longitud: number;
            documento: number;
            email: string;
            razonSocial: string;
            codigoPostal: string;
            domicilioInstal: string;
            localidadInstal: string;
            telefonoInstal: number;
            emailInstal: string;
            observaciones: string;
            senalConexion: string;
            facturas: IFactura[];
            equipos: string[];
            servicios: IService[];
            asistencias: string[];
            imgUrl: string;
        }

export interface IUserData {
      tokenData: ITokenSession;    
      userData: IUserSession; 
  }  

  export default interface IFactura {
      id: string;
      agente: string;
      fechaGen: string;
      concepto: string;
      observaciones: string;
      numFactura: number;
      tipoPago: string;
      pagado: boolean;
      fechaVencimiento: string;
      importe: number;
    }

    export interface IService {
      id: string;
      agente: string;
      velocidadBajada: string;
      velocidadSubida: string;
      costoConexion: string;
      abono: string;
      nombre: string;
    }

         




