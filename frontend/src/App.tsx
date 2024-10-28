import './App.css';

import { Routes, Route } from 'react-router-dom';
import HomePage from '@/pages/HomePage';

function App() {

  return (
    <>
      <div id='app'>
        <Routes>
          <Route path="" element={<HomePage />}></Route>
        </Routes>
      </div>
    </>
  )
}

export default App
