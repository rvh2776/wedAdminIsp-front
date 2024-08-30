"use client";

import React, { useEffect, useState } from 'react';
import StatusScreenBrick from './StatusScreenBrick';
import { useSearchParams } from 'next/navigation';

export const apiURL = process.env.NEXT_PUBLIC_API_URL;

const PagosStatus = () => {
  const [paymentId, setPaymentId] = useState<string | null>(null);
  const [invoiceId, setInvoiceId] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const searchParams = useSearchParams();

  useEffect(() => {
    const id = searchParams.get('paymentId');
    const invoiceId = searchParams.get('invoiceId');
    const userId = searchParams.get('userId');

    if (id) setPaymentId(id);
    if (invoiceId) setInvoiceId(invoiceId);
    if (userId) setUserId(userId);
  }, [searchParams]);

  if (!paymentId) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="p-3 mt-20 transition-all duration-1000 ml-[270px]">
      <h1 className="text-2xl font-bold text-blue-900 mt-10 dark:text-blue-400/70 mb-2">
        Estado del Pago
      </h1>
      <StatusScreenBrick paymentId={paymentId} invoiceId={invoiceId} userId={userId} />
    </div>
  );
};

export default PagosStatus;