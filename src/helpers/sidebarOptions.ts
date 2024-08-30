export const sidebarOptionsAdmin = [
    {
        rolName: "Consulta",
        icon: "m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z",
        router: false,
        options:[
                {optionName: "Usuarios",
                 router: false,   
                 subOptions: [{subOptionsName: "Ver todos los usuarios", router: true},// OK
                            //   {subOptionsName: "Usuarios atendidos", router: true}, 
                            //   {subOptionsName: "Usuarios no atendidos", router: true} 
                 ]
                },    
                {optionName: "Solicitudes",
                 router: false,   
                 subOptions: [{subOptionsName: "Relevamientos", router: true}, // ok
                            //  {subOptionsName: "Solicitudes rechazadas", router: true}
                            ]   // NO
                }, 
                {optionName: "Solicitudes de Servicio Tecnico",
                 router: true, 
                 subOptions: []},  
                ]
    },
    {
        rolName: "Equipos",
        icon: "m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z",
        router: false,
        options:[
               
                 {optionName: "Equipos",// OK
                    router: true,   
                    subOptions: []
                   }, 
                   { optionName: "Agregar Equipo",// OK
                    router: true,   
                    subOptions:[]}
                 
                ]
    },
    {
        rolName: "Asistente Virtual",// OK
        icon: "M8 7V6a1 1 0 0 1 1-1h11a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1h-1M3 18v-7a1 1 0 0 1 1-1h11a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1Zm8-3.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z",
        router: true,
        options:[],
    },
    {
        rolName: "Mi Perfil",// OK
        icon: "M7 17v1a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1a3 3 0 0 0-3-3h-4a3 3 0 0 0-3 3Zm8-9a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z",
        router: true,
        options:[]
    },

]




export const sidebarOptionsUser = [
{
    rolName: "Consulta",
    icon: "m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z",
    router: false,
    options:[
            {optionName: "Mi Cuenta",
             router: false,   
             subOptions: [ // PENDIENTE
                          {subOptionsName: "Mi Plan", router: true}] // OK
            },    

            {optionName: "Actualizacion de Datos", // PENDIENTE //solicitud actualizacion de Datos
             router: true, 
             subOptions: []},   

            ]
},
{
    rolName: "Servicios",
    icon: "m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z",
    router: false,
    options:[{optionName: "Servicio Técnico", // OK
        router: true,   
        subOptions: [] 
       }, 
       {optionName: "Test de Velocidad", // PENDIENTE
        router: true,   
        subOptions: [] 
       },
       {optionName: "Dar de Baja", // PENDIENTE //solicitud de baja
        router: true, 
        subOptions: []}, 
    ]
},
{
    rolName: "Facturacion",
    icon: "m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z",
    router: false,
    options:[{optionName: "Facturas", // OK
        router: true,   
        subOptions: [] 
       }, 
       ]
},
{
    rolName: "Asistente Virtual",// OK
    icon: "M8 7V6a1 1 0 0 1 1-1h11a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1h-1M3 18v-7a1 1 0 0 1 1-1h11a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1Zm8-3.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z",
    router: true,
    options:[],
},
{
    rolName: "Atención en Línea",// OK
    icon: "M7 17v1a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1a3 3 0 0 0-3-3h-4a3 3 0 0 0-3 3Zm8-9a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z",
    router: true,
    options:[]
},
{
    rolName: "Mi Perfil", // OK
    icon: "M7 17v1a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1a3 3 0 0 0-3-3h-4a3 3 0 0 0-3 3Zm8-9a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z",
    router: true,
    options:[]
},

]




