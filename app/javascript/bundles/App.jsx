import React from 'react';
import axios from 'axios';
import PlaceForm from './components/Place/PlaceForm.jsx';
import PlaceMap from './components/Place/PlaceMap.jsx';
import { headers } from './utilities/utils';

const App = _ => {
  const createPlace = async p => await axios.post(
    '/places',
    { place: { ...p } },
    { headers: headers }
  )
    return (
      <div id='place-container'>
        <PlaceMap />
        <PlaceForm createPlace={this.createPlace} />
      </div>
    )
}

export default App
