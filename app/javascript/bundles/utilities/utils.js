const token = document
              .querySelector('meta[name="csrf-token"]')
              .getAttribute('content')

export const headers = {
  'X-Requested-With': 'XMLHttpRequest',
  'X-CSRF-TOKEN': token
}

export const headersWithImage = {
  'X-Requested-With': 'XMLHttpRequest',
  'X-CSRF-TOKEN': token,
  'content-type': 'multipart/form-data'
}

export const mapboxToken = 'pk.eyJ1IjoiYW5keXdlaXNzMTk4MiIsImEiOiJIeHpkYVBrIn0.3N03oecxx5TaQz7YLg2HqA'

export const mapStyle = 'mapbox://styles/mapbox/streets-v9'

export const geolocationOptions = {
  enableHighAccuracy: true,
  maximumAge: 30000,
  timeout: 27000
}

export const placeLayer = {
  id: 'places',
  type: 'symbol',
  source: 'places',
  layout: { 'icon-image': 'restaurant-15', 'icon-allow-overlap': true }
}

export const loadPosition = async _ => {
  try {
    const position = await getCurrentPosition()
    return position
  }
  catch (error) { console.log(error) }
}

const getCurrentPosition = _ => new Promise((res, rej) => (
  navigator.geolocation.getCurrentPosition(res, rej))
)
