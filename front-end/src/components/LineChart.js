import React, { useState, useEffect }from 'react';
import ReactEcharts from "echarts-for-react"
import axios from 'axios';
import { API_Change_Ratio } from '../utils/APIs';
import '../styles/Sider.css'

function LineChart({ district }) {

  const [option, setOption] = useState({});

  useEffect(() => {
    axios.get(API_Change_Ratio(district, '2020',null, 10)).then(res => {
      // console.log(res);
      const data = res.data
      // console.log(data.time)
      const newOption = {
        grid: { top: 40, right: 40, bottom: 30, left: 60 },
        title: {
          text: 'Active Business Quarterly Growth Rate during Periods',
          // subtext: '',
          left: 'center',
          textStyle: {
            fontSize: 16,
            fontStyle: "normal",
            fontWeight: "lighter",
            fontFamily: "Arial",
            color: "rgba(0, 0, 0, 0.59)",
          },
          padding:[10,10,10,10],
        },
        
        xAxis: {
          type: "category",
          data: data.time
        },
        yAxis: {
          type: "value",
          axisLabel:{
            formatter: "{value} %"
          }
        },
        tooltip: {
          trigger: 'axis',
          valueFormatter: (value) => {
            if (value !== undefined){
              return value.toFixed(4) + '%'
            }else{
              return value
            }
          }
          // formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        series: data.industries.map( industry => {
          return {
            name: industry.name,
            data: industry.change_rate,
            type: "line",
            smooth: true
          }
        })
      }
      setOption(newOption)
    })
      

  }, [district])
  return (
    <div className='lineChart'>
      {/* <h3>Line Chart for {`District ${district}`}</h3> */}
      <ReactEcharts
        option={option}
        style={{ width: "100%", height: "100%" }}
      ></ReactEcharts>
    </div>
  );
}

export default LineChart;
