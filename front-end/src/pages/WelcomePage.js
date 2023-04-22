import React from 'react';
import { Link } from 'react-router-dom'
// import smile from '../resource/smile.png';
import welcome from '../resource/welcome2.png'

export default function Welcome() {
    return(
        <div style={{ display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      height: '100vh' ,
                      width: '100%',
                      backgroundColor: '#f4f0e8'}}>
            <Link to="/map">
                <img src={welcome} alt='logo' style={{
                    width:"100%",
                    height:"100vh"
                    }}/>
            </Link>
        </div>
        
    )
    
}