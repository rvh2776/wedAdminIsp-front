import { IUserData } from "./login.types";

interface Equipos {
    id?: string;
    nombre?: string;
    agente?: string;
    ipPc?: string;
    ipAp?: string;
    mascaraSubRed?: string;
    puertaEnlace?: string;
    dns1?: string;
    dns2?: string;
    nodo?: string;
    equipo?: string;
    cableMts?: string;
    macEquipo?: string;
    antena?: string;
    isInstalled: boolean;
  isAvailable: boolean;
  user?: { id?: string }; // Cambia esta línea
 
  
  }
  export default Equipos