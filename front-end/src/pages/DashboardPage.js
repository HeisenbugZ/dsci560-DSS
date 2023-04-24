import React, { useState } from 'react';
import DashboardHeader from '../components/DashboardHeader';
import Capacity from '../components/Capacity';
import DashCharts from '../components/DashCharts';
import '../styles/Dashboard.css';
import WageChart from '../components/WageChart';
import ContriChart from '../components/ContriChart';


export default function DashboardPage( {selectedDistrict, setSelectedDistrict} ){
  const [selectIndustry, setSelecteIndustry] = useState("all")

  return (
    <div className='dash-container'>

      <div className='dash-header'>
          <DashboardHeader
            district={ selectedDistrict }
            setDistrict={ setSelectedDistrict }
            industry={ selectIndustry }
            setIndustry={ setSelecteIndustry }/>
      </div>

      <div className='dash-content'>
      
        <div className='left-container'>
          <Capacity
            district={ selectedDistrict }
            industry={ selectIndustry }
          />
        </div >

        <div className='middle-container'>
          <DashCharts 
            district={ selectedDistrict }
            industry={ selectIndustry }
          />
        </div>

        <div className='right-container'>
          <WageChart
            industry={selectIndustry }
          />
          <ContriChart
            industry={selectIndustry }
          />
        </div>

      </div>

    </div>
  )
}