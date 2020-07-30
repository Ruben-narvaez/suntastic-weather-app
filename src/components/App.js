import React, { Component } from 'react'

// import Footer from './ui/Footer'
import axios from 'axios'

import './App.css'

import { Switch, Route } from 'react-router-dom'

import Home from './pages/home/Home'
import Weather from './pages/weather/Weather'
import DailyWeather from './pages/weather/DailyWeather'

const weatherApi = {
  base: `https://api.openweathermap.org/data/2.5/`,
  key: process.env.REACT_APP_WEATHER_API_KEY
}

class App extends Component {

  constructor(props) {
    super(props)

    this.state = {
      lat: 0,
      long: 0
    }
  }

  getLocationWeather = () => {
    navigator.geolocation.getCurrentPosition((position) => {

      let latitude = position.coords.latitude
      let longitude = position.coords.longitude

      this.setState({
        lat: latitude,
        long: longitude
      })

      axios.get(`${weatherApi.base}onecall?lat=${this.state.lat}&lon=${this.state.long}&lang=sp&appid=${weatherApi.key}&units=metric`)
        .then(response => this.setState({
          info: response.data,
          daily: response.data.daily,
          current: response.data.current,
          hourly: response.data.hourly
        })
        )
        .catch(err => console.log(err))
    })
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

  backgroundHour(currentHour) {
  
    const sunset = this.state.current.sunset
    const dawn = this.state.current.sunrise

    if ((currentHour > sunset - 1800 && currentHour < sunset + 1800) || (currentHour > dawn - 1800 && currentHour < dawn + 1800)) {
      return 'sunsetBackground'
    } else if (currentHour > dawn && currentHour <= sunset) {
      return 'dayBackground'
    } else if (currentHour > sunset || currentHour <= dawn) {
      return 'nightBackground'
    }
  }

  componentDidMount() {
    this.getLocationWeather()
  }

  render() {
    
    return (
      <>
        {(typeof this.state.current != 'undefined') && (
          <main className={`viewPort ${this.backgroundHour(this.state.current.dt)}`}>

            <Switch>
              <Route path='/' exact render={() => <Home />} />
              <Route path='/weather' render={() => <Weather weekDay={this.getDayOfTheWeek(this.state.current.dt)} monthDay={this.getDay(this.state.current.dt)} weatherInfo={this.state.info} hourlyInfo={this.state.hourly} />} />
              {this.state.daily && this.state.daily.map((elm, idx) => <Route key={idx} path={`/daily-weather-${this.getDayOfTheWeek(elm.dt)}`} render={() => <DailyWeather weekDay={this.getDayOfTheWeek(elm.dt)} monthDay={this.getDay(elm.dt)} timeZone={this.state.info.timezone} currentInfo={this.state.current} dailyInfo={this.state.daily[idx]} />} />)}
            </Switch>
            {/* <Footer /> */}

          </main>
        )}
      </>
    );
  }

}

export default App
