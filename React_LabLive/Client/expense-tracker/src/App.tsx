import React from 'react';
// import logo from './logo.svg';
import './App.css';
// import NavigationMenu from './components/NavigationMenu';
import ShowData from './components/ShowList';
import ExpenseTracker from './components/ExpenseTracker';
import { Route, Routes } from 'react-router-dom';

const App = () => {
  return (
      <>
          {/* <NavigationMenu /> */}

          <Routes>
              <Route path="/" element={<ShowData/>} />
              <Route path="/add" element={<ExpenseTracker onClose={()=>{}} onTrue={()=>{}}/>}  />
          </Routes>
      </> 
  );
};
export default App;
