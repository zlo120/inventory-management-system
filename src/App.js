import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Landing from './components/pages/Landing';
import Summary from './components/pages/Summary';
import Add from './components/pages/Add';
import Sheets from './components/pages/Sheets';
import StockIntake from './components/pages/StockIntake';

const App = () => {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Landing />} />
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