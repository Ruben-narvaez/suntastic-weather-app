import React from 'react'
import sunLogo from '../../assets/images/sun.png'

import './Navbar.css'

const Navbar = () => {
    return (
        <div id="navBar" className="border-box">
            <h2 className="suntastic-font-navbar">Suntastic</h2>
            <img className="sun-img-navbar" src={sunLogo} alt="logo suntastic" />
        </div>
    )
}

export default Navbar