import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter , Routes, Route } from 'react-router-dom'
import MapPage from './pages/MapPage';
import Welcome from './pages/WelcomePage';
import DetailPage from './pages/DetailPage';
import ChatGPT from './components/ChatGPT';
import './styles/main.css';

function App() {
  const [selectedDistrict, setSelectedDistrict] = useState("LA");
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={ <Welcome /> }/>
          <Route path="/map" element={ <MapPage
                                          selectedDistrict={selectedDistrict}
                                          setSelectedDistrict={setSelectedDistrict}/> }/>
          <Route path="/chat" element={<ChatGPT />} />
          <Route path="/detail" element={<DetailPage />} />
      </Routes>
    </BrowserRouter>
  );
}
createRoot(document.getElementById('root')).render(<App />);
