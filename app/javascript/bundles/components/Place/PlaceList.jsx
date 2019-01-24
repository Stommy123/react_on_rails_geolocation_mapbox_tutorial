import React from 'react';
import Place from './Place.jsx';

const PlaceList = ({ places, flyTo }) => (
  <div id='list-container'>
    { places.map(place => <Place key={place.id} place={place} flyTo={flyTo} />) }
  </div>
)

export default PlaceList;
