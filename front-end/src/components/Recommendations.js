import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'
import MoreInfo from './MoreInfo';
import DistrictInfo from './DistrictInfo';
import { API_Recommendations } from '../utils/APIs';
import '../styles/Sider.css'

function Recommendations({ district, location}) {
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
      <div className='recTop'>
        <h3 className='selectDistrict'>
          {district === "LA" ? district : 'District '+ district}
          {location ? ` (${location})`:""}
        </h3>
        {district === "LA" ? "":<DistrictInfo district={district} />}
        <Link className='linkToDashboard' to="/dashboard">
          <p>go to dashboard
          </p>
        </Link>
      </div>
      
      {/* <h3 className='recHeader'>Top 5 Industries Recommendations for startup in {district === "LA" ? district : 'District '+ district}:
      </h3> */}
      <h3 className='recHeader'>Top 5 Industries Recommendations for startup:
      </h3>
      <div className='recContent'>
        <ul className='recUl'>
          {recommendations.map(industry => {
            return <div className='industry' key={industry.rank}>
              <li className='recText'>{`${industry.rank}. ${industry.name}`}</li>
              <MoreInfo naics={industry.code}/>
            </div>
          })}
        </ul>
      </div>
    </div>
  );
}

export default Recommendations;
