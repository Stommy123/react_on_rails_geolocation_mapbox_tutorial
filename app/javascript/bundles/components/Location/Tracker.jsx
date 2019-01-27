import React, { Component } from 'react';
import axios from 'axios';
import { round } from 'lodash';
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

  trackLocation = _ => {
    const { flyTo } = this.props
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
      flyTo({
        coordinates: [data.longitude, data.latitude]
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
        <div id='tracker-container'>
          <p>Current Location</p>
          <p>{round(latitude, 5)}, {round(longitude, 5)}</p>
        </div>
    )
  }
}

export default Tracker
