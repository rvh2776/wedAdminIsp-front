"use client";
import React, { useState } from "react";
import ChatBot from "react-simple-chatbot";
import { ThemeProvider } from "styled-components";
import { steps } from "../../../helpers/steps";

const DiseñoChat = {
  background: "#f5f8fb",
  fontFamily: "monospace",
  headerBgColor: "#2c94d1",
  headerFontColor: "#fff",
  headerFontSize: "15px",
  botBubbleColor: "#2c94d1",
  botFontColor: "#fff",
  userBubbleColor: "#fff",
  userFontColor: "#4a4a4a",
};

const ChatBotAssistant = () => {
  const [isPopoverVisible, setIsPopoverVisible] = useState(false);

  const togglePopover = () => {
    setIsPopoverVisible(!isPopoverVisible);
  };

  return (
    <>
      <button
        onClick={togglePopover}
        type="button"
        className="text-white bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-full p-3 text-center fixed bottom-4 right-4 w-16 h-16 flex items-center justify-center font-[500] text-[2xl]"
      >
        <svg
          className="bi bi-chat-dots"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 16 16"
        >
          <path d="M5 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0m4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0m3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2" />
          <path d="m2.165 15.803.02-.004c1.83-.363 2.948-.842 3.468-1.105A9 9 0 0 0 8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6a10.4 10.4 0 0 1-.524 2.318l-.003.011a11 11 0 0 1-.244.637c-.079.186.074.394.273.362a22 22 0 0 0 .693-.125m.8-3.108a1 1 0 0 0-.287-.801C1.618 10.83 1 9.468 1 8c0-3.192 3.004-6 7-6s7 2.808 7 6-3.004 6-7 6a8 8 0 0 1-2.088-.272 1 1 0 0 0-.711.074c-.387.196-1.24.57-2.634.893a11 11 0 0 0 .398-2" />
        </svg>
      </button>

      {isPopoverVisible && (
        <div
          id="popover-company-profile"
          role="tooltip"
          className="fixed z-10 inline-block"
          style={{ bottom: "90px", right: "20px" }}
        >
          <ThemeProvider theme={DiseñoChat}>
            <ChatBot
              headerTitle="Chat de asistencia"
              width="350px"
              height="400px"
              recognitionEnable={true}
              speechSynthesis={{ enable: true, lang: "es" }}
              steps={steps}
            />
          </ThemeProvider>
        </div>
      )}
    </>
  );
};

export default ChatBotAssistant;
