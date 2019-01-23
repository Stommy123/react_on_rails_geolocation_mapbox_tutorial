import React, { Component } from 'react';
import axios from 'axios'
import { headers, geolocationOptions } from '../../utilities/utils';


class Tracker extends Component {
  state = { latitude: 0, longitude: 0 }

  componentDidMount() {
    this.trackLocation()
    this.interval = setInterval(this.trackLocation, 60000)
    window.addEventListener('beforeunload', this.handleLeavePage)
  }

  componentWillUnMount = _ => {
    window.removeEventListener('beforeunload', this.handleLeavePage)
    clearInterval(this.interval)
  }

  handleLeavePage = _ => {
    clearInterval(this.interval)
    axios.post(
      '/locations',
      { location: { latitude: null, longitude: null } },
      { headers: headers },
    )
  }

  handleHome = _ => Turbolinks.visit('/');

  trackLocation = _ => {
    const success = async pos => {
      const { latitude, longitude } = pos.coords
      const { data } = await axios.post(
        '/locations',
        { location: { latitude, longitude } },
        { headers: headers },
      )
      this.setState({
        latitude: data.latitude,
        longitude: data.longitude
      })
    }
    const error = err => console.log(`Error(${err.code}): ${err.message}`)
    navigator.geolocation.getCurrentPosition(success, error, geolocationOptions)
  }
  render() {
    const { latitude, longitude } = this.state
    const locFound = latitude !== 0 && longitude !== 0
    return (
       locFound &&
        <div>
          <button onClick={this.handleHome}>Home</button>
          <p>You are calling from {latitude}, {longitude}</p>
         </div>
    )
  }
}

export default Tracker
