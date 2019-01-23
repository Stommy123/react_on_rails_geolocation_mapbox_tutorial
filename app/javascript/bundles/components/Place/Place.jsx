import React, { Component } from 'react';
import axios from 'axios';
import PlaceForm from './PlaceForm.jsx';
import PlaceMap from './PlaceMap.jsx';
import { headers } from '../../utilities/utils';

class Place extends Component {
  handleHome = _ => Turbolinks.visit('/')
  createPlace = async p => await axios.post(
    '/places', { place: { ...p } }, { headers: headers }
  )

  render() {
    return (
      <div id='place-container'>
        <button onClick={this.handleHome}>Home</button>
        <PlaceMap />
        <PlaceForm createPlace={this.createPlace} />
      </div>
    )
  }
}

export default Place
