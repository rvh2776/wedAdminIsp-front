'use client'
import React, { createContext, useContext, useEffect, ReactNode } from 'react';
import { initMercadoPago } from '@mercadopago/sdk-react';
import { IProviderProps } from '@/types/context.types';

export const MP_KEY = process.env.NEXT_PUBLIC_MP_API_KEY

export interface IinitMercadoPagos {}
const MercadoPagoContext = createContext<IinitMercadoPagos | undefined>(undefined);

export const MercadoPagoProvider: React.FC<IProviderProps> = ({ children }) => {
    useEffect(() => {
        initMercadoPago(`${MP_KEY}`);
        console.log('Mercado Pago initialized en context');
    }, []);

    return (
        <MercadoPagoContext.Provider value={{}}>
            {children}
        </MercadoPagoContext.Provider>
    );
};

export const useMercadoPago = () => {
    const context = useContext(MercadoPagoContext);
    if (context === undefined) {
        throw new Error('useMercadoPago must be used within a MercadoPagoProvider');
    }
    return context;
};
