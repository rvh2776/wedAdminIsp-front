'use client'
import React from 'react';
import { usePathname, useRouter, redirect } from 'next/navigation';

interface SalaProps {
  room: string;
  count: string;
}

const Sala: React.FC<SalaProps> = ({ room, count }) => {
const router = useRouter();
const pathname = usePathname()

  const handleJoinRoom = () => {
     router.push(`/dashboard/atencionenlinea?room=${room}&hall=${count}`);
    // if (pathname == "/dashboard/atencionenlinea"){window.location.reload();}
    //redirect(`/dashboard/atencionenlinea?room=${room}`);
  };

  return (
    <li
      className="border-t border-gray-200 dark:border-gray-700"
      onClick={handleJoinRoom}  // Pasa la función como referencia, sin ejecutarla
    >
      <a className="block px-4 py-3 hover:bg-gray-200 dark:hover:bg-gray-700" href="#">
        <p className="text-lg  text-gray-500 dark:text-gray-300">Sala N°{count}</p>
      </a>
    </li>
  );
};

export default Sala;

