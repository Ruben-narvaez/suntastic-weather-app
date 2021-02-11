import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import sunLogo from '../../../assets/images/01d.png'

import './NoLocation.css'


class NoLocation extends Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <section className="no-location-main">
                    <div className="no-location-display">
                        <h1 className="suntastic-font-no-animated">Suntastic</h1>
                        <img className="sun-no-located" src={sunLogo} alt="logo suntastic"/>
                    </div>
                    <div className="no-location-display display-text-nolocation text-appear">
                        <h4>Sin tu consetimiento no podemos acceder a tu ubicación</h4> 
                        <h5>Te recordamos que sólo la utilizaremos para consultar los datos climatológicos</h5>
                    </div>      
            </section>
        )
    }
}

export default NoLocation