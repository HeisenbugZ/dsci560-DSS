import React from 'react';
import '../styles/Header.css'
import logo from '../resource/logo.png'
import { Link } from 'react-router-dom'

function Header() {
  return (
    <header className='headerContainer'>
      <div className='logo'>
        <Link to="/">
          <img src={logo}
               alt='logo'
               style={{
                  width:"100%",
                  height:"100%"
                }}/>
        </Link>
      </div>
      <div>
          <h1 className='mainHeader'>Los Angeles Business Heat Map &amp; Industry Selection Recommendation</h1>
      </div>
      <div className='dataSource'>

        <p>Data Source:  
          <a href="https://data.lacity.org/Administration-Finance/Listing-of-All-Businesses/r4uk-afju" > 
            LOS ANGELES OPEN DATA
          </a>
        </p>

        <p style={{ marginLeft: '72px', display: 'inline-block' }}>
          <a href="https://www.bls.gov/cew/downloadable-data-files.htm" >
            U.S. BUREAU OF LABOR STATISTICS
          </a>
        </p>
        
      </div>
    </header>
  );
}

export default Header;
