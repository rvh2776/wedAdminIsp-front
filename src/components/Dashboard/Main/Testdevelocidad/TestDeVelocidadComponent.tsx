// "use client";
// import React, { useState, useEffect } from "react";

// // globals.d.ts
// declare global {
//   interface Window {
//     Speedtest: any;
//   }
// }

// const SpeedTest = () => {
//   const [speed, setSpeed] = useState<{
//     download: number;
//     upload: number;
//     ping: number;
//   }>({
//     download: 0,
//     upload: 0,
//     ping: 0,
//   });
//   const [isTesting, setIsTesting] = useState(false);
//   const [isClient, setIsClient] = useState(false);

//   useEffect(() => {
//     // Esto asegura que el componente sólo se renderice en el cliente
//     setIsClient(true);

//     if (isClient) {
//       const script = document.createElement("script");
//       script.src = "https://librespeed.org/librespeed.js";
//       script.async = true;
//       document.body.appendChild(script);

//       return () => {
//         document.body.removeChild(script);
//       };
//     }
//   }, [isClient]);

//   const startSpeedTest = () => {
//     setIsTesting(true);

//     if (isClient && window.Speedtest) {
//       const test = new window.Speedtest();

//       test.onupdate = (data: any) => {
//         setSpeed({
//           download: parseFloat(data.dlStatus),
//           upload: parseFloat(data.ulStatus),
//           ping: parseFloat(data.pingStatus),
//         });
//       };

//       test.onend = () => {
//         setIsTesting(false);
//       };

//       test.start();
//     } else {
//       console.error(
//         "Speedtest library is not loaded correctly or script is not running on the client."
//       );
//       setIsTesting(false);
//     }
//   };

//   if (!isClient) {
//     // No renderizar nada en el servidor
//     return null;
//   }

//   return (
//     <div>
//       <h2>Internet Speed Test</h2>
//       <button onClick={startSpeedTest} disabled={isTesting}>
//         {isTesting ? "Testing..." : "Start Test"}
//       </button>
//       <div>
//         <p>Download Speed: {speed.download} Mbps</p>
//         <p>Upload Speed: {speed.upload} Mbps</p>
//         <p>Ping: {speed.ping} ms</p>
//       </div>
//     </div>
//   );
// };

// export default SpeedTest;
