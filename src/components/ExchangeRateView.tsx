import BigNumber from 'bignumber.js';
import { useContext, useEffect, useState } from 'react';
import { fromWei } from '../service/web3.service';
import { GlobalContext } from '../context/global.context';
import Form from 'react-bootstrap/Form';

export const ExchangeRateView = () => {
  const useGlobalContext = useContext(GlobalContext);

  const [dropValue, setDropValue] = useState('USD');
  const [fiatAmount, setFiatAmount] = useState(0);

  const handleValueChange = (e: any) => {
    setDropValue(e.target.value);
  };

  const calculateFiatAmount = () => {
    if (useGlobalContext.exchangeRate) {
      let valueOfInterest =
        useGlobalContext.customAmount || Number(fromWei(useGlobalContext.walletDetails?.balanceInWei || '0'));
      let fiatExcRate = 0;
      switch (dropValue) {
        case 'USD':
          fiatExcRate = Number(useGlobalContext.exchangeRate.usdEthRate);
          break;
        case 'EUR':
          fiatExcRate = Number(useGlobalContext.exchangeRate.eurEthRate);
          break;

        default:
          fiatExcRate = Number(useGlobalContext.exchangeRate.usdEthRate);
          break;
      }

      setFiatAmount(BigNumber(valueOfInterest).multipliedBy(BigNumber(fiatExcRate)).toNumber());
    }
  };

  useEffect(() => {
    calculateFiatAmount();
  }, [dropValue, useGlobalContext]);

  return (
    <>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#F8F9FB',
          border: 'solid 2px #DDDDDD',
          borderRadius: '5px',
          padding: '5px 15px 30px',
          flexGrow: 1,
        }}
      >
        <Form.Select value={dropValue} onChange={handleValueChange}>
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
        </Form.Select>
        <div style={{ fontWeight: 'bold' }}>{`${fiatAmount.toFixed(2)} $`}</div>
      </div>
    </>
  );
};
