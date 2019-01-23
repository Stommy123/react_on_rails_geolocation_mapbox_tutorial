import React, { Component } from 'react';
import mapboxgl from 'mapbox-gl';
import axios from 'axios';
import { mapboxToken, placeLayer, geolocationOptions, loadPosition } from '../../utilities/utils';


class PlaceMap extends Component {
  state = { places: [] }

  async componentDidMount() {
    const position = await loadPosition();
    const geoLoc = [position.coords.longitude, position.coords.latitude]
    mapboxgl.accessToken = mapboxToken
    const mapOptions = {
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/streets-v9',
      zoom: 12,
      center: geoLoc
    }
    await this.createMap(mapOptions, geolocationOptions)
  }

  createMap = (mapOptions, geolocationOptions) => {
    this.map = new mapboxgl.Map(mapOptions)
    const map = this.map
    map.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: geolocationOptions,
        trackUserLocation: true
      })
    )
    map.addControl(new mapboxgl.NavigationControl(), 'top-right')
    map.on('load',  event => {
      map.addSource( 'places', { type: 'geojson', data: '/places.json' })
      map.addLayer(placeLayer)
      map.on('click', 'places', e => {
        const { properties, geometry } = e.features[0]
        const coordinates = geometry.coordinates.slice()
        const name = properties.name
        const id = properties.id
        const address = properties.address
        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
          coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360
        }
        new mapboxgl.Popup()
          .setLngLat(coordinates)
          .setHTML(`
            <div id='popup'>
              <a href='/places/${id}'>${name}</a>
              <p>${address}</p>
            </div>
            `)
          .addTo(map)
      })
      this.fetchPlaces()
      map.on('moveend', _ => this.fetchPlaces())
    })
  }

  fetchPlaces = async _ => {
    const map = this.map
    const { data, data: { features } } = await axios.get('/places.json')
    map.getSource('places').setData(data)
    let { places } = this.state
    places = features.map(place => {
      const { properties: { id, name, address} } = place
      const { geometry: { coordinates } } = place
      return { id, name, address, coordinates }
    })
    this.setState({ places })
  }

  flyTo = loc => {
      this.map.flyTo({
        center: [loc.coordinates[0], loc.coordinates[1]],
        bearing: 20,
        zoom: 12,
        pitch: 20
      })
  }

  componentWillUnmount() { this.map.remove() }

  render() {
    const { places } = this.state
    return (
      <div id='map-container'>
        <div id='map' ref={el => this.mapContainer = el} />
        <div id='list'>
            {places.map(place => (
              <div key={place.id} onClick={ _ => this.flyTo(place)}>
                <h6>Name: {place.name}</h6>
                <h6>Address: {place.address}</h6><hr />
              </div>
            ))}
        </div>
      </div>
    )
  }
}

export default PlaceMap
