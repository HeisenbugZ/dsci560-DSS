import React, { useEffect, useRef }from 'react';
// import ReactEcharts from "echarts-for-react"
import * as echarts from "echarts";
import { Card } from 'antd';
import axios from 'axios';
import { API_Eco } from '../utils/APIs';
import '../styles/Dashboard.css'
import industries from '../resource/industries.json'

const industryDict = Object.fromEntries(
  industries.industries.map(
    ({code, name}) => [name, code]));
    
function createSeriesList(n, change_rate) {
  const series = [];
  for (let i = 0; i < n; i++) {
    series.push({
      type: 'bar',
      smooth: true,
      seriesLayoutBy: 'row',
      // emphasis: { focus: 'series' }
    });
  }
  if(n===1){
    series.push({
      name: 'Change Rate',
      type: 'line',
      yAxisIndex: 1,
      tooltip: {
        valueFormatter: function (value) {
          return value;
        }
      },
      data: change_rate
    });
  }
  

  return series
}

export default function WageChart({ industry }) {

  const chartRef = useRef(null);

  useEffect(() => {
    const current = chartRef.current;
    const chartInit = () => {
      let chartInstance = echarts.init(current);
      let num = 10
      const url = industry === 'all' ? API_Eco(null,num,null,null) 
                                    : API_Eco(industryDict[industry],null,null) 
      axios.get(url).then(res => {
        console.log(res);
        const data = res.data
        let formattedData = data
        if (industry === 'all'){
          formattedData = [
            ['Industry', ...data.time],
            ...data.industries.map(industry => [
              industry.code,
              ...industry.wages
            ])
          ];
        }else{
          formattedData = [
            ['Industry', ...data.time],
            data.industries.wages
          ]
          num = 1
        }
        console.log(data)
        const option = {
          title: {
            text: 'Wage',
            left: 'center',
            // top: '5%',
            // textStyle: {
            //   fontSize: 16,
            //   fontStyle: "normal",
            //   fontWeight: "lighter",
            //   fontFamily: "Arial",
            //   color: "rgba(0, 0, 0, 0.59)",
            // },
            // padding:[10,10,10,10],
          },
          dataset: {
            source: formattedData
          },
          dataZoom: [
            {
              show: true,
              realtime: true,
              start: 90,
              end: 100,
              xAxisIndex: [0, 1],
              bottom: 13
            },
            {
              type: 'inside',
              realtime: true,
              start: 90,
              end: 100,
              xAxisIndex: [0, 1]
            }
          ],
          tooltip: [
            {
              trigger: 'axis',
              // showContent: false
            },
          ],
          xAxis: {
            type: "category",
            data: data.time
          },
          yAxis: [{
            // type: "value",
            gridIndex: 0,
            axisLabel:{
              formatter: "{value}"
            }
          },
          {
            type: 'value',
            min: -3,
            max: 3,
            interval: 0.05,
            axisLabel: {
              show: false
            }
          }],
          grid: { top: 40, right: 10, bottom: 59, left: 74 },
          series: createSeriesList(num, data.industries.wage_change)
          

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
        <div className='WageChart'>
          <div ref={chartRef} style={{ height: "250px" }}></div>
        </div>
    </Card>
    
  );
}
