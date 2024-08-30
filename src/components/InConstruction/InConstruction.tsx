"use client"
import { useRouter } from "next/navigation";
import React from "react";

const InConstruction: React.FC = () => {

  const router = useRouter();

  const goBack = () => {
    router.back(); 
  };
  return (
    <div className="flex flex-col mt-[10%]">
      <main className="container mx-auto px-4 py-8 flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold mb-4">
          ¡Estamos trabajando en algo increíble para ti!
        </h1>
        <p className="text-gray-700 mb-4">
          Pronto te sorprenderemos con nuestro nuevo módulo.
        </p>
        <button
          onClick={goBack}
          className="text-blue-500 hover:underline"
        >
          Regresar 
        </button>
      </main>
    </div>
  );
};

export default InConstruction;
