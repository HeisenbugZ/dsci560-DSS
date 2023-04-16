import React from 'react';
import '../styles/Header.css'
import logo from '../resource/logo.png'


function Header() {
  return (
    <header className='headerContainer'>
      {/* <div className='headerContainer'> */}
        <div className='logo'>
          <img src={logo} alt='logo'style={{
                    width:"100%",
                    height:"100%"
                    }}/>
        </div>
        <div>
            <h1 className='mainHeader'>Los Angeles Business Heat Map &amp; Industry Selection Recommendation</h1>
            {/* <p>Some description about the application.</p> */}
        </div>
        <div className='dataSource'>
          <p>Data Source: data.lacity.org</p>
        </div>
      {/* </div> */}
    </header>
  );
}

export default Header;
