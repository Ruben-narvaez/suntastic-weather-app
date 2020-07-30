import React from 'react'
import './Footer.css'
import sunLogo from '../../assets/images/sun.png'

const Footer = () => {
    return (
        <div id="footer">
            <div className="footerLogo">
                <h1 className="suntastic-font">Suntastic</h1>
                <img id="sun-img" src={sunLogo} alt="logo suntastic" />
            </div>
            <div className="footerText">
                <div className="attribution">Sun icon made by <a href="https://www.flaticon.com/authors/good-ware" title="Good Ware">Good Ware</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
                <h5>&copy; Rubén Narváez </h5>
            </div>
        </div>
    )
}

export default Footer