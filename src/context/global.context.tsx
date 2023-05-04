import React, { createContext, useEffect, useState } from 'react';
import {
  createWallet,
  fetchExchangeRates,
  fetchWalletDetails,
  fetchWallets,
  patchWallets,
} from '../service/datasource.service';

type GlobalContextType = {
  wallets: Wallet[];
  addWallet: (address: string) => void;
  getWallets: () => void;
  exchangeRate: ExchangeRate | null;
  selectedWallet: string | null;
  selectWallet: (address: string) => void;
  walletDetails: WalletDetails | null;
  setAmount: (amount: number) => void;
  customAmount: number;
  updateFavoriteWallet: (id: number, isFavorite: boolean) => void;
};

export const GlobalContext = createContext<GlobalContextType>({} as GlobalContextType);

export const GlobalProvider = ({ children }: any) => {
  const [wallets, setWallets] = useState<Wallet[]>([] as Wallet[]);
  const [exchangeRate, setExchangeRate] = useState<ExchangeRate | null>(null);
  const [selectedWallet, setSelectedWallet] = useState<string | null>(null);
  const [walletDetails, setWalletDetails] = useState<WalletDetails | null>(null);
  const [customAmount, setCustomAmount] = useState(0);

  useEffect(() => {
    getWallets();
    getExchangeRates();
  }, []);

  useEffect(() => {
    selectedWallet && getWalletDetails(selectedWallet);
  }, [selectedWallet]);

  async function addWallet(address: string) {
    try {
      await createWallet(address);
      await getWallets();
    } catch (error) {
      console.error((error as Error).message);
    }
  }

  async function getWallets() {
    try {
      const wallets = await fetchWallets();
      setWallets(wallets);
    } catch (error) {
      console.error((error as Error).message);
    }
  }

  async function updateFavoriteWallet(id: number, isFavorite: boolean) {
    try {
      await patchWallets(id, isFavorite);
      await getWallets();
    } catch (error) {
      console.error((error as Error).message);
    }
  }

  async function getExchangeRates() {
    try {
      const exchangeRates = await fetchExchangeRates();
      setExchangeRate(exchangeRates);
    } catch (error) {
      console.error((error as Error).message);
    }
  }

  async function getWalletDetails(address: string) {
    try {
      const walletDetails = await fetchWalletDetails(address);
      setWalletDetails(walletDetails);
    } catch (error) {
      console.error((error as Error).message);
    }
  }

  function selectWallet(address: string) {
    setAmount(0);
    setSelectedWallet(address);
  }

  function setAmount(amount: number) {
    setCustomAmount(amount);
  }

  return (
    <GlobalContext.Provider
      value={{
        wallets,
        addWallet,
        getWallets,
        exchangeRate,
        selectedWallet,
        selectWallet,
        walletDetails,
        setAmount,
        customAmount,
        updateFavoriteWallet,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
