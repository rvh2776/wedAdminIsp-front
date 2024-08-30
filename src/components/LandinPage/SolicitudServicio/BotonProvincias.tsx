// "use client";
// import { fetchProvincias } from "@/services/relevamientosServices";
// import React, { useEffect, useState } from "react";

// interface Provincia {
//   id: number;
//   name: string;
// }
// export const Provincias: React.FC = () => {
//   const [provincias, setProvincias] = useState<Provincia[]>([]);

//   useEffect(() => {
//     async function getProvincias() {
//       const data = await fetchProvincias();
//       setProvincias(data);
//     }

//     getProvincias();
//   }, []);

//   return (
//     <div>
//       <h1>Provincias</h1>
//       <ul>
//         {provincias.map((provincia) => (
//           <li key={provincia.id}>{provincia.name}</li>
//         ))}
//       </ul>
//     </div>
//   );
// };
