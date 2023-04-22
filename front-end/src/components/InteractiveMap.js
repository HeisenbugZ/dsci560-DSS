import React, { useState, useRef, useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';
import 'leaflet-geosearch/dist/geosearch.css';
import districtsData from '../resource/laCouncilDistricts.json';
import '../styles/HeatMap.css'
// import { API_Prediction } from "../utils/APIs";
// import axios from "axios";

const d_count = {
  "1": 7954,
  "2": 9299,
  "3": 10155,
  "4": 15606,
  "5": 17179,
  "6": 8101,
  "7": 4349,
  "8": 5755,
  "9": 5244,
  "10": 12059,
  "11": 13819,
  "12": 7691,
  "13": 12848,
  "14": 13719,
  "15": 5063}

function getHeatColor(d) {
  return d < 5000  ? '#ffffe5':
         d < 7000  ? '#fff7bc':
         d < 10000 ? '#fee391':
         d < 12000 ? '#fec44f':
         d < 13000 ? '#fe9929':
         d < 15000 ? '#ec7014':
                     '#8c2d04';
}

function InteractiveMap({ selectedDistrict, setSelectedDistrict }) {
    const mapRef = useRef(null);
    const [map, setMap] = useState(null);
  
    useEffect(() => {

      let select = selectedDistrict

      function layerStyle(district) {
        return {
          fillColor:
              select === district
                ? "red"
                : getHeatColor(d_count[district]),
          weight: 2,
          opacity: 0.3,
          dashArray: "3",
          color: 'black',
          fillOpacity:
            select === district ? 0.5 : 0.7,
        }
      }

      const HighlightStyle = {
          fillColor: "red",
          color: 'blredack',
          weight: 10,
          opacity: 0.5,
          fillOpacity: 0.5,
      }
      
      
      if (!map) {
        const newMap = L.map(mapRef.current, {
          center: [34.080570, -118.400330],
          zoom: 10.5,
        });
  
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution:
            'Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors',
        }).addTo(newMap);
        // search bar
        const provider = new OpenStreetMapProvider();
        const searchControl = new GeoSearchControl({
          provider: provider,
          showMarker: false,
          autoClose: true,
          retainZoomLevel: false,
          animateZoom: true,
          searchLabel: 'Enter address, place or location',
          // keepResult: true,
        });
        newMap.addControl(searchControl);
        newMap.on('geosearch/search:locationfound', function(e) {
          // var pointData = e.result;
          console.log(e); // or do something else with the point data
        });
        // 注释栏
        const legend = L.control({ position: "bottomleft" });

        legend.onAdd = () => {
          const div = L.DomUtil.create("div", "info legend");
          const grades = [0, 5000, 7000, 10000, 12000, 13000, 15000];
          let labels = ['<p>Number of Active business</p>'];
          let from;
          let to;

          for (let i = 0; i < grades.length; i++) {
            from = grades[i];
            to = grades[i + 1];
            labels.push(
              '<i style="background:' +
                getHeatColor(from + 1) +
                '"></i> ' +
                from +
                (to ? "&ndash;" + to : "+")
            );
          }

          div.innerHTML = labels.join("<br>");
          return div;
        };
        legend.addTo(newMap);
          
        
        
        // 街区图层 组
        const districtLayers = L.layerGroup();
          
        districtsData.features.forEach((district) => {
          const districtPolygon = L.geoJSON(district, {
            style: layerStyle(district.properties.district)
            ,
            className: district.properties.district
            ,
            onEachFeature: (district, layer) => {
              layer.bindPopup(district.properties.dist_name);
              layer.on({
                click: () => {
                  districtLayers.eachLayer(function(layer) {
                    if (layer.options.className === select) {
                      const pre_select = select
                      select = "benbi" //这是一个笨逼方法 来解决颜色赋值问题 不要尝试理解
                      layer.setStyle(layerStyle(layer.options.className))
                      select = pre_select
                    }
                  })
                  
                  // alert(select)
                  if (select === district.properties.district) {
                    setSelectedDistrict("LA");
                    select = "LA";
                    // layer.bindPopup(district.properties.dist_name);
                  }else{
                    layer.setStyle(layerStyle(select));
                    setSelectedDistrict(district.properties.district);
                    select = district.properties.district;
                  }
                  
                },
                mouseover: (event) => {
                  const layer = event.target
                  layer.setStyle(HighlightStyle);
                },
                mouseout: (event) => {
                  const layer = event.target
                  layer.setStyle(layerStyle(layer.options.className));
                },
              });
            },
          });
          // districtPolygon.options.className = district.properties.district;
          districtLayers.addLayer(districtPolygon);
        });
        districtLayers.addTo(newMap)


        setMap(newMap);
      }
    }, [map, selectedDistrict, setSelectedDistrict]);
  
    return <div ref={mapRef} className="map-container" />;
  }
  
export default InteractiveMap;