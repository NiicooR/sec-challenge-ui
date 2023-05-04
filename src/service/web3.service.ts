import Web3 from 'web3';

export const validateAddress = (address: string) => {
  return Web3.utils.isAddress(address);
};

export const fromWei = (wei: string) => {
  return Web3.utils.fromWei(wei);
};
