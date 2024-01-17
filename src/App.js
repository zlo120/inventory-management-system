import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Landing from './components/pages/Landing';
import Summary from './components/pages/Summary';
import Add from './components/pages/Add';

const App = () => {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Landing />} />
          <Route path='add' element={<Add />} />
          <Route path='outstanding' element={<Summary />} />
          <Route path='summary' element={<Summary />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;