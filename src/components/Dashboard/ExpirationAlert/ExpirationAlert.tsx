"use client";
import { useAuth } from "@/context/AuthContext";
import { apiURL, pathAuth0 } from "@/services/user.services";
import React, { useEffect, useState, MouseEvent } from "react";

const ExpirationAlert = () => {
  const [secondsLeft, setSecondsLeft] = useState<number>(9999);
  const { userData, renewToken, logout } = useAuth();

  //   const parseDate = (dateStr: string): Date => {
  //     let [datePart, timePart] = dateStr.split(', ');
  //     let [day, month, year] = datePart.split('/').map(Number);
  //     let [time, period] = timePart.split(' ');
  //     let [hours, minutes, seconds] = time.split(':').map(Number);
  //     if (period === 'PM' && hours < 12) hours += 12;
  //     if (period === 'AM' && hours === 12) hours = 0;
  //     const isoString = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}T${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  //     return new Date(isoString);
  // };

  useEffect(() => {
    if (userData && userData.tokenData?.expiresAt) {
      const expiration = Number(userData.tokenData.expiresAt);
      const expirationTime = new Date(expiration * 1000);

      // console.log("fecha directa Back: ", expirationTime);
      // console.log("fecha local: ", new Date().getTime());
      // console.log((expirationTime.getTime() - new Date().getTime()) /1000 );

      const intervalId = setInterval(() => {
        const newTimeLeft =
          (expirationTime.getTime() - new Date().getTime()) / 1000;
        //console.log("rango aceptado: ", newTimeLeft);
        if (newTimeLeft > 0) {
          //dentro del periodo valido
          setSecondsLeft(Math.floor(newTimeLeft));
        } else if (newTimeLeft <= 0) {
          // fuera del periodo de vencimiento
          console.log("LOGOUT, fecha de expiración de token vencida");
          clearInterval(intervalId);
          logout(null);
        }
      }, 1000);
      return () => clearInterval(intervalId);
    }
  }, [userData, logout]);

  const handleClickOutside = (event: MouseEvent<HTMLDivElement>) => {
    if (userData?.tokenData.keyProperty !== null){
      renewToken(null);
    } else {
      window.location.href = apiURL+pathAuth0;
    }
  };

  return (
    <>
      {secondsLeft <= 60 && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50"
          onClick={handleClickOutside}
        >
          <div className="bg-[#372854] text-white p-6 rounded-lg shadow-lg text-center">
            <div className="flex items-center justify-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="35"
                height="35"
                fill="currentColor"
                className="bi bi-exclamation-triangle-fill text-yellow-400"
                viewBox="0 0 16 16"
              >
                <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
              </svg>
              <h1 className="ml-3 text-lg font-semibold">¿SIGUE AHI?</h1>
            </div>
            <p className="italic mb-2">
              Haz clic en cualquier parte de la pantalla para continuar.
            </p>
            <p className="italic">
              La sesión expira en{" "}
              <span className="font-semibold text-xl">
                {secondsLeft >= 0 ? secondsLeft : "0"}
              </span>{" "}
              segundos.
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default ExpirationAlert;
