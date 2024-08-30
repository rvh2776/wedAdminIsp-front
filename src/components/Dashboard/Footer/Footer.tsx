'use client'
import React, { useState } from 'react'
import logo_01 from '../../../../public/images/Logo01.png'
import avatar1 from '../../../../public/images/avatar.jpg'
import avatar2 from '../../../../public/images/avatarProfile.jpg'
import Image from 'next/image';

const Footer = () => {
    const [isPopoverVisible, setIsPopoverVisible] = useState(false);

    const togglePopover = () => {
        setIsPopoverVisible(!isPopoverVisible);
      };


    return (
<>

    <button 
        onClick={togglePopover}
        type="button" 
        className="text-white bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-full px-5 py-2.5 text-center fixed bottom-4 right-4 w-12 h-12 flex items-center justify-center font-[500] text-2xl">
           ?
    </button>
    <div 
        id="popover-company-profile" 
        role="tooltip" 
        className={`fixed z-10 inline-block text-sm text-gray-500 transition-opacity duration-300 bg-white border border-gray-200 rounded-lg shadow-sm w-80 dark:text-gray-400 dark:bg-gray-800 dark:border-gray-600 ${isPopoverVisible ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
        style={{ bottom: '100px', right: '16px' }}
      >
        <div className="p-3">
          <div className="flex">
            <div className="me-3 shrink-0">
              <a href="#" className="block p-2 bg-gray-100 rounded-lg dark:bg-gray-700">
                <Image className="w-8 h-8 rounded-full rotate-[-1.5deg]" src={logo_01} alt="Flowbite logo" />
              </a>
            </div>
            <div>
              <p className="mb-1 text-base font-semibold leading-none text-gray-900 dark:text-white">
                <a href="#" className="hover:underline">UltraNet S.A.</a>
              </p>
              <p className=" text-sm font-normal">
                Proyecto Final
              </p>
              <p className="mb-3 text-sm font-normal">
                Henry Academy
              </p>
              <p className="text-sm font-semibold">Web Admin - UltraNet</p>
              <p className="mb-4 text-sm">Aplicativo de Gestión de Usuarios</p>
              <ul className="text-sm">
                <li className="flex items-center mb-2">
                  <span className="me-2 font-semibold text-gray-400">
                    <svg className="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 21 20">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6.487 1.746c0 4.192 3.592 1.66 4.592 5.754 0 .828 1 1.5 2 1.5s2-.672 2-1.5a1.5 1.5 0 0 1 1.5-1.5h1.5m-16.02.471c4.02 2.248 1.776 4.216 4.878 5.645C10.18 13.61 9 19 9 19m9.366-6h-2.287a3 3 0 0 0-3 3v2m6-8a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                    </svg>
                  </span>
                  <a href="#" className="text-blue-600 dark:text-blue-500 hover:underline">https://ultranet.com</a>
                </li>
                <li className="flex items-center mb-2">
                  <span className="me-2 font-semibold text-gray-400">
                    <svg className="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 21 20">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6.487 1.746c0 4.192 3.592 1.66 4.592 5.754 0 .828 1 1.5 2 1.5s2-.672 2-1.5a1.5 1.5 0 0 1 1.5-1.5h1.5m-16.02.471c4.02 2.248 1.776 4.216 4.878 5.645C10.18 13.61 9 19 9 19m9.366-6h-2.287a3 3 0 0 0-3 3v2m6-8a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                    </svg>
                  </span>
                  <a href="#" className="text-blue-600 dark:text-blue-500 hover:underline">admin@ultranet.com</a>
                </li>
                <li className="flex items-start mb-2">
                  <span className="me-2 font-semibold text-gray-400">
                    <svg className="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                      <path d="M17.947 2.053a5.209 5.209 0 0 0-3.793-1.53A6.414 6.414 0 0 0 10 2.311 6.482 6.482 0 0 0 5.824.5a5.2 5.2 0 0 0-3.8 1.521c-1.915 1.916-2.315 5.392.625 8.333l7 7a.5.5 0 0 0 .708 0l7-7a6.6 6.6 0 0 0 2.123-4.508 5.179 5.179 0 0 0-1.533-3.793Z"/>
                    </svg>
                  </span>
                  <span className="-mt-1">4,567,346 usuarios!</span>
                </li>
              </ul>
              <div className="flex mb-3 -space-x-3 rtl:space-x-reverse">
                <Image className="w-8 h-8 border-2 border-white rounded-full dark:border-gray-800" src={avatar2} alt="" />
                <Image className="w-8 h-8 border-2 border-white rounded-full dark:border-gray-800" src={avatar1} alt="" />
                <Image className="w-8 h-8 border-2 border-white rounded-full dark:border-gray-800" src={avatar2} alt="" />
                <a className="flex items-center justify-center w-8 h-8 text-xs font-medium text-white bg-gray-400 border-2 border-white rounded-full hover:bg-gray-500 dark:border-gray-800" href="#">+4k</a>
              </div>
              <div className="flex">
              <svg className="w-5 h-5 text-gray-400 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
  <path d="M7.978 4a2.553 2.553 0 0 0-1.926.877C4.233 6.7 3.699 8.751 4.153 10.814c.44 1.995 1.778 3.893 3.456 5.572 1.68 1.679 3.577 3.018 5.57 3.459 2.062.456 4.115-.073 5.94-1.885a2.556 2.556 0 0 0 .001-3.861l-1.21-1.21a2.689 2.689 0 0 0-3.802 0l-.617.618a.806.806 0 0 1-1.14 0l-1.854-1.855a.807.807 0 0 1 0-1.14l.618-.62a2.692 2.692 0 0 0 0-3.803l-1.21-1.211A2.555 2.555 0 0 0 7.978 4Z"/>
</svg>

                    <p>&nbsp; 01 701-5500 anexo 7118</p>
              </div>
              <p className='mt-8'>© 2024 Copyright | UltraNet </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Footer;