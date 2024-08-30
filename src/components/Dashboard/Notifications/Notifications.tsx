'use client'
import React from 'react';
import Sala from './Sala/Sala';

interface MainProps {
  rooms: string[];
}

const Notifications: React.FC<MainProps> = ({ rooms }) => {

  return (
    <div className="relative flex flex-col w-80 h-full bg-white dark:bg-gray-800 shadow-lg">
      <div className="p-4">
        <h5 className="text-lg font-medium text-gray-900 dark:text-white">Atender Chats:</h5>
      </div>
      <ul className="flex-grow overflow-y-auto">
      {rooms.length > 0 ? (
          rooms.map((room, index) => {
            let count = String(index + 1).padStart(2, '0'); // Formatea el número a dos cifras (01, 02, etc.)
            return (
              <Sala key={room} room={room} count={count} />
          )
      }) 
      )  : (
          <p className="text-sm text-gray-500 dark:text-gray-400 p-4">No hay salas pendientes.</p>
        )}
      </ul>
    </div>
  );
}

export default Notifications;
