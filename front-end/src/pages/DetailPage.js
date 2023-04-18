import React from 'react';
import Capacity from '../components/Capacity';
import Header from '../components/Header';
import '../styles/Detail.css';


export default function DetailPage( {selectedDistrict, setSelectedDistrict} ){
    return (
      <div className='detail-container'>
        <div className='detail-header'>
            <Header />
        </div>
        <div className='detail-content'>
        
            <div className='left-container'>
            <Capacity />
            </div >
            <div className='middle-container'>
            {/* <InteractiveMap
                selectedDistrict={selectedDistrict}
                setSelectedDistrict={setSelectedDistrict}
            />
            <SideDashboard 
                selectedDistrict={selectedDistrict}
            /> */}
            </div>
            <div className='right-container'>

            </div>
        </div>
      </div>
    )
  }