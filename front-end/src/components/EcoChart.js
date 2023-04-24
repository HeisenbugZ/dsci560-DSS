import React, { useEffect, useRef }from 'react';
// import ReactEcharts from "echarts-for-react"
import * as echarts from "echarts";
import { Card } from 'antd';
import axios from 'axios';
import { API_Eco } from '../utils/APIs';
import '../styles/Dashboard.css'
import industries from '../resource/industries.json'


const industry_options = industries.industries.map(obj => ({
    value: obj.code.toString(),
    label: obj.name
}));

function EcoChart({ industry }) {

  const chartRef = useRef(null);
  const industryOption = industry_options.find(option => option.label === industry);
  const industryValue = industryOption ? industryOption.value : null;

  useEffect(() => {
    const current = chartRef.current;
    const chartInit = () => {
      let chartInstance = echarts.init(current);
      axios.get(API_Eco(industryValue,null, '2014/1', null)).then(res => {
        console.log(res);
        const data = res.data
        // console.log(data.time)
        const option = {
          grid: { top: 40, right: 40, bottom: 30, left: 60 },
          title: {
            text: 'Wages change during Periods',
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
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross'
            }
          },
          toolbox: {
            show: true,
            feature: {
              saveAsImage: {}
            }
          },
          
          xAxis: {
            type: "category",
            boundaryGap: false,
            data: data.time
          },
          yAxis: {
            type: "value",
            axisLabel:{
              formatter: "{value} %"
            }
          },
          visualMap: {
            show: false,
            dimension: 0,
            pieces: [
              {
                lte: 6,
                color: 'green'
              },
              {
                gt: 6,
                lte: 8,
                color: 'red'
              },
              {
                gt: 8,
                lte: 14,
                color: 'green'
              },
              {
                gt: 14,
                lte: 17,
                color: 'red'
              },
              {
                gt: 17,
                color: 'green'
              }
            ]
          },
          series: data.industries.map( industry => {
            return {
              name: industry.code,
              data: industry.wages,
              type: "line",
              smooth: true,
            //   markArea: {
            //     itemStyle: {
            //       color: 'rgba(255, 173, 177, 0.4)'
            //     },
            //     data: [
            //       [
            //         {
            //           name: 'Morning Peak',
            //           xAxis: '07:30'
            //         },
            //         {
            //           xAxis: '10:00'
            //         }
            //       ],
            //       [
            //         {
            //           name: 'Evening Peak',
            //           xAxis: '17:30'
            //         },
            //         {
            //           xAxis: '21:15'
            //         }
            //       ]
            //     ]
            //   }
            }
          })
        }
        chartInstance.setOption(option);
      });
    }
    chartInit();
    return () => {
      echarts.dispose(current);
    };
    
  }, [industry])

  return (
    <Card>
        <div className='ecoChart'>
          <div ref={chartRef} style={{ height: "600px" }}></div>
        </div>
    </Card>
    
  );
}

export default EcoChart;
