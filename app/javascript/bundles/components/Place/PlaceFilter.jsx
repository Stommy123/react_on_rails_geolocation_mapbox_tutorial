import React from 'react';

const PlaceFilter = ({ place, visiblePlaces, filterPlaces }) => {
  const placeVisible = p => visiblePlaces.includes(p)
  return (
    <button
      onClick={filterPlaces(place)}
      style={{ backgroundColor: placeVisible(place) ? '#77C6F8' : '#EF9144' }}>
    {place}
  </button>
  )
}

export default PlaceFilter;
