interface Wallet {
  id: number;
  address: string;
  isFavorite: boolean;
}

interface ExchangeRate {
  usdEthRate: string;
  eurEthRate: string;
  updatedAt: Date;
}

interface WalletDetails {
  isOld: boolean;
  balanceInWei: string;
}
