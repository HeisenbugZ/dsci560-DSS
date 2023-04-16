import React, {useState, useEffect} from 'react';
import axios from 'axios';
import MoreInfo from './MoreInfo';
import { API_Recommendations } from '../utils/APIs';
import '../styles/Sider.css'

function Recommendations({ district }) {
  const [recommendations, setRecommendations] = useState([])
  // const sortedIndustries = recommendations.industries.sort((a, b) => a.rank - b.rank);
  useEffect(() => {
    const url = API_Recommendations(district)
    axios.get(url).then(res => {
      // console.log(res)
      const recommands = res.data.recommandations
      // console.log(recommands)
      const sortedIndustries = recommands.sort((a, b) => a.rank - b.rank);
      // console.log(sortedIndustries)
      setRecommendations(sortedIndustries);
    })
  }, [district])
  
  return (
    <div className='recommendation'>
      <h3 className='recHeader'>Top 5 Industries Recommendations for startup in {district === "LA" ? district : 'District '+ district}:</h3>
      <ul className='recUl'>
      {recommendations.map(industry => {
        return <div className='industry' key={industry.rank}>
          <li className='recText'>{`${industry.rank}. ${industry.name}`}</li>
          <MoreInfo naics={industry.code}/>
        </div>
      })}
      </ul>
    </div>
  );
}

export default Recommendations;
