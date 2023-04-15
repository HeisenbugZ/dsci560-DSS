import React, { useState, useRef, useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import districtsData from '../resource/laCouncilDistricts.json';
import '../styles/HeatMap.css'

const d_count = {
  '1': 7789,
  '2': 9119,
  '3': 9970,
  '4': 15312,
  '5': 16834,
  '6': 7968,
  '7': 4270,
  '8': 5636,
  '9': 5131,
  '10': 11819,
  '11': 13531,
  '12': 7541,
  '13': 12584,
  '14': 13458,
  '15': 4951
}

function getHeatColore(d) {
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
          color:
            selectedDistrict === district
                ? "red"
                : getHeatColore(d_count[district]),
          weight: 2,
          opacity: 0.7,
          dashArray: "3",
          fillOpacity:
            selectedDistrict === district ? 0.5 : 1,
        }
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
                // click: () => {
                //   districtLayers.eachLayer(function(layer) {
                //     if (layer.options.className === select) {
                //       layer.setStyle(layerStyle(null))
                //     }
                //   })
                //   // alert(select)
                //   if (select === district.properties.district) {
                //     setSelectedDistrict("LA");
                //     select = "LA";
                //     // layer.bindPopup(district.properties.dist_name);
                //   }else{
                //     layer.setStyle(layerStyle(select));
                //     setSelectedDistrict(district.properties.district);
                //     select = district.properties.district;
                //   }
                  
                // },
                click: () => {
                  districtLayers.eachLayer(function(layer) {
                    if (layer.options.className === select) {
                      layer.setStyle(layerStyle(select))
                    }
                  })
                  select = district.properties.district;
                  layer.setStyle(layerStyle(district.properties.district));
                  // select = district
                  // setSelectedDistrict(district.properties.district);

                },
                mouseover: (event) => {
                  const layer = event.target
                  layer.setStyle({
                    color: "red",
                    weight: 3,
                    opacity: 0.7,
                    fillOpacity: 0.5,
                  });
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
