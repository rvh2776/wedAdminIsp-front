import React from 'react'
import styles from './Documentation.module.css';
import Link from 'next/link';

const Documentation = () => {
    return (
        <div className="px-14 py-20">
          
          <h1 className='text-blue-900 font-semibold text-2xl '>¡Inicio de sesion!</h1>
          <br />
          <h6>
          En esta sección, puedes iniciar sesión con tu cuenta existente para acceder a todos los servicios y funcionalidades de nuestra plataforma.
           
          </h6>
          <br />
          <h6>
          Además, puedes verificar la cobertura de atención disponible en tu área, asegurándote de que nuestros servicios están accesibles para ti.
          </h6>
          <br />
          <h6>
          También, es posible consultar el estado de la solicitud que has realizado para una visita técnica, manteniéndote informado sobre el progreso y cualquier actualización relacionada con tu solicitud.
          </h6>
          <br />
          < h6>
            ¡Únete ahora y comienza a aprovechar al máximo nuestra plataforma!
          </h6>

          <div className='grid grid-cols-3 gap-4 mt-32'>
            <Link href="/login/1" className={`${styles.imageBackground} rounded-3xl w-auto h-40 text-gray-200 shadow-2xl opacity-90 p-2 text-center items-center justify-center flex `} type="button">INICIAR SESION</Link>
            <Link href="/login/2" className={`${styles.imageBackground} rounded-3xl w-auto h-40 text-gray-200 shadow-2xl opacity-90 p-2 text-center items-center justify-center flex`} type="button">VERIFICAR COBERTURA</Link>
            <Link href="/login/3" className={`${styles.imageBackground} rounded-3xl w-auto h-40 text-gray-200 shadow-2xl opacity-90 p-2 text-center items-center justify-center flex`} type="button">VER ESTADO DE SOLICITUD</Link>
          </div>
        </div>
      );
    };

export default Documentation