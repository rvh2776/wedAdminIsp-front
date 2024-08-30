"use client";
import { useAuth } from "@/context/AuthContext";
import { useSidebarContext } from "@/context/SidebarContext";
import React from "react";
import imagenInstall from "../../../../../../public/images/imageInstall.jpg";
import imagenFact from "../../../../../../public/images/imageFact.jpg";
import Image from "next/image";
import dynamic from "next/dynamic";
import Link from "next/link";

const GarphicBars = dynamic(() => import("./GarphicBars"), { ssr: false });

const Estadodecuenta = () => {
  const { userData } = useAuth();
  const facturas = userData?.userData.facturas;

  const firstLetterName = (name: string | undefined): string => {
    if (name && name.trim() !== "")
      return name
        .trim()
        .charAt(0)
        .toUpperCase();
    else return `<i className="lni lni-user"></i>`;
  };

  const letterColors: { [key: string]: string } = {
    A: "bg-red-500",
    B: "bg-blue-500",
    C: "bg-green-500",
    D: "bg-yellow-500",
    E: "bg-purple-500",
    F: "bg-pink-500",
    G: "bg-indigo-500",
    H: "bg-teal-500",
    I: "bg-orange-500",
    J: "bg-cyan-500",
    K: "bg-lime-500",
    L: "bg-amber-500",
    M: "bg-emerald-500",
    N: "bg-violet-500",
    O: "bg-fuchsia-500",
    P: "bg-rose-500",
    Q: "bg-sky-500",
    R: "bg-blue-600",
    S: "bg-red-600",
    T: "bg-green-600",
    U: "bg-yellow-600",
    V: "bg-purple-600",
    W: "bg-pink-600",
    X: "bg-indigo-600",
    Y: "bg-teal-600",
    Z: "bg-orange-600",
  };

  const getColorByFirstLetter = (name: string) => {
    const firstLetter = firstLetterName(name);
    return letterColors[firstLetter] || "bg-gray-500"; // color por defecto si no coincide
  };

  const ultimaFacturaNoPagada = userData?.userData.facturas
    .filter((factura) => !factura.pagado)
    .slice(-1)[0];

  return (
    <div>
      {/* Primer Bloque: Datos del Usuario y Foto de Perfil */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link href={"/dashboard/miperfil"}>
          <div className="mb-6 p-4 bg-gray-100 border rounded-lg dark:bg-gray-600 dark:opacity-60">
            <h2 className="text-lg font-bold mb-2">DATOS DE USUARIO:</h2>
            <div className="grid grid-cols-1 md:grid-cols-3">
              <div className="flex justify-center items-center rounded-lg p-4">
                {userData?.userData.imgUrl !== "https://exmple-image.webp" ? (
                  <img
                    src={userData?.userData.imgUrl}
                    alt="Foto de Perfil"
                    className="w-24 h-24 object-cover rounded-full"
                  />
                ) : (
                  <button
                    className={`rounded-full w-24 h-24 flex items-center justify-center text-center font-[530] ${getColorByFirstLetter(
                      userData?.userData.nombre
                    )} text-white`}
                  >
                    <p className="text-[50px] pr-[1px]">
                      {firstLetterName(userData?.userData.nombre)}
                    </p>
                  </button>
                )}
              </div>
              <div className="col-span-2 md:col-span-2 mt-4 md:mt-0">
                <p className="font-semibold">
                  <span className="text-blue-900 font-bold dark:text-orange-300">Nombre: </span>{" "}
                  &nbsp;
                  {userData?.userData.nombre}
                </p>
                <p className="font-semibold">
                  <span className="text-blue-900 font-bold dark:text-orange-300">Email: </span>{" "}
                  &nbsp;
                  {userData?.userData.email}
                </p>
                <p className="font-semibold">
                  <span className="text-blue-900 font-bold dark:text-orange-300">Teléfono: </span>{" "}
                  &nbsp;
                  {userData?.userData.telefono}
                </p>
                <p className="font-semibold">
                  <span className="text-blue-900 font-bold dark:text-orange-300">Dirección: </span>{" "}
                  &nbsp;
                  {userData?.userData.direccion}
                </p>
              </div>
            </div>
          </div>
        </Link>

        <Link href={"/dashboard/miplan"}>
          <div className="mb-6 p-4 bg-gray-100 border rounded-lg dark:bg-gray-600 dark:opacity-60">
            <h2 className="text-lg font-bold mb-2">DATOS DEL SERVICIO:</h2>
            <div className="grid grid-cols-1 md:grid-cols-3">
              <div className="flex justify-center items-center rounded-lg p-4">
                <Image
                  src={imagenInstall}
                  alt="Foto de Perfil"
                  className="w-24 h-24 object-cover rounded-full"
                />
              </div>
              <div className="col-span-2 md:col-span-2 mt-4 md:mt-0">
                <p className="font-semibold">
                  <span className="text-blue-900 font-bold dark:text-orange-300">Servicio: </span>{" "}
                  &nbsp;
                  {ultimaFacturaNoPagada?.concepto}
                </p>
                <p className="font-semibold">
                  <span className="text-blue-900 font-bold dark:text-orange-300">
                    Dirección de Instalación:{" "}
                  </span>{" "}
                  &nbsp;
                </p>
                <p className="font-semibold">
                  <span className="text-blue-900 font-bold dark:text-orange-300">
                    Email de Instalación:{" "}
                  </span>{" "}
                  &nbsp;
                </p>
                <p className="font-semibold">
                  <span className="text-blue-900 font-bold dark:text-orange-300">
                    Telefono de Instalación:{" "}
                  </span>{" "}
                  &nbsp;
                </p>
              </div>
            </div>
          </div>
        </Link>

        <Link href={"/dashboard/facturas"}>
          <div className="mb-6 p-4 bg-gray-100 border rounded-lg dark:bg-gray-600 dark:opacity-60">
            <h2 className="text-lg font-bold mb-2">PRÓXIMA FACTURA:</h2>
            <div className="grid grid-cols-3">
              <div className="flex justify-center items-center rounded-lg p-4">
                <Image
                  src={imagenFact}
                  alt="Foto de Perfil"
                  className="w-24 h-24 object-cover rounded-full"
                />
              </div>
              <div className="col-span-2">
                <p className=" font-semibold ">
                  <span className="text-blue-900 font-bold dark:text-orange-300">Mes: </span> &nbsp;{" "}
                  {ultimaFacturaNoPagada?.observaciones}
                </p>
                <p className="font-semibold ">
                  <span className="text-blue-900 font-bold dark:text-orange-300">
                    Fecha Emisión:{" "}
                  </span>{" "}
                  &nbsp;{" "}
                  {new Date(
                    ultimaFacturaNoPagada?.fechaGen ?? ""
                  ).toLocaleDateString("es-ES", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
                <p className="font-semibold ">
                  <span className="text-blue-900 font-bold dark:text-orange-300">
                    Fecha Vencimiento:{" "}
                  </span>{" "}
                  &nbsp;{" "}
                  {new Date(
                    ultimaFacturaNoPagada?.fechaVencimiento ?? ""
                  ).toLocaleDateString("es-ES", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
                <p className="font-semibold ">
                  <span className="text-blue-900 font-bold dark:text-orange-300">Importe: </span>{" "}
                  &nbsp; $ {ultimaFacturaNoPagada?.importe}
                </p>
              </div>
            </div>
          </div>
        </Link>
      </div>

      {/* Segundo Bloque: Gráfico y Total de Factura */}
      <div className="grid md:grid-cols-1 xl:grid-cols-2 gap-4 ">
        {/* Grid Izquierdo: Gráfico */}
        <div className="h-[420px]  bg-gray-100 border rounded-lg p-4 dark:bg-gray-600 dark:opacity-60">
          <h2 className="text-lg font-semibold mb-2">
            HISTORIAL DE FACTURACIÓN
          </h2>

          <GarphicBars />
        </div>
        {/* Grid Derecho: Total de Factura */}
        <Link href={"/dashboard/pagos"}>
          <div className="md:block h-[420px] mb-6 p-4 bg-gray-100 border rounded-lg dark:bg-gray-600 dark:opacity-60">
            <h2 className="text-lg font-bold mb-2">
              DETALLES DEL TOTAL A PAGAR:
            </h2>
            <br />
            <p className="font-semibold">
              <span className="text-blue-900 font-bold dark:text-orange-300">Servicio: </span> &nbsp;{" "}
              {ultimaFacturaNoPagada?.concepto}
            </p>
            <p className="font-semibold">
              <span className="text-blue-900 font-bold dark:text-orange-300">
                Cantidad de Equipos:{" "}
              </span>{" "}
              &nbsp;{" "}
            </p>
            <p className="font-semibold">
              <span className="text-blue-900 font-bold dark:text-orange-300">Mes: </span> &nbsp;{" "}
              {ultimaFacturaNoPagada?.observaciones}
            </p>
            <p className="font-semibold">
              <span className="text-blue-900 font-bold dark:text-orange-300">Fecha Emisión: </span>{" "}
              &nbsp;{" "}
              {new Date(
                ultimaFacturaNoPagada?.fechaGen ?? ""
              ).toLocaleDateString("es-ES", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>
            <br />
            <p className="font-semibold text-center text-[80px]">
              {" "}
              &nbsp; $ {ultimaFacturaNoPagada?.importe}
            </p>
            <br />
            <p className="font-semibold text-center">
              <span className="text-gray-600 font-bold border p-4 bg-[#37a0ab9d]">
                Vencimiento:{" "}
              </span>{" "}
              &nbsp;{" "}
              {new Date(
                ultimaFacturaNoPagada?.fechaVencimiento ?? ""
              ).toLocaleDateString("es-ES", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>
          </div>
        </Link>
      </div>

      {/* Tercer Bloque: HISTORIAL DE FACTURAS */}
      <div className="hidden lg:block mb-6 p-16 bg-gray-100 border rounded-lg dark:bg-gray-600 dark:opacity-60">
        <h2 className="text-lg font-bold mb-2">
          DETALLES DEL HISTORIAL DE FACTURACIÓN:
        </h2>
        <br />

        {/* Tabla de facturas */}
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-4 py-2 dark:text-orange-300 dark:bg-gray-800">N°</th>
              <th className="border px-4 py-2 dark:text-orange-300 dark:bg-gray-800">Fecha de Emisión</th>
              <th className="border px-4 py-2 dark:text-orange-300 dark:bg-gray-800">Mes Correspondiente</th>
              <th className="border px-4 py-2 dark:text-orange-300 dark:bg-gray-800">Vencimiento</th>
              <th className="border px-4 py-2 dark:text-orange-300 dark:bg-gray-800">Concepto</th>
              <th className="border px-4 py-2 dark:text-orange-300 dark:bg-gray-800">Importe</th>
              <th className="border px-4 py-2 dark:text-orange-300 dark:bg-gray-800">Estado</th>
            </tr>
          </thead>
          <tbody>
            {facturas?.map((factura) => (
              <tr key={factura.id}>
                <td className="border px-4 py-2">{factura.numFactura}</td>
                <td className="border px-4 py-2">
                  {new Date(factura.fechaGen).toLocaleDateString()}
                </td>
                <td className="border px-4 py-2">{factura.observaciones}</td>
                <td className="border px-4 py-2">
                  {new Date(factura.fechaVencimiento).toLocaleDateString()}
                </td>
                <td className="border px-4 py-2">{factura.concepto}</td>
                <td className="border px-4 py-2">
                  ${factura.importe.toFixed(2)}
                </td>
                <td
                  className={`border px-4 py-2 ${
                    factura.pagado ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {factura.pagado ? "Pagado" : "Pendiente"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Estadodecuenta;
