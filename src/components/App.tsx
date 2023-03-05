import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';

import TripPlannerForm from './trip-planner-form';
import TripSummary from './trip-summary';

function App() {
  return (
    <div className='container'>
      <HashRouter>
        <Routes>
          <Route path='/' element={<TripPlannerForm />} />
          <Route path='/trip-summary' element={<TripSummary />} />
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
