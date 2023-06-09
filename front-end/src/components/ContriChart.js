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

export default function ContriChart({ industry }) {

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
              industry.name.trim(),
              ...industry.contribution
            ])
          ];
        }else{
          formattedData = [
            ['Industry', ...data.time],
            [industries.name, ...data.industries.contribution]
          ]
          num = 1
        }
        console.log(data)
        const option = {
          title: {
            text: 'GDP Contribution & Quarterly Change Rate',
            left: 'center',
            // top: '1%',
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
              valueFormatter: (value) => {
                if (value !== undefined){
                  return value.toFixed(4) + ' M'
                }else{
                  return value
                }
              }
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
              formatter: "{value} M"
            }
          },
          {
            type: 'value',
            min: -1.5,
            max: 1.5,
            interval: 0.05,
            axisLabel: {
              show: false
            }
          }],
          grid: { top: 40, right: 10, bottom: 59, left: 45 },
          series: createSeriesList(num, data.industries.contribution_change)
          

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
    <Card className='ContriCard'>
        <div>
          <div ref={chartRef} style={{ height: "250px" }}></div>
        </div>
    </Card>
    
  );
}


