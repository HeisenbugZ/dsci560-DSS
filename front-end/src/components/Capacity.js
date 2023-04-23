import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { Card, Space  } from 'antd';
import { API_Capacity } from '../utils/APIs';
import industries from '../resource/industries.json'
import districts from '../resource/districts.json'
import '../styles/Dashboard.css'

const industry_options = industries.industries.map(obj => ({
    value: obj.code.toString(),
    label: obj.name
}));
console.log(industry_options);

const district_options = districts.districts.map(obj => ({
    value: obj.district.toString(),
    label: obj.dist_name
}));


function Capacity({ district, industry}) {
  const [current_active, setCurActive] = useState([])
  const [capacity, setCapacity] = useState([])
  const industryOption = industry_options.find(option => option.label === industry);
  const industryValue = industryOption ? industryOption.value : null;
  useEffect(() => {
    const url = API_Capacity(district,industryValue)
    // console.log(industryValue)
    axios.get(url).then(res => {
      // console.log(res)
      const cur_active = res.data.prev
      // console.log(cur_active)
      const capacity = res.data.capacity;
      // console.log(capacity)
      setCurActive(cur_active);
      setCapacity(capacity);
    })
  }, [district, industryValue])    
    
  return (
    <Card>
      <Space direction="vertical" size={80}>
      <Card 
        title="Current Active Business: "
        headStyle={{textAlign: 'Center'}}
        // extra={<a href="#">More</a>}
        style={{
        width: 300,
        }}
      >
        <h3 className='activeNum'>{current_active}</h3>
      </Card>
      <Card
        title="Capacity: "
        headStyle={{textAlign: 'Center'}}
        // extra={<a href="#">More</a>}
        style={{
        width: 300,
        }}
      >
        <h3 className='capacityNum'>{capacity}</h3>
      </Card>
      {/* <div>
        <h3 className='activeNum'>Current Active Business: {current_active}</h3>
        <h3 className='capacityNum'>Capacity: {capacity}</h3>
        <h3 className='recHeader'>Top 5 Industries Recommendations for startup in {district === "LA" ? district : 'District '+ district}:</h3>
        <ul className='recUl'>
        {recommendations.map(industry => {
          return <div className='industry' key={industry.rank}>
            <li className='recText'>{`${industry.rank}. ${industry.name}`}</li>
            <MoreInfo naics={industry.code}/>
          </div>
        })}
        </ul>
      </div> */}
      </Space>
    </Card>
  );
}
  
export default Capacity;
  