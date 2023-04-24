import React, { useState }from 'react';
// import { Link } from 'react-router-dom'
import Header from '../components/Header';
import SideDashboard from '../components/SideDashboard';
import InteractiveMap from '../components/InteractiveMap';
import '../styles/main.css';

export default function MapPage( {selectedDistrict, setSelectedDistrict} ){
  const [location, setLocation] = useState("")
  return (
    <div className='container'>
      <div className='header'>
        <Header />
      </div >
      <div className='content'>
        <InteractiveMap
          selectedDistrict={selectedDistrict}
          setSelectedDistrict={setSelectedDistrict}
          setLocation={setLocation}
        />
        <SideDashboard 
          selectedDistrict={selectedDistrict}
          location={location}
        />
      </div>
    </div>
  )
  }