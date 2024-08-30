import React from "react";

export const TextoPromo1: React.FC = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center p-4 min-h-screen w-2/3">
        <h1 className="text-2xl md:text-5xl sm:text-3xl text-textBlue text-center font-bold mb-2 ">
          ¿Qué plan se ajusta a ti?
        </h1>
        <p className="text-m md:text-xl ml-4 sm:text-base text-textBlue text-center max-w-lg mt-10">
          Con los planes de internet de fibra óptica de UltraNet, puedes elegir
          la velocidad de conexión que mejor se adapte a tus necesidades y
          estilo de vida, sin cargos adicionales inesperados por uso excesivo.
        </p>
      </div>
    </>
  );
};
