import React, { useState } from 'react';
import Capacity from '../components/Capacity';
import Header from '../components/Header';
import '../styles/Detail.css';


export default function DashboardPage( {selectedDistrict, setSelectedDistrict} ){
  const [selectIndustry, setSelecteIndustry] = useState("all")
  return (
    <div className='detail-container'>
      <div className='detail-header'>
          <Header />
      </div>
      <div className='detail-content'>
      
          <div className='left-container'>
          <Capacity
            district={ selectedDistrict }
            industry={ selectIndustry }
          />
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