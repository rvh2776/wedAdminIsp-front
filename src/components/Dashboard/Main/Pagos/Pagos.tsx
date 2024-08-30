"use client";

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PaymentBrick from './PaymentBrick';
import { useSearchParams } from 'next/navigation';

export const apiURL = process.env.NEXT_PUBLIC_API_URL;

const Pagos = () => {
  const [preferenceId, setPreferenceId] = useState<string | null>(null);
  const [invoiceId, setInvoiceId] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [amount, setAmount] = useState<number | null>(null);
  const searchParams = useSearchParams();

  useEffect(() => {
    const id = searchParams.get('id');
    const userId = searchParams.get('userId');
    const amount = searchParams.get('amount');

    // console.log(amount)
    if (id) setInvoiceId(id);
    if (userId) setUserId(userId);
    if (amount) setAmount(parseInt(amount));

  }, [searchParams]);

  useEffect(() => {
    const fetchPreferenceId = async () => {
      if (invoiceId && userId && amount) {

        // console.log('Id de factura:', invoiceId, 'Id de usuario:', userId, 'Precio a pagar:', amount,);
        try {
          const response = await axios.post(`${apiURL}/mercado-pago/create-preference`, {
            invoiceId,
            userId,
            amount,
          });

          setPreferenceId(response.data.preference.id);
          // setAmount(response.data.amount)
        } catch (error) {
          console.error('Error fetching preference ID:', error);
        }
      }
    };

    fetchPreferenceId();
  }, [invoiceId, userId, amount]);

  if (!preferenceId) {
    return <div>Cargando...</div>;
  }

  return (
    <div className={`p-3 mt-20 transition-all duration-1000 ml-[270px]`}>
      <h1 className="text-2xl font-bold text-blue-900 mt-5 dark:text-blue-400/70 mb-5">
        Pasarela de Pagos!
      </h1>
      <PaymentBrick preferenceId={preferenceId} amount={amount} userId={userId} invoiceId={invoiceId}/>
    </div>
  );
};

export default Pagos;