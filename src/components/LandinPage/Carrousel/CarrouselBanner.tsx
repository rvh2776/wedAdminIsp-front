import React from "react";
//import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";
import test1 from "../../../../pics/test1.svg";
import test2 from "../../../../pics/test2.svg";

import { url } from "inspector";
import { TituloPlanesInternet } from "../PlanesDeInternet/Titulo";
export const Carrousel: React.FC = () => {
  return (
    <>
      <div className="max-w-[1300px] max-h-[600px] w-full m-auto py-16 px-4 relative group  ">
        <div
          style={{ backgroundImage: `url(${test1.url})` }}
          className="w-full h-full rounded-2xl bg-center bg-cover duration-500 mb-10 shadow-lg "
        >
          <TituloPlanesInternet title="Paso 1" />
          <img className="mt-0" src={test1.src} />
        </div>
        <div
          style={{ backgroundImage: `url(${test2.url})` }}
          className="w-full h-full rounded-2xl bg-center bg-cover duration-500 shadow-lg "
        >
          <TituloPlanesInternet title="Paso 2" />
          <img className="mt-0" src={test2.src} />
        </div>
      </div>
    </>
  );
};
