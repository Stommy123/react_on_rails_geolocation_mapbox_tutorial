import React, { Component } from 'react';
import axios from 'axios';
import PlaceForm from './components/Place/PlaceForm.jsx';
import PlaceMap from './components/Place/PlaceMap.jsx';
import { headers } from './utilities/utils';

class App extends Component {
  createPlace = async p => {
    console.log(p)
    await axios.post(
      '/places',
      { place: { ...p } },
      { headers: headers }
    )
  }
  render() {
    return (
      <div id='place-container'>
        <PlaceMap />
        <PlaceForm createPlace={this.createPlace} />
      </div>
    )
  }
}


export default App
