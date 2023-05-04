import React, { useContext, useState } from 'react';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { validateAddress } from '../service/web3.service';
import { GlobalContext } from '../context/global.context';

export const WalletInput = () => {
  const useGlobalContext = useContext(GlobalContext);
  const [isValidAddress, setIsValidAddress] = useState(false);
  const [address, setAddress] = useState('');

  function handleAddressChange(event: any) {
    event.preventDefault();
    setIsValidAddress(validateAddress(event.target.value));
    setAddress(event.target.value);
  }

  function onSubmit(event: any) {
    event.preventDefault();
    useGlobalContext.addWallet(address);
    setIsValidAddress(false);
    setAddress('');
  }

  return (
    <Form style={{ display: 'flex', gap: '10px' }} onSubmit={onSubmit}>
      <Button disabled={!isValidAddress} variant="primary" type="submit">
        +
      </Button>
      <Form.Control onChange={handleAddressChange} type="text" placeholder="Insert Address" value={address} />
    </Form>
  );
};
