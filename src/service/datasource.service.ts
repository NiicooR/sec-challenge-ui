export const createWallet = async (address: string) => {
  console.log('Creating Wallet...');
  await fetch('http://localhost:3001/wallets', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      address: address,
      isFavorite: false,
    }),
  });
  console.log('Created Wallet');
};

export const fetchWallets = async () => {
  console.log('Fetching Wallets...');
  const response = await fetch('http://localhost:3001/wallets', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  console.log('Fetched Wallets');
  return (await response.json()) as Wallet[];
};

export const patchWallets = async (id: number, isFavorite: boolean) => {
  console.log('Patching Wallet...');
  const response = await fetch(`http://localhost:3001/wallets/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      isFavorite,
    }),
  });
  console.log('Patched Wallet');
  return (await response.json()) as Wallet[];
};

export const fetchExchangeRates = async () => {
  console.log('Fetching exchange rates...');
  const response = await fetch('http://localhost:3001/exchange-rates', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  console.log('Fetched exchange rates');
  return (await response.json()) as ExchangeRate;
};

export const fetchWalletDetails = async (address: string) => {
  console.log('Fetching wallet details...');

  const response = await fetch('http://localhost:3001/wallets/' + address, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  console.log('Fetched wallet details');
  return (await response.json()) as WalletDetails;
};
