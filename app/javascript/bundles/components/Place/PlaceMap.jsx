import React, { Component } from 'react';
import mapboxgl from 'mapbox-gl';
import axios from 'axios';
import PlaceList from './PlaceList.jsx';
import PlaceFilter from './PlaceFilter.jsx';
import Tracker from '../Location/Tracker.jsx';
import { mapboxToken, mapStyle, placeLayer, geolocationOptions, loadPosition } from '../../utilities/utils';


class PlaceMap extends Component {
  state = { places: this.props.initialPlaces, visiblePlaces: ['restaurant', 'bar'] }

  async componentDidMount() {
    const position = await loadPosition();
    const { latitude, longitude } = position.coords
    const geoLoc = [longitude, latitude]
    mapboxgl.accessToken = mapboxToken
    const mapOptions = {
      container: this.mapContainer,
      style: mapStyle,
      zoom: 12,
      center: geoLoc
    }
    this.createMap(mapOptions, geolocationOptions)
  }

  createMap = (mapOptions, geolocationOptions) => {
    this.map = new mapboxgl.Map(mapOptions)
    const map = this.map
    map.addControl(new MapboxGeocoder({ accessToken: mapboxToken }))
    map.addControl(new mapboxgl.NavigationControl(), 'top-right')
    map.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: geolocationOptions,
        trackUserLocation: true
      })
    )
    map.on('load',  _ => {
      const { lat, lng } = map.getCenter();
      const { initialPlaces } = this.props
      const icons = {
        restaurant: 'restaurant-15',
        bar: 'bar-15',
      }
      map.addSource( 'places', { type: 'geojson', data: `/places.json?lat=${lat}&lng=${lng}` })
      initialPlaces.forEach(place => {
        const placeType = place.properties.place_type
        if (!map.getLayer(placeType)) {
          map.addLayer({
            id: placeType,
            type: 'symbol',
            source: 'places',
            layout: {
              'icon-image': icons[placeType],
              'icon-allow-overlap': true
            },
            filter: ['==', 'place_type', placeType]
          })
          map.on('click', placeType, e => {
            const { properties, geometry } = e.features[0]
            const coordinates = geometry.coordinates.slice()
            const { name, id, address } = properties
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
          map.on('mouseenter', placeType, _ => {
            map.getCanvas().style.cursor = 'pointer'
          })
          map.on('mouseleave', placeType, _ => {
            map.getCanvas().style.cursor = String()
          })
        }
      })
      map.on('moveend', _ => this.fetchPlaces())
    })
  }

  fetchPlaces = async _ => {
    const map = this.map
    const { lat, lng } = map.getCenter();
    const { data, data: { features } } = await axios.get(`/places.json?lat=${lat}&lng=${lng}`)
    map.getSource('places').setData(data)
    let { places } = this.state
    places = features.map(place => {
      const { properties: { id, name, address } } = place
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

  filterPlaces = placeType => e => {
    console.log(placeType)
    let { visiblePlaces } = this.state
    console.log(visiblePlaces)
    const map = this.map.setLayoutProperty(
      placeType, 'visibility',
      visiblePlaces.includes(placeType) ? 'none' : 'visible'
    )
    const filteredPlaces = visiblePlaces.filter(type => type !== placeType)
    if (visiblePlaces.includes(placeType)) visiblePlaces = filteredPlaces
    else visiblePlaces.push(placeType)
    this.setState({ visiblePlaces })
  }

  componentWillUnmount() { this.map.remove() }

  render() {
    const { places, visiblePlaces } = this.state
    const placeTypes = ['restaurant', 'bar']
    return (
      <div id='placeMap-container'>
        <div id='map-container'>
          <div id='map' ref={el => this.mapContainer = el} />
          <PlaceList places={places} flyTo={this.flyTo} />
          <Tracker flyTo={this.flyTo} />
        </div>
        { placeTypes.map(place => <PlaceFilter key={place} place={place} visiblePlaces={visiblePlaces} filterPlaces={this.filterPlaces} />)}
      </div>
    )
  }
}

export default PlaceMap
