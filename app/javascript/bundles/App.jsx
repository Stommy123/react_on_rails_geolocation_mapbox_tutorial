import React, { Component } from 'react';

const App = _ => {
  const handleTracker = _ => Turbolinks.visit('/locations')
  const handleMap = _ => Turbolinks.visit('/places')
  return (
    <div>
      <h1>HELLO WORLD</h1>
      <button onClick={handleTracker}>Tracker</button>
      <button onClick={handleMap}>Map</button>
    </div>
  )
}

export default App
