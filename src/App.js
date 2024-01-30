import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Landing from './components/pages/Landing';
import Summary from './components/pages/Summary';
import Add from './components/pages/Add';
import Sheets from './components/pages/Sheets';
import StockIntake from './components/pages/StockIntake';
import Login from './components/pages/users/Login';
import Register from './components/pages/users/Register';
import Logout from './components/pages/users/Logout';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Login />} />
          <Route path='inventory' element={<Landing />} />
          <Route path='logout' element={<Logout />} />
          <Route path='login' element={<Login />} />
          <Route path='register' element={<Register />} />
          <Route path='add' element={<Add />} />
          <Route path='outstanding' element={<Summary />} />
          <Route path='summary' element={<Summary />} />
          <Route path='sheets' element={<Sheets />} />
          <Route path='stockintake' element={<StockIntake />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;