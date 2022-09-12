import React from 'react';
import './App.css';
import Table from './components/Table';
import FilterInput from './components/FilterInput';
import Provider from './context/Provider';

// Projeto realizdo com ajuda de Diego Demontier Tribo B, Fernando Costa Tribo A

function App() {
  return (
    <Provider>
      <div>
        <FilterInput />
        <Table />
      </div>
    </Provider>
  );
}

export default App;
