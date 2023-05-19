import React from 'react'
import './App.css'
import './index.css'
import Header from './components/Header'
import ComputerTable from './components/ComputerTable';
import StatusTabs from './components/StatusTabs';
import AddComputer from './components/AddComputer';
import Drawer from './components/Drawer';

function App() {
  return (
    <>
      <Header />
      <br />
      <StatusTabs />
      <br />
      <ComputerTable /> 
      <Drawer isOpen={true} />
    </>

  );
}
export default App
