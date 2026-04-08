import { useState } from 'react';
import './App.css';
import StoreSelector from './StoreSelector';
import CafeApp from './cafe/CafeApp';
import BurgerApp from './burger/BurgerApp';

type StoreType = 'cafe' | 'burger' | null;

function App() {
  const [selectedStore, setSelectedStore] = useState<StoreType>(null);

  if (selectedStore === 'cafe') {
    return <CafeApp onExit={() => setSelectedStore(null)} />;
  }

  if (selectedStore === 'burger') {
    return <BurgerApp onExit={() => setSelectedStore(null)} />;
  }

  return (
    <div className="app">
      <StoreSelector onSelect={setSelectedStore} />
    </div>
  );
}

export default App;
