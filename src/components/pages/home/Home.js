import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import sunLogo from '../../../assets/images/01d.png'

import './Home.css'

class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <>
                <div id="homeMain">
                    <div id="logo-with-sun" className="border-box">
                        <h1 className="suntastic-font">Suntastic</h1>
                        <img id="sun-img" src={sunLogo} alt="logo suntastic"/>
                    </div>
                    <div className="border-box">
                        <Link className="white-button" to="/weather" >Entrar</Link>
                    </div>
                </div>
            </>
        )
    }
}

export default Home