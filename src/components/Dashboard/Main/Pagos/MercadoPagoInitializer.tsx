"use client";

import { useEffect } from 'react';
import { initMercadoPago } from '@mercadopago/sdk-react';

export const MP_KEY = process.env.NEXT_PUBLIC_MP_API_KEY

const MercadoPagoInitializer: React.FC = () => {
  useEffect(() => {
    initMercadoPago(`${MP_KEY}`);
    console.log('initMercadoPago en component')
  }, []);

  return null;
};

export default MercadoPagoInitializer;