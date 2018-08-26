// google api service that returns longitude latitude
// addresses with those details
// search and timeout for a second returns distance in meters from origin to destination

const addresses = [
  {
    address: 'Avenida Vieira Souto 168 Ipanema, Rio de Janeiro',
    lng: -22.986560,
    lat: -43.199050
  },
  {
    address: 'Rynek Glowny 12, Krakow',
    lng: 50.060417,
    lat: 19.937866
  },
  {
    address: '27 Derb Lferrane, Marrakech',
    lng: 31.651690,
    lat: -8.010330
  },
  {
    address: 'Rua Roberto Simonsen 122, Sao Paulo',
    lng: -23.548154,
    lat: -46.633067
  },
  {
    address: 'swietego Tomasza 35, Krakow',
    lng: 50.061960,
    lat: 19.942430
  },
  {
    address: 'Rue Al-Aidi Ali Al-Maaroufi, Casablanca',
    lng: 35.570330,
    lat: -5.364910
  },
  {
    address: 'Rua tamoana 418, tefe',
    lng: -3.360820,
    lat: -64.721780
  },
  {
    address: 'Zlota 9, Lublin',
    lng: 51.247978,
    lat: 22.569968
  },
  {
    address: 'Riad Sultan 19, Tangier',
    lng: 35.788672,
    lat: -5.814578
  },
  {
    address: 'atlas marina beach, agadir',
    lng: 30.422394,
    lat: -9.618809
  },
  {
    address: '10 Downing st. London',
    lng: 51.503363,
    lat: -0.127625
  }
]

const getGeolocation = addressToFind => addresses.find(address => address.address === addressToFind)

const rad = x => x * Math.PI / 180

const getDistance = (p1, p2) => {
  const R = 6378137 // Earth’s mean radius in meter
  const dLat = rad(p2.lat - p1.lat)
  const dLong = rad(p2.lng - p1.lng)
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(rad(p1.lat)) * Math.cos(rad(p2.lat)) *
    Math.sin(dLong / 2) * Math.sin(dLong / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  const d = R * c
  return Math.round(d) // returns the distance in meter
}

const getDistances = (origin, destinations) => {
  const destinationsGeoLocations = destinations.map(getGeolocation)
  const originGeoLocation = getGeolocation(origin)

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const distances = destinationsGeoLocations.map(destination => ({
        address: destination.address,
        distance: getDistance(originGeoLocation, destination)
      })) 
      resolve(distances)
    }, 1000)
  })
}

export default getDistances