import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import TripPlannerForm from './trip-planner-form';
import TripSummary from './trip-summary';

function App() {
  return (
    <div className='container'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<TripPlannerForm />} />
          <Route path='/trip-summary' element={<TripSummary />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
