import React, { useEffect, useRef }from 'react';
// import ReactEcharts from "echarts-for-react"
import * as echarts from "echarts";
import { Card } from 'antd';
import axios from 'axios';
import { API_Active_Business } from '../utils/APIs';
import industries from '../resource/industries.json'
import '../styles/Dashboard.css'

// const industry_options = industries.industries.map(obj => ({
//   value: obj.code.toString(),
//   label: obj.name
// }));
const industryDict = Object.fromEntries(
  industries.industries.map(
    ({code, name}) => [name, code]));


function createSeriesList(n) {
  const series = [];
  for (let i = 0; i < n; i++) {
    series.push({
      type: 'line',
      smooth: true,
      seriesLayoutBy: 'row',
      // emphasis: { focus: 'series' }
    });
  }
  series.push({
    type: 'pie',
    id: 'pie',
    radius: '30%',
    center: ['50%', '25%'],
    // emphasis: { focus: 'self' }, 
    label: { formatter: '{b}' },
    encode: { itemName: 'Industry', value: '2022/2', tooltip: '2022/2' }
  });

  return series
}

export default function DashCharts({ district, industry }) {
  const chartRef = useRef(null);
  useEffect(() => {
    const current = chartRef.current;
    const chartInit = () => {
      let chartInstance = echarts.init(chartRef.current);
      const num = 11
      axios.get(API_Active_Business(district,null,null,num,industryDict[industry])).then(res => {
        const data = res.data
        console.log(data)
        const formattedData = [
          ['Industry', ...data.time],
          ...data.industries.map(industry => [
            industry.name.trim(),
            ...industry.active
          ])
        ];
        console.log(formattedData)
        // console.log(formattedData)
        const option = {
          title: {
            text: `Number of Active Business in ${district==='LA' ?  district :'District '+district}`,
            left: 'center',
            top: '43%',
          },
          legend: {
            type: 'scroll',
            // orient: 'vertical',
            // data: data.industries.map(item => item.name)
          },
          tooltip: [
            {
              trigger: 'axis',
              // showContent: false
            },
            {
              trigger: 'item',
              // formatter: '({d}%)'
            },
          ],
          dataset: {
            source: formattedData
          },
          dataZoom: [
            {
              show: true,
              realtime: true,
              start: 60,
              end: 100,
              xAxisIndex: [0, 1],
              bottom: 13
            },
            {
              type: 'inside',
              realtime: true,
              start: 60,
              end: 100,
              xAxisIndex: [0, 1]
            }
          ],
          xAxis: { type: 'category' },
          yAxis: { gridIndex: 0 },
          grid: { top: '50%', right: '12%', bottom: '12%', left: '12%' },
          series: createSeriesList(num)
        };
        chartInstance.on('updateAxisPointer', function (event) {
          const xAxisInfo = event.axesInfo[0];
          if (xAxisInfo) {
            const dimension = xAxisInfo.value + 1;
            chartInstance.setOption({
              series: {
                id: 'pie',
                label: {
                  // formatter: '{b}: {@[' + dimension + ']} ({d}%)'
                  formatter: '{b}'
                },
                encode: {
                  value: dimension,
                  tooltip: dimension
                }
              }
            });
          }
        });
        chartInstance.setOption(option);
      })
      
    }
    chartInit();
    return () => {
      echarts.dispose(current);
    };
    
  }, [district, industry])
  

  return (
    
      <Card>
        <div className='DashCharts'>
          <div ref={chartRef} style={{ height: "600px" }}></div>
        </div>
      </Card>
    
  );
}