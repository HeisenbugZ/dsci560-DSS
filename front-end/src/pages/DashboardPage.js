import React, { useState } from 'react';
import Capacity from '../components/Capacity';
import DashboardHeader from '../components/DashboardHeader';
import '../styles/Detail.css';


export default function DashboardPage( {selectedDistrict, setSelectedDistrict} ){
  const [selectIndustry, setSelecteIndustry] = useState("all")

  return (
    <div className='detail-container'>

      <div className='detail-header'>
          <DashboardHeader
            district={ selectedDistrict }
            setDistrict={ setSelectedDistrict }
            industry={ selectIndustry }
            setIndustry={ setSelecteIndustry }/>
      </div>

      <div className='detail-content'>
      
        <div className='left-container'>
        <Capacity
          district={ selectedDistrict }
          industry={ selectIndustry }
        />
        </div >

        <div className='middle-container'>
        </div>


        <div className='right-container'>
        </div>

      </div>

    </div>
  )
}