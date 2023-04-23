import React from 'react';
import { Link } from 'react-router-dom'
import { Select } from 'antd';
import '../styles/DashHeader.css'
import goBack from '../resource/goBack.svg'
import industries from '../resource/industries.json'
import districts from '../resource/districts.json'

const industry_options = industries.industries.map(obj => ({
    value: obj.code.toString(),
    label: obj.name
}));

const district_options = districts.districts.map(obj => ({
    value: obj.district.toString(),
    label: obj.dist_name
}));

export default function DashboardHeader({ district, setDistrict, industry, setIndustry }) {
  return (
    <header className='dash-headerContainer'>
      <div className='logo'>
        <Link to="/map">
          <img src={goBack}
               alt='logo'
               style={{
                  marginTop:'1.3rem',
                  width:"40%",
                  height:"40%",
                }}/>
        </Link>
      </div>
      <div>
          <h1 className='dash-mainHeader'>Dashboard</h1>
          
      </div>
      <div className='selector'>
      <Select
            showSearch
            style={{ width: 250 }}
            // placeholder={district==='LA' ? 
            //                         'Los Angeles' 
            //                         :''}
            defaultValue={district==='LA' ? 
                                    'LA' 
                                    :district}
            optionFilterProp="children"
            filterOption={(input, option) => (option?.label ?? '').includes(input)}
            filterSort={(optionA, optionB) =>
                parseInt(optionA.value) < parseInt(optionB.value)
            }
            onSelect={(value, label) => {setDistrict(value)}}
            options={district_options}
        />
        <Select
            showSearch
            style={{ width: 350 }}
            placeholder="All Industry"
            optionFilterProp="children"
            filterOption={(input, option) => (option?.label ?? '').includes(input)}
            filterSort={(optionA, optionB) =>
            (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
            }
            onSelect={(value, label) => {setIndustry(label.label)}}
            options={industry_options}
        />
      </div>
      <div><h2>{`${district} ${industry}`}</h2></div>
    </header>
  );
}

