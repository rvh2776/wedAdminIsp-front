export const steps = [
    // Step de bienvenida
    {
        id: '1',
        message: '¡Bienvenido al chat de asistencia de UltraNet! ¿Cuál es tu nombre?',
        trigger: '1.2',
    },
    {
        id: '1.2',
        user: true,
        trigger: '1.3',
    },
    {
        id: '1.3',
        message: 'Encantado de conocerte {previousValue}! ¿En qué podemos ayudarte hoy?',
        trigger: '2',
    },
    // Opciones principales
    {
        id: '2',
        options: [
            { value: 'servicios', label: 'Servicios', trigger: '3' },
            { value: 'planes', label: 'Planes', trigger: '10' },
            { value: 'facturacion', label: 'Facturación', trigger: '20' },
            { value: 'servicio_tecnico', label: 'Servicio Técnico', trigger: '30' },
            { value: 'dar_baja', label: 'Dar de Baja', trigger: '40' },
        ],
    },
    // Servicios
    {
        id: '3',
        message: 'Nuestros servicios incluyen: Internet de alta velocidad, TV por cable y telefonía fija. ¿Deseas saber más sobre alguno de estos servicios?',
        trigger: '4',
    },
    {
        id: '4',
        options: [
            { value: 'internet', label: 'Internet', trigger: '5' },
            { value: 'tv', label: 'TV por cable', trigger: '7' },
            { value: 'telefonia', label: 'Telefonía fija', trigger: '9' },
            { value: 'volver', label: 'Volver a las opciones principales', trigger: '2' },
        ],
    },
    {
        id: '5',
        message: 'Ofrecemos Internet de alta velocidad con diferentes planes adaptados a tus necesidades. ¿Quieres conocer nuestros planes de Internet?',
        trigger: '6',
    },
    {
        id: '6',
        options: [
            { value: 'si', label: 'Sí', trigger: '10' },
            { value: 'no', label: 'No', trigger: '2' },
        ],
    },
    {
        id: '7',
        message: 'Nuestra TV por cable incluye más de 200 canales de entretenimiento, deportes, noticias y más. ¿Deseas saber más detalles?',
        trigger: '8',
    },
    {
        id: '8',
        options: [
            { value: 'si', label: 'Sí', trigger: '11' },
            { value: 'no', label: 'No', trigger: '2' },
        ],
    },
    {
        id: '9',
        message: 'Ofrecemos telefonía fija con tarifas competitivas y excelente calidad de llamada. ¿Quieres saber más?',
        trigger: '6',
    },
    // Planes
    {
        id: '10',
        message: 'Nuestros planes de Internet son: Básico, Avanzado y Premium. ¿Cuál te interesa?',
        trigger: '11',
    },
    {
        id: '11',
        options: [
            { value: 'basico', label: 'Básico', trigger: '12' },
            { value: 'avanzado', label: 'Avanzado', trigger: '13' },
            { value: 'premium', label: 'Premium', trigger: '14' },
            { value: 'volver', label: 'Volver a las opciones principales', trigger: '2' },
        ],
    },
    {
        id: '12',
        message: 'El plan Básico incluye 20 Mbps de velocidad por $30 al mes. ¿Te gustaría contratarlo?',
        trigger: '15',
    },
    {
        id: '13',
        message: 'El plan Avanzado incluye 50 Mbps de velocidad por $50 al mes. ¿Te gustaría contratarlo?',
        trigger: '15',
    },
    {
        id: '14',
        message: 'El plan Premium incluye 100 Mbps de velocidad por $70 al mes. ¿Te gustaría contratarlo?',
        trigger: '15',
    },
    {
        id: '15',
        options: [
            { value: 'si', label: 'Sí', trigger: '16' },
            { value: 'no', label: 'No', trigger: '2' },
        ],
    },
    {
        id: '16',
        message: 'Gracias por elegir UltraNet. Un representante se pondrá en contacto contigo para completar la contratación.',
        end: true,
    },
    // Facturación
    {
        id: '20',
        message: 'En la sección de facturación puedes ver tus facturas, realizar pagos y más. ¿Qué deseas hacer?',
        trigger: '21',
    },
    {
        id: '21',
        options: [
            { value: 'ver_facturas', label: 'Ver facturas', trigger: '22' },
            { value: 'realizar_pago', label: 'Realizar pago', trigger: '23' },
            { value: 'volver', label: 'Volver a las opciones principales', trigger: '2' },
        ],
    },
    {
        id: '22',
        message: 'Para ver tus facturas, por favor accede a tu cuenta en nuestro sitio web.',
        trigger: '2',
    },
    {
        id: '23',
        message: 'Para realizar un pago, accede a la sección de pagos en nuestro sitio web.',
        trigger: '2',
    },
    // Servicio Técnico
    {
        id: '30',
        message: '¿Estás experimentando problemas técnicos? Podemos ayudarte con problemas de conexión, problemas con la TV o problemas con la telefonía fija. ¿Cuál es tu problema?',
        trigger: '31',
    },
    {
        id: '31',
        options: [
            { value: 'conexion', label: 'Problemas de conexión', trigger: '32' },
            { value: 'tv', label: 'Problemas con la TV', trigger: '33' },
            { value: 'telefonia', label: 'Problemas con la telefonía fija', trigger: '34' },
            { value: 'volver', label: 'Volver a las opciones principales', trigger: '2' },
        ],
    },
    {
        id: '32',
        message: 'Para problemas de conexión, por favor reinicia tu router. Si el problema persiste, contáctanos para más asistencia.',
        trigger: '2',
    },
    {
        id: '33',
        message: 'Para problemas con la TV, por favor reinicia tu decodificador. Si el problema persiste, contáctanos para más asistencia.',
        trigger: '2',
    },
    {
        id: '34',
        message: 'Para problemas con la telefonía fija, por favor revisa las conexiones de tu teléfono. Si el problema persiste, contáctanos para más asistencia.',
        trigger: '2',
    },
    // Dar de baja
    {
        id: '40',
        message: 'Lamentamos que quieras darte de baja. ¿Podrías decirnos el motivo?',
        trigger: '41',
    },
    {
        id: '41',
        options: [
            { value: 'precio', label: 'Precio', trigger: '42' },
            { value: 'calidad', label: 'Calidad del servicio', trigger: '42' },
            { value: 'otros', label: 'Otros', trigger: '42' },
        ],
    },
    {
        id: '42',
        message: 'Gracias por tu respuesta. Un representante se pondrá en contacto contigo para procesar tu solicitud.',
        end: true,
    },
];
