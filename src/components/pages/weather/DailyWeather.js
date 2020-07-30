import React, { Component } from 'react'
import dawnImg from '../../../assets/images/salida-del-sol.png'
import sunsetImg from '../../../assets/images/puesta-del-sol.png'
import { Link } from 'react-router-dom'
import './DailyWeather.css'

class DailyWeather extends Component {

    constructor(props) {
        super(props)

        this.state = {
        }
        
        this.goBack = this.goBack.bind(this)
    }

    showHours(unix) {
        const hours = new Date(unix * 1000).getHours()
        return hours
    }

    showMinutes(unix) {
        let minutes = new Date(unix * 1000).getMinutes()
        return minutes
    }

    capitalizeFirst(phrase) {
        return phrase.charAt(0).toUpperCase() + phrase.slice(1)
    }

    goBack() {
        this.props.history.goBack();
    }

    render() {

        const { dailyInfo, weekDay, monthDay, timeZone } = this.props

        return (

            <section >
                {(typeof this.props != 'undefined') && (
                    <div>
                        <article className="daily-weather-body">
                            <div className="center principalInfo">
                                <h2>{weekDay} {monthDay}</h2>
                                <h4>{timeZone}</h4>
                                <br></br>
                                <h2 className="daily-temp temperature">{Math.round(dailyInfo.temp.max)}º/{Math.round(dailyInfo.temp.min)}º</h2>
                                <h5>max / min</h5>
                                <div className="iconDiv">
                                    <img src={require(`../../../assets/images/${dailyInfo.weather[0].icon}.png`)} alt="icono diario" />
                                    <p>{this.capitalizeFirst(dailyInfo.weather[0].description)}</p>
                                </div>
                            </div>
                            <div className="width-problems box center border-square daily-width">
                                <div className="flexRow">
                                    <img src={require('../../../assets/images/humidity.png')} alt='humedad' />
                                    <h4>Humedad: {dailyInfo.humidity}%</h4>
                                </div>
                                <div className='flexRow'>
                                    <img src={require('../../../assets/images/50d.png')} alt='viento' />
                                    <h4>Viento: {(dailyInfo.wind_speed * 3.6).toFixed(1)} Km/h</h4>
                                </div>
                                <div className='flexRow'>
                                    <img src={require('../../../assets/images/03d.png')} alt='nubes' />
                                    <h4>Nubes: {dailyInfo.clouds}%</h4>
                                </div>
                            </div>
                            <div className="width-problems box center border-square daily-width">
                                <div className="dawnDiv">
                                    <img src={dawnImg} alt='amanecer' />
                                    <h4>{this.showHours(dailyInfo.sunrise) < 10 ? '0' + this.showHours(dailyInfo.sunrise) : this.showHours(dailyInfo.sunrise)}:{this.showMinutes(dailyInfo.sunrise) < 10 ? '0' + this.showMinutes(dailyInfo.sunrise) : this.showMinutes(dailyInfo.sunrise)}</h4>
                                </div>
                                <div className="dawnDiv">
                                    <img src={sunsetImg} alt='puesta de sol' />
                                    <h4>{this.showHours(dailyInfo.sunset) < 10 ? '0' + this.showHours(dailyInfo.sunset) : this.showHours(dailyInfo.sunset)}:{this.showMinutes(dailyInfo.sunset) < 10 ? '0' + this.showMinutes(dailyInfo.sunset) : this.showMinutes(dailyInfo.sunset)}</h4>
                                </div>
                            </div>
                            <div className='border-box'>
                                <Link className='go-back-button' to="/weather" >Volver</Link>
                            </div>
                        </article>
                    </div>
                )}
            </section>
        )
    }
}

export default DailyWeather