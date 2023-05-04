import React, { useContext } from 'react';
import { Alert } from 'react-bootstrap';
import { GlobalContext } from '../context/global.context';
import { ExchangeRateView } from './ExchangeRateView';
import { AmountInputForm } from './AmountInputForm';

export const WalletDetails = () => {
  const { walletDetails } = useContext(GlobalContext);

  return (
    <>
      {walletDetails?.isOld && (
        <Alert variant={'danger'}>
          <i className="bi bi-exclamation-triangle-fill"></i> Wallet is old!
        </Alert>
      )}
      <div style={{ display: 'flex', gap: '20px' }}>
        <AmountInputForm />
        <ExchangeRateView />
      </div>
    </>
  );
};
