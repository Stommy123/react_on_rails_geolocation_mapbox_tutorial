import React from 'react';

const Place = ({ place, flyTo }) => (
  <div key={place.id} onClick={ _ => flyTo(place)}>
    <h6>{place.name}</h6>
    <h6>{place.address}</h6><hr />
  </div>
)

export default Place;
