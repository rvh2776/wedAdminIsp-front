"use client";
import React from 'react';
import ChatBot from 'react-simple-chatbot';
import { ThemeProvider } from 'styled-components';
import { useSidebarContext } from '@/context/SidebarContext';
import { steps } from '@/helpers/steps';

const DiseñoChat = {
  background: '#f5f8fb',
  fontFamily: 'monospace',
  headerBgColor: '#1d4160',
  headerFontColor: '#fff',
  headerFontSize: '15px',
  botBubbleColor: '#1d4199',
  botFontColor: '#fff',
  userBubbleColor: '#fff',
  userFontColor: '#4a4a4a',
};

const Asistentevirtual = () => {
  const { btnFixed } = useSidebarContext();

  return (
    <div
      className={`p-3 mt-20 transition-all duration-1000 ${
        btnFixed ? "ml-[400px]" : "ml-[300px]"
      }`}
    >
      <h1 className="text-2xl font-bold text-blue-900 mt-10 dark:text-blue-400/70">
        Chatbot!!
      </h1>
      <ThemeProvider theme={DiseñoChat}>
                      <ChatBot
                        headerTitle="Chat de asistencia"
                        width="1100px"
                        height="600px"
                        recognitionEnable={true}
                        speechSynthesis={{ enable: true, lang: 'es' }}
                        steps={steps}
                    />
               </ThemeProvider> 
    </div>
  );
};

export default Asistentevirtual;


