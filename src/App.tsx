import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { WalletDetails } from './components/WalletDetails';
import { WalletsTable } from './components/WalletTable';
import { WalletInput } from './components/WalletInput';
import { GlobalProvider } from './context/global.context';

function App() {
  return (
    <div style={{ padding: '10px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <GlobalProvider>
        <WalletInput />
        <WalletsTable />
        <WalletDetails />
      </GlobalProvider>
    </div>
  );
}

export default App;
