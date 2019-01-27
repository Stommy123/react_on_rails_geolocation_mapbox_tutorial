import React, { Component } from 'react';
import axios from 'axios';
import PlaceForm from './components/Place/PlaceForm.jsx';
import PlaceMap from './components/Place/PlaceMap.jsx';
import { headers, headersWithImage } from './utilities/utils';

class App extends Component {
  state = { initialPlaces: [] }
  async componentDidMount() {
    const { data: { features: initialPlaces } } = await axios.get('/places.json')
    this.setState({ initialPlaces })
  }
  createPlace = async p => {
    const formData = new FormData()
    const keys = Object.keys(p)
    keys.forEach(key => formData.append(`place[${key}]`, p[key]))
    await axios.post('/places', formData, { headers: headersWithImage })
  }
  render() {
    const { initialPlaces } = this.state
    return (
      <div id='place-container'>
        <PlaceForm createPlace={this.createPlace} />
        <PlaceMap initialPlaces={initialPlaces} />
      </div>
    )
  }
}


export default App
