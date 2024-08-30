"use client";
import React, { useEffect, useState } from "react";

interface AnimatedNumberProps {
  endValue: number;
  name?: string;
  gradiente?: string;
  subida?: string;
  bajada?: string;
  costoConexion?: string;
  abono?: string;
  agente?: string;
  isUserLoggedIn?: boolean;
}

export const Contador: React.FC<AnimatedNumberProps> = ({
  endValue,
  name,
  gradiente,
  subida,
  bajada,
  costoConexion,
  abono,
  agente,
  isUserLoggedIn,
}) => {
  const [counter, setCounter] = useState<number>(0);

  useEffect(() => {
    let startValue = 0;
    const duration = 2000; // Duración de la animación en milisegundos
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / duration, 1);
      const newValue = Math.ceil(
        startValue + progress * (endValue - startValue)
      );
      setCounter(newValue);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [endValue]);

  return (
    <div
      className={`flex flex-col items-center justify-center p-4 rounded-xl shadow-md ${gradiente} min-w-[350px] max-w-[600px] `}
    >
      <div className="flex flex-col items-center justify-center w-full">
        <h1 className="text-4xl sm:text-6xl text-white mb-5 text-center">
          {name}
        </h1>
        <div className="border-t-2 border-white my-4 w-full"></div>
        <h1 className="text-6xl sm:text-8xl text-white mb-5 text-center">
          {counter}
        </h1>
        <p className="text-lg sm:text-xl text-white mb-5 text-center">
          Megabits por segundo
        </p>
        <div className="border-t-2 border-white my-4 w-full"></div>
        <p className="text-sm sm:text-md text-white mb-5 text-center">
          hasta {bajada} de bajada ↓
        </p>
        <p className="text-sm sm:text-md text-white text-center">
          hasta {subida} de Subida ↑
        </p>

        {isUserLoggedIn && (
          <>
            <div className="border-t-2 border-white my-4 w-full"></div>
            <p className="text-sm sm:text-md text-white mb-5 text-center">
              Costo de Conexión: {costoConexion}
            </p>
            <p className="text-sm sm:text-md text-white mb-5 text-center">
              Abono: {abono}
            </p>
          </>
        )}
      </div>
    </div>
  );
};
