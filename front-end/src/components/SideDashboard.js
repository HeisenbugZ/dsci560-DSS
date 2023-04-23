import React from 'react';
import Recommendations from './Recommendations';
import LineChart from './LineChart';
import PieChart from './PieChart';
import '../styles/Sider.css'

function SideDashboard({ selectedDistrict, location}) {
  return (
    <div className='sider-container'>
      <Recommendations district={selectedDistrict} location={location}/>
      <LineChart district={selectedDistrict} />
      <PieChart district={selectedDistrict} />
    </div>
  );
}

export default SideDashboard;
