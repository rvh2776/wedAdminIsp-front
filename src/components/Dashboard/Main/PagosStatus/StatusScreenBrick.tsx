import { StatusScreen } from '@mercadopago/sdk-react';

export const BACK_URL = process.env.NEXT_PUBLIC_API_URL_BACK_URL
export const BACK_URL_ERROR = process.env.NEXT_PUBLIC_API_URL_BACK_URL_ERROR

interface StatusBrickProps {
  paymentId: string;
  invoiceId: (string | null);
  userId: (string | null);
}

const StatusScreenBrick: React.FC<StatusBrickProps> = ({ paymentId, invoiceId, userId }) => {

  const initialization = {
    paymentId: paymentId,
    invoiceId,
    userId,
  };

  console.log(initialization);
  const customization = {
    visual: {
      showExternalReference: true,
      hideStatusDetails: false,
      hideTransactionDate: false,
      texts: {
        ctaReturnLabel: "Volver a inicio"
      },
    },
    backUrls: {
      error: `${BACK_URL_ERROR}`,
      return: `${BACK_URL}`,
    },
  };

  const onError = (error: any) => {
    console.error('Error en Status Screen Brick:', error);
  };

  const onReady = () => {
    console.log('Status Screen Brick está listo.');
  };

  return (
    <div id="statusScreenBrick_container">
      <StatusScreen
        initialization={initialization}
        customization={customization}
        onReady={onReady}
        onError={onError}
        locale='es-AR'
      />
    </div>
  );
};

export default StatusScreenBrick;