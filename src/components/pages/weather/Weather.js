import React, { Component } from 'react'
import { Link, location } from 'react-router-dom'
import { Line, Radar, Bar } from 'react-chartjs-2';

import { motion } from "framer-motion";
import { slideAnimation } from '../../../animations/animations'

import './Weather.css'
import dawnImg from '../../../assets/images/salida-del-sol.png'
import sunsetImg from '../../../assets/images/puesta-del-sol.png'

class Weather extends Component {

    constructor(props) {
        super(props)

        this.state = {
            chartTemp: {
                labels: this.props.hourlyInfo.slice(0, 24).map(elm => this.showHours(elm.dt)),
                datasets: [
                    {
                        label: 'Grados',
                        data: this.props.hourlyInfo.slice(0, 24).map(elm => elm.temp),
                        lineTension: 0,
                        borderWidth: 1.5,
                        borderColor: 'rgb(255, 219, 77, 0.632)',
                        lineJoin: 'round',
                        pointRadius: 1.5,
                        backgroundColor: 'rgb(255, 219, 77, 0.232)',
                        lineCap: 'round',
                    }
                ]
            },
            chartWind: {
                labels: this.props.hourlyInfo.slice(0, 24).map(elm => this.showHours(elm.dt)),
                datasets: [
                    {
                        label: 'Velocidad',
                        data: this.props.hourlyInfo.slice(0, 24).map(elm => elm.wind_speed),
                        lineTension: 0,
                        borderWidth: 1,
                        borderColor: 'rgb(77, 255, 121, 0.632)',
                        lineJoin: 'round',
                        pointRadius: 1.5,
                        backgroundColor: 'rgb(77, 255, 121, 0.232)',
                        lineCap: 'round',
                    }
                ]
            },
            chartHumidity: {
                labels: this.props.hourlyInfo.slice(0, 24).map(elm => this.showHours(elm.dt)),
                datasets: [
                    {
                        label: 'Humedad',
                        data: this.props.hourlyInfo.slice(0, 24).map(elm => elm.humidity),
                        borderWidth: 1,
                        borderColor: 'rgb(0, 64, 255, 0.632)',
                        backgroundColor: 'rgb(0, 64, 255, 0.232)',
                        hoverBackgroundColor: 'rgba(255, 255, 255, 0.432)',
                    }
                ]
            }
        }
    }

    showHours(unix) {
        const hours = new Date(unix * 1000).getHours()
        return hours
    }

    showMinutes(unix) {
        const minutes = new Date(unix * 1000).getMinutes()
        return minutes
    }

    capitalizeFirst(phrase) {
        return phrase.charAt(0).toUpperCase() + phrase.slice(1)
    }

    getMonthName(unix) {
        const monthName = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
        let i = new Date(unix * 1000).getMonth()
        return monthName[i]
    }

    getDayOfTheWeek(unix) {
        const weekDays = ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sábado']
        let i = new Date(unix * 1000).getDay()
        return weekDays[i]
    }

    getDay(unix) {
        let dayOfMonth = new Date(unix * 1000).getDate()
        return dayOfMonth
    }

    componentDidMount = () => {
    }

    render() {

        const { weatherInfo, weekDay, monthDay } = this.props

        return (
            
            <motion.div
                initial="out"
                animate="end"
                exit="out"
                variants={slideAnimation}
            >
                {(typeof weatherInfo != 'undefined') && (
                    <div id="weather-page">
                        <div className="title-div">
                            <h2>{weekDay}, {monthDay} {this.getMonthName(weatherInfo.current.dt)}</h2>
                            <h4>Zona horaria</h4>
                            <h4>{weatherInfo.timezone}</h4>
                        </div>
                        <div className='responsive-flex center'>
                            <div className='center responsive-width little-margin'>
                                <article className='display-vertical-separation'>
                                    <div className="firstDiv">
                                        <div className="center principalInfo">
                                            <div className="weather-display">
                                                <div className="weather-div">
                                                    <h3 className="temperature">{Math.round(weatherInfo.current.temp)}º</h3>
                                                    <h4>Sensación térmica: {Math.round(weatherInfo.current.feels_like)}º</h4>
                                                </div>
                                                <div className="iconDiv">
                                                    <img src={require(`../../../assets/images/${weatherInfo.current.weather[0].icon}.png`).default} alt={weatherInfo.current.weather[0].description} />
                                                    <p className="firstPar">{this.capitalizeFirst(weatherInfo.current.weather[0].description)}</p>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                    <div className="full-width">
                                        <div className="width-problems box border-square center">
                                            <div className='flexRow'>
                                                <img src={require('../../../assets/images/temperaturas.png').default} alt='termometro' />
                                                <h4>{Math.round(weatherInfo.daily[0].temp.max)}º - {Math.round(weatherInfo.daily[0].temp.min)}º</h4>
                                            </div>
                                            <div className="flexRow">
                                                <img src={require('../../../assets/images/humidity.png').default} alt='humedad' />
                                                <h4>Humedad: {weatherInfo.current.humidity}%</h4>
                                            </div>
                                            <div className='flexRow'>
                                                <img src={require('../../../assets/images/50d.png').default} alt='viento' />
                                                <h4>Viento: {(weatherInfo.current.wind_speed * 3.6).toFixed(1)} Km/h</h4>
                                            </div>
                                            <div className='flexRow'>
                                                <img src={require('../../../assets/images/03d.png').default} alt='nubes' />
                                                <h4>Nubes: {weatherInfo.current.clouds}%</h4>
                                            </div>
                                        </div>

                                        <div className="width-problems box center border-square">
                                            <div className="dawnDiv">
                                                <img src={dawnImg} alt='amanecer' />
                                                <h4>{this.showHours(weatherInfo.current.sunrise) < 10 ? '0' + this.showHours(weatherInfo.current.sunrise) : this.showHours(weatherInfo.current.sunrise)}:{this.showMinutes(weatherInfo.current.sunrise) < 10 ? '0' + this.showMinutes(weatherInfo.current.sunrise) : this.showMinutes(weatherInfo.current.sunrise)}</h4>
                                            </div>
                                            <div className="dawnDiv">
                                                <img src={sunsetImg} alt='puesta de sol' />
                                                <h4>{this.showHours(weatherInfo.current.sunset) < 10 ? '0' + this.showHours(weatherInfo.current.sunset) : this.showHours(weatherInfo.current.sunset)}:{this.showMinutes(weatherInfo.current.sunset) < 10 ? '0' + this.showMinutes(weatherInfo.current.sunset) : this.showMinutes(weatherInfo.current.sunset)}</h4>
                                            </div>
                                        </div>
                                    </div>
                                </article>
                            </div>
                            <div className="full-width ">
                                <article className='center box border-square charts-div'>
                                    <h2>Próximas horas</h2>
                                    <figure className='center temp-chart'>
            
                                        <Line
                                            data={this.state.chartTemp}
                                            width={300}
                                            height={220}
                                            options={{
                                                maintainAspectRatio: false,
                                                scales: {
                                                    xAxes: [{
                                                        gridLines: {
                                                            display: false,
                                                        },
                                                        ticks: {
                                                            fontColor: 'rgba(255, 255, 255, 0.832)',
                                                            maxTicksLimit: 8,
                                                            padding: 5,
                                                            callback: function (value, index, values) {
                                                                if (value < 10) {
                                                                    value = '0' + value
                                                                }
                                                                return value + ' h'
                                                            }
                                                        }
                                                    }],
                                                    yAxes: [{
                                                        gridLines: {
                                                            color: 'rgba(255, 255, 255, 0.232)',
                                                            lineWidth: 1,
                                                            tickMarkLength: 0,
                                                        },
                                                        ticks: {
                                                            fontColor: 'rgba(255, 255, 255, 0.832)',
                                                            maxTicksLimit: 6,
                                                            padding: 5,
                                                            callback: function (value, index, values) {
                                                                return value + 'º';
                                                            }
                                                        }
                                                    }]
                                                },
                                                title: {
                                                    display: true,
                                                    text: 'Temperatura',
                                                    fontStyle: 'Montserrat',
                                                    fontColor: 'rgba(255, 255, 255)',
                                                },
                                                legend: {
                                                    display: false,
                                                }
                                            }}
                                        />
                                    </figure>
                                    
                                    <figure className='humidity-chart'>
                                        <Bar
                                            data={this.state.chartHumidity}
                                            width={300}
                                            height={180}
                                            options={{
                                                maintainAspectRatio: false,
                                                title: {
                                                    display: true,
                                                    text: 'Humedad',
                                                    fontStyle: 'Montserrat',
                                                    fontColor: 'rgba(255, 255, 255)',
                                                },
                                                legend: {
                                                    display: false,
                                                },
                                                scales: {
                                                    xAxes: [{
                                                        gridLines: {
                                                            display: false,
                                                        },
                                                        ticks: {
                                                            fontColor: 'rgba(255, 255, 255, 0.832)',
                                                            maxTicksLimit: 8,
                                                            padding: 5,
                                                            callback: function (value, index, values) {
                                                                if (value < 10) {
                                                                    value = '0' + value
                                                                }
                                                                return value + ' h'
                                                            }
                                                        }
                                                    }],
                                                    yAxes: [{
                                                        gridLines: {
                                                            color: 'rgba(255, 255, 255, 0.232)',
                                                            lineWidth: 1,
                                                            tickMarkLength: 0,
                                                        },
                                                        ticks: {
                                                            fontColor: 'rgba(255, 255, 255, 0.832)',
                                                            maxTicksLimit: 6,
                                                            padding: 5,
                                                            callback: function (value, index, values) {
                                                                return value + '%';
                                                            }
                                                        }
                                                    }]
                                                },
                                            }}
                                        />
                                    </figure>

                                    <figure className='wind-chart'>
                                        <Radar
                                            data={this.state.chartWind}
                                            width={450}
                                            height={300}
                                            options={{
                                                maintainAspectRatio: false,
                                                title: {
                                                    display: true,
                                                    text: 'Viento',
                                                    fontStyle: 'Montserrat',
                                                    fontColor: 'rgba(255, 255, 255)',
                                                },
                                                legend: {
                                                    display: false,
                                                },
                                                scale: {
                                                    gridLines: {
                                                        color: 'rgba(255, 255, 255, 0.232)',
                                                    },
                                                    angleLines: {
                                                        color: 'rgba(255, 255, 255, 0.232)',
                                                    },
                                                    pointLabels: {
                                                        fontColor: 'rgba(255, 255, 255, 0.832)',
                                                        fontFamily: 'Montserrat',
                                                        callback: function (value, index, values) {
                                                            if (value < 10) {
                                                                value = '0' + value
                                                            }
                                                            if (value % 2 === 0) {
                                                                return value + ' h'
                                                            }
                                                        }
                                                    },
                                                    ticks: {
                                                        display: true,
                                                        showLabelBackdrop: false,
                                                        backdropPaddingX: 3,
                                                        stepSize: 2,
                                                        beginAtZero: true,
                                                        fontColor: 'rgba(255, 255, 255, 0.832)',
                                                        fontFamily: 'Montserrat',
                                                        backgroundColor: 'red',
                                                        callback: function (value, index, values) {
                                                            return value + ' km/h';
                                                        },
                                                    }
                                                }
                                            }}
                                        />
                                    </figure>
                                </article>
                            </div>
                        </div>

                        <article className="center border-square bottom-box">
                            <h2>Próximos días</h2>
                            <div className="other-days">
                                {weatherInfo.daily.slice(1).slice(0, -1).map((elm, idx) =>
                                    <Link key={idx} className="daily-link" to={`/daily-weather-${this.getDayOfTheWeek(elm.dt)}`}>
                                        {<div className="weather-days">{<div><img src={require(`../../../assets/images/${elm.weather[0].icon}.png`).default} alt="daily icon" /></div>}
                                            {<div><h4>{this.getDayOfTheWeek(elm.dt)} {this.getDay(elm.dt)}</h4><h5>{this.capitalizeFirst(elm.weather[0].description)}</h5><h5>Max: {Math.round(elm.temp.max)}º min: {Math.round(elm.temp.min)}º</h5> </div>}
                                        </div>}
                                    </Link>)}
                            </div>
                        </article>

                    </div>
                )}
            </motion.div>

        )
    }
}

export default Weather