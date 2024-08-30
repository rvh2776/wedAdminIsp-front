import React from "react";
import { Navbar } from "./Navbar";
import { Promo1 } from "./Promo1/page";
import { PlanesInternet } from "./PlanesDeInternet/page";
import { Banner } from "./banner/Banner";
import { Seccion } from "./SolicitudServicio/Seccion";
import ChatBotAssistant from "./ChatBotAssistant/ChatBotAssistant";

const LandingPage = () => {
  return (
    <>
      <Navbar />
      <Promo1 />
      <PlanesInternet />
      <Banner />
      <Seccion />
      <ChatBotAssistant />

      {/* <script src="https://cdnjs.cloudflare.com/ajax/libs/flowbite/2.3.0/flowbite.min.js"></script> */}
      <link
        href="https://cdnjs.cloudflare.com/ajax/libs/flowbite/2.3.0/flowbite.min.css"
        rel="stylesheet"
      />
    </>
  );
};

export default LandingPage;
