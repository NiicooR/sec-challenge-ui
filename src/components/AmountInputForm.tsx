import { useContext, useEffect, useState } from 'react';
import { GlobalContext } from '../context/global.context';
import Form from 'react-bootstrap/Form';
import { fromWei } from '../service/web3.service';

export const AmountInputForm = () => {
  const useGlobalContext = useContext(GlobalContext);
  const [editMode, setEditMode] = useState(false);
  const [amount, setAmount] = useState(0);

  const handleInputChange = () => {
    useGlobalContext.setAmount(amount);
  };

  const handleAmountChange = (e: any) => {
    setAmount(e.target.value);
  };

  useEffect(() => {
    setAmount(useGlobalContext.customAmount);
  }, [useGlobalContext]);

  return (
    <>
      <div
        style={{
          background: '#F8F9FB',
          border: 'solid 2px #DDDDDD',
          borderRadius: '5px',
          padding: '5px 15px 30px',
          flexGrow: 1,
        }}
      >
        {`Wallet: ${useGlobalContext.selectedWallet}`}
        <div style={{ margin: '5px', display: 'flex', justifyContent: 'end' }}>
          {editMode ? (
            <>
              <div
                onClick={() => {
                  setEditMode(false);
                }}
              >
                <i style={{ color: '#BE676E', cursor: 'pointer', fontSize: '20px' }} className="bi bi-x"></i>
              </div>
              <div
                onClick={() => {
                  handleInputChange();
                  setEditMode(false);
                }}
              >
                <i style={{ color: '#7BA27F', cursor: 'pointer', fontSize: '20px' }} className="bi bi-check"></i>
              </div>
            </>
          ) : (
            <>
              <div onClick={() => setEditMode(true)}>
                <i
                  style={{ color: '#457EDA', cursor: 'pointer', fontSize: '20px' }}
                  className="bi bi-pencil-square"
                ></i>
              </div>
            </>
          )}
        </div>

        <Form.Control
          disabled={!editMode}
          type="number"
          placeholder="Insert ETH value"
          value={amount ? amount : Number(fromWei(useGlobalContext.walletDetails?.balanceInWei || '0'))}
          onChange={handleAmountChange}
        />
      </div>
    </>
  );
};
