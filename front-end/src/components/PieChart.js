import React, { useRef, useEffect }from 'react';
// import ReactEcharts from "echarts-for-react"
import * as echarts from "echarts";
import axios from 'axios';
import { API_Active_Business } from '../utils/APIs';
import '../styles/Sider.css'

function PieChart({ district }) {
  const chartRef = useRef(null);

  useEffect(() => {
    const current = chartRef.current;
    const chartInit = () => {
      let chartInstance = echarts.init(current);
      axios.get(API_Active_Business(district,null,'2022',10)).then(res => {
        // console.log(res);
        const data = res.data
        const pie_data = data.industries.map( item => {
          return {
            name: item.name,
            value: item.active.slice(-1)[0],
          }
        })
        const option = {
          grid: { top: 20, right: 40, bottom: 10, left: 40 },
          // legend: {
          //   type: 'scroll',
          //   orient: 'vertical',
          //   right: 10,
          //   top: 20,
          //   bottom: 20,
          //   data: pie_data.map( i => {
          //     return i.name
          //   })
          // },
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
          },
          series: {
            name: "Industry",
            data: pie_data,
            type: "pie",
            smooth: true
          }
        }
        chartInstance.setOption(option);
      })
    }
    chartInit();
    return () => {
      echarts.dispose(current);
    };
  }, [district])
  
  return (
    <div className='pieChart'>
      <div ref={chartRef} 
           style={{ width: "100%", height: "100%" }}>
      </div>
    </div>
  );
}

export default PieChart;
