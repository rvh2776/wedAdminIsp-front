'use client'

import { useConnect } from '@/context/SocketContext';
import React, { useEffect, useState } from 'react';

const ButtonOnline: React.FC = () => {
    
    const { online, changeOnline } = useConnect();
  
    const handleToggle = () => {
        changeOnline();
    };
  

  return (
    <>
       <span className={`${online ? "text-green-500 parpadeo" : "text-red-500"}`}>{online ? "En línea" : "No Conectado"}</span>
      <ul>
        <li>
          <label className={`border-0 bg-gray-400/30 dark:bg-blue-500/80  p-4  relative block h-7.5 w-14 rounded-full`}>
            <input
              type="checkbox"
              checked={online}
              onChange={handleToggle}
              className="absolute top-0 z-50 h-full w-full cursor-pointer opacity-0"
              />
            <span className={`opacity-40 text-xl shadow-2xl p-0 absolute left-1 top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full bg-gray-400 shadow-switcher duration-75 ease-linear ${online && '!right-1 !translate-x-full'}`}>
              {online ? "🟢" : "🔴"}
            </span>
          </label>
        </li>
      </ul>
    </>
   
  );
};

export default ButtonOnline;