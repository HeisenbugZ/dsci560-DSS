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
          grid: { top: 20, right: 20, bottom: 20, left: 20 },
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
          title: {
            text: 'Ratio of Top 10 Industries',
            // subtext: '',
            left: 'center',
            textStyle: {
              fontSize: 20,
              fontStyle: "normal",
              fontWeight: "lighter",
              fontFamily: "Arial",
              color: "rgba(0, 0, 0, 0.59)",
            },
            padding:[20,10,10,10],
          },
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
          },
          series: {
            name: "Industry",
            data: pie_data,
            type: "pie",
            smooth: true,
            radius: "55%",
            center: ['55%', '50%'],
          }
        }
        chartInstance.setOption(option);
      })
    }
    chartInit();
    // return () => {
    //   echarts.dispose(current);
    // };
  }, [district])
  
  return (
    <div className='pieChart'>
      <div ref={chartRef} 
           style={{ width: "92%", height: "92%" }}>
      </div>
    </div>
  );
}

export default PieChart;
