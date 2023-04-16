import React from 'react';
import Recommendations from './Recommendations';
import LineChart from './LineChart';
import PieChart from './PieChart';
import '../styles/Sider.css'

function SideDashboard({ selectedDistrict }) {
  return (
    <div className='sider-container'>
      <h2 className='dashHeader'>{selectedDistrict === "LA" ? 
        "Dashboard (LA)" : 
        `Dashboard (District ${selectedDistrict})`}
      </h2>
      <Recommendations district={selectedDistrict} />
      <LineChart district={selectedDistrict} />
      <PieChart district={selectedDistrict} />
    </div>
  );
}

export default SideDashboard;
