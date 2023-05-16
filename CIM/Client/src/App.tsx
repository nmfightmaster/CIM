import React from 'react'
import './App.css'
import './index.css'
import Header from './components/Header'
import ComputerTable from './components/ComputerTable';
import StatusTabs from './components/StatusTabs';
import Speeddial from './components/Speeddial';
function App() {
  return (
    <>
      <Header />
      <br />
      <StatusTabs />
      <br />
      <ComputerTable />
      <Speeddial />      
    </>

  );
}
export default App
