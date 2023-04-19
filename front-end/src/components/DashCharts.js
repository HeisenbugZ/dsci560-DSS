import React, { useEffect, useRef }from 'react';
// import ReactEcharts from "echarts-for-react"
import * as echarts from "echarts";
import { Card } from 'antd';
import axios from 'axios';
import { API_Active_Business } from '../utils/APIs';
import '../styles/Dashboard.css'

function createSeriesList(n) {
  const series = [];
  for (let i = 0; i < n; i++) {
    series.push({
      type: 'line',
      smooth: true,
      seriesLayoutBy: 'row',
      emphasis: { focus: 'series' }
    });
  }
  series.push({
    type: 'pie',
    id: 'pie',
    radius: '30%',
    center: ['50%', '25%'],
    emphasis: { focus: 'self' },
    label: { formatter: '{b}: {@2022/2} ({d}%)' },
    encode: { itemName: 'Industry', value: '2022/2', tooltip: '2022/2' }
  });

  return series
}

export default function DashCharts({ district }) {
  const chartRef = useRef(null);
  useEffect(() => {
    const current = chartRef.current;
    const chartInit = () => {
      let chartInstance = echarts.init(chartRef.current);
      axios.get(API_Active_Business(district,null,null,10)).then(res => {
        const data = res.data
        const formattedData = [
          ['Industry', ...data.time],
          ...data.industries.map(industry => [
            industry.name.trim(),
            ...industry.active
          ])
        ];
        // console.log(formattedData)
        const option = {
          legend: {
            type: 'scroll',
            // orient: 'vertical',
            data: data.industries.map(item => item.name)
          },
          tooltip: [
            // {trigger: 'item',
            // formatter: '{a} <br/>{b} : {c} ({d}%)'},
            {trigger: 'axis',
            showContent: false}
          ],
          dataset: {
            source: formattedData
          },
          xAxis: { type: 'category' },
          yAxis: { gridIndex: 0 },
          grid: { top: '55%' },
          series: createSeriesList(32)
        };
        chartInstance.on('updateAxisPointer', function (event) {
          const xAxisInfo = event.axesInfo[0];
          if (xAxisInfo) {
            const dimension = xAxisInfo.value + 1;
            chartInstance.setOption({
              series: {
                id: 'pie',
                label: {
                  formatter: '{b}: {@[' + dimension + ']} ({d}%)'
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
    
  }, [district])
  

  return (
    <div className='DashCharts'>
      <Card>
        {/* <ReactEcharts
          option={option}
          style={{ height: "80vh"}}
        ></ReactEcharts> */}
        <div ref={chartRef} style={{ height: "80vh" }}></div>
      </Card>
    </div>
  );
}