"use client";
import React, { useEffect } from 'react';
import { Payment } from '@mercadopago/sdk-react';
import { useRouter } from "next/navigation";

interface PaymentBrickProps {
  preferenceId: string;
  amount: (number | null);
  userId: (string | null);
  invoiceId: (string | null);
}

export const apiURL = process.env.NEXT_PUBLIC_API_URL;

const PaymentBrick: React.FC<PaymentBrickProps> = ({ preferenceId, amount, userId, invoiceId }) => {
  const router = useRouter();

  useEffect(() => {
    if (!preferenceId) {
      console.error("Preference ID is missing");
    }
  }, [preferenceId]);

  const initialization = {
    amount: (amount) ? amount : 1,
    userId,
    invoiceId,
    preferenceId,
  };

  // console.log(initialization);
  const customization = {
    paymentMethods: {
      ticket: ['all'],
      creditCard: ['all'],
      debitCard: ['all'],
      mercadoPago: ['all'],
    },
  };

  const onSubmit = async ({ selectedPaymentMethod, formData }: { selectedPaymentMethod: string; formData: any }) => {
    
    const token = formData.token;

    return new Promise<void>((resolve, reject) => {
      fetch(`${apiURL}/mercado-pago/process-payment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token: token,
          paymentMethod: selectedPaymentMethod,
          initialization,
          ...formData,
        }),
      })
        .then((response) => response.json())
        // .then(() => resolve())
        .then((response) => {
          // console.log('Response from payment process:', response);
          const paymentId = response.id;
          router.push(`/dashboard/pagosStatus?paymentId=${paymentId}&invoiceId=${invoiceId}&userId=${userId}`);

          resolve();
        })
        .catch(() => reject());
    });

  };

  const onError = (error: any) => {
    console.error("Error:", error);
  };

  const onReady = () => {
    // Opcional: Ocultar cargamentos u otras acciones cuando el Brick esté listo
  };

  return (
    <div className="w-200 max-w-full mx-auto">
      <Payment
        initialization={initialization}
        customization={customization}
        onSubmit={onSubmit}
        onReady={onReady}
        onError={onError}
        locale='es-AR'
      />
    </div>
  );
};

export default PaymentBrick;