/* eslint-disable no-undef */
import React, { PureComponent } from 'react'
import { capitalData, provinceData } from './_dependencies/locations'
import Markers from './_dependencies/markers'

const classes = {
  concessionaires: 'concessionaires w-full position-relative',
  arrow: 'concessionaires__arrow w-0 h-0 position-absolute border-solid',
  container: 'concessionaires__container w-full m-0 mx-auto pr-20 pl-20',
  title: 'concessionaires__title text-center font-bold title-lg text-gray-300',
  info: `concessionaires__info text-gray-300 text-center mt-10 mb-10 lg:mb-40 mx-auto text-sm line-h-md`,
  locations: `concessionaires__locations border-gray pt-25 border-t-1 border-solid lg:pt-0`,
  search: 'concessionaires__search flex mb-20 flex-col lg:flex-row',
  searchTitle: `concessionaires__search-title text-gray-300 uppercase font-bold text-center pt-15 pr-20 pl-20 text-sm mb-20 lg:mb-0 lg:text-left line-h-xs`,
  form: 'flex',
  zona: 'concessionaires__controls flex flex-col md:flex-row mr-15 lg:w-full',
  label:
    'concessionaires__label text-md flex items-center justify-center mb-10 md:mb-0',
  select: 'concessionaires__select pl-15 bg-white md:w-full',
  district: 'concessionaires__controls flex flex-col md:flex-row lg:w-full',
  districtLabel:
    'concessionaires__label text-md flex items-center justify-center mb-10 md:mb-0',
  mapTitle: `concessionaires__map-title text-gray-300 font-thin mt-10 mb-10 title-sm`,
}

class StaticConcessionaryOffices extends PureComponent {
  constructor(props) {
    super(props)
    this.provinceMap = false
    this.capitalMap = false
    this.currentCapitalMarkers = []
    this.currentProvinceMarkers = []
    this.state = {
      currentZone: {
        name: '',
        value: '',
        districts: capitalData[capitalData.length - 1].districts,
      },
      currentDistrict: {
        name: '',
        value: '',
      },
      currentProvince: {
        name: '',
        value: '',
      },
    }
  }

  componentWillMount() {
    this.getGoogleMaps()
  }

  componentDidMount() {
    this.getGoogleMaps().then(() => {
      this.initMap()
    })
  }

  getGoogleMaps() {
    if (!this.googleMapsPromise) {
      this.googleMapsPromise = new Promise(resolve => {
        window.resolveGoogleMapsPromise = () => {
          resolve('google')
          delete window.resolveGoogleMapsPromise
        }
        const script = document.createElement('script')
        script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBbwx4nd6vinEmC5nvaRt2GvwuOcktW_1E&callback=resolveGoogleMapsPromise`
        script.async = true
        document.head.appendChild(script)
      })
    }
    return this.googleMapsPromise
  }

  initMap = () => {
    this.initCapitalMap()
    this.initProvinceMap()
  }

  initCapitalMap = () => {
    this.capitalMap = new google.maps.Map(
      document.getElementById('concessionaries-map'),
      {
        center: new google.maps.LatLng(-12.055345316962327, -77.04518530000001),
        zoom: 12,
      }
    )
    const auxMarkers = []
    let infowindow = ''
    capitalData.forEach(zone => {
      zone.districts.forEach(dist => {
        Markers[dist.value].forEach(provMarker => {
          const currentMarker = this.generateMarker(provMarker, this.capitalMap)
          infowindow = this.generateInfoWindow(provMarker)
          currentMarker.addListener('click', () => {
            infowindow.open(this.provinceMap, currentMarker)
          })
          auxMarkers.push(currentMarker)
        })
      })
    })
    this.currentCapitalMarkers = auxMarkers
  }

  initProvinceMap = () => {
    this.provinceMap = new google.maps.Map(
      document.getElementById('concessionaries-map2'),
      {
        center: new google.maps.LatLng(-9.31490900980779, -74.99041654999996),
        zoom: 5,
      }
    )
    const auxMarkers = []
    let infowindow = ''
    provinceData.forEach(prov => {
      Markers[prov.value].forEach(provMarker => {
        const currentMarker = this.generateMarker(provMarker, this.provinceMap)
        infowindow = this.generateInfoWindow(provMarker)
        currentMarker.addListener('click', () => {
          infowindow.open(this.provinceMap, currentMarker)
        })
        auxMarkers.push(currentMarker)
      })
    })
    this.currentProvinceMarkers = auxMarkers
  }

  clearMarkers = markers => {
    for (let i = 0; i < markers.length; i++) {
      markers[i].setMap(null)
    }
  }

  generateMarker = (markerData, map) => {
    return new google.maps.Marker({
      position: { lat: markerData.lat, lng: markerData.lng },
      map,
      title: markerData.title,
      icon: markerData.icon,
    })
  }

  generateInfoWindow = markerData => {
    return new google.maps.InfoWindow({
      content: markerData.infoWindow.content,
    })
  }

  handleZoneChange(e) {
    const { value } = e.target

    const location = capitalData.filter(loc => loc.value === value)

    this.setState({
      currentZone: location[0],
      currentDistrict: {
        name: '',
        value: '',
      },
    })
  }

  handleDistrictChange(e) {
    this.clearMarkers(this.currentCapitalMarkers)

    const { value } = e.target
    const { currentZone } = this.state

    const location = currentZone.districts.filter(loc => loc.value === value)

    const auxMarkers = []
    let infowindow = ''
    Markers[value].forEach(provMarker => {
      const currentMarker = this.generateMarker(provMarker, this.capitalMap)
      infowindow = this.generateInfoWindow(provMarker)
      currentMarker.addListener('click', () => {
        infowindow.open(this.provinceMap, currentMarker)
      })
      auxMarkers.push(currentMarker)
    })
    this.currentCapitalMarkers = auxMarkers
    this.setState({
      currentDistrict: location[0],
    })
  }

  handleProvinceChange(e) {
    this.clearMarkers(this.currentProvinceMarkers)

    const { value } = e.target

    const province = provinceData.filter(prov => prov.value === value)

    const auxMarkers = []
    let infowindow = ''
    Markers[value].forEach(provMarker => {
      const currentMarker = this.generateMarker(provMarker, this.provinceMap)
      infowindow = this.generateInfoWindow(provMarker)
      currentMarker.addListener('click', () => {
        infowindow.open(this.provinceMap, currentMarker)
      })
      auxMarkers.push(currentMarker)
    })
    this.currentProvinceMarkers = auxMarkers
    this.setState({
      currentProvince: province[0],
    })
  }

  render() {
    const { currentZone, currentDistrict, currentProvince } = this.state
    return (
      <div className={classes.concessionaires}>
        <span className={classes.arrow} />
        <div className={classes.container}>
          <h1 className={classes.title}>Oficinas Concesionarias</h1>
          <p className={classes.info}>
            Para conocer el listado de oficinas concesionarias seleccione en el
            mapa su ubicación
          </p>
          <div className={classes.locations}>
            <div className={classes.search}>
              <h3 className={classes.searchTitle}>
                Oficinas concesionarias de la capital
              </h3>
              <form className={classes.form} action="">
                <div className={classes.zona}>
                  <span className={classes.label}>Zona</span>
                  <select
                    value={currentZone.value}
                    className={classes.select}
                    onChange={e => this.handleZoneChange(e)}>
                    <option disabled value="">
                      Seleccionar
                    </option>
                    {capitalData.map(location => (
                      <option
                        key={`location-${location.value}`}
                        value={location.value}>
                        {location.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className={classes.district}>
                  <span className={classes.districtLabel}>Distrito</span>
                  <select
                    value={currentDistrict.value}
                    className={classes.select}
                    onChange={e => this.handleDistrictChange(e)}>
                    <option disabled value="">
                      Seleccionar
                    </option>
                    {currentZone.districts.map(d => (
                      <option key={d.value} value={d.value}>
                        {d.name}
                      </option>
                    ))}
                  </select>
                </div>
              </form>
            </div>
            {currentDistrict.name && (
              <h2 className={classes.mapTitle}>{`${
                currentZone.name
              }${currentZone.name && ' - '}${currentDistrict.name}`}</h2>
            )}
            <div
              id="concessionaries-map"
              style={{ width: '100%', height: '355px' }}
            />
          </div>
          <div className={classes.locations}>
            <div className={classes.search}>
              <h3 className={classes.searchTitle}>
                Oficinas concesionarias en provincias
              </h3>
              <form className={classes.form} action="">
                <div className={classes.zona}>
                  <span className={`${classes.label} mr-10`}>Provincia</span>
                  <select
                    value={currentProvince.value}
                    className={classes.select}
                    onChange={e => this.handleProvinceChange(e)}>
                    <option disabled value="">
                      Seleccionar
                    </option>
                    {provinceData.map(province => (
                      <option key={province.value} value={province.value}>
                        {province.name}
                      </option>
                    ))}
                  </select>
                </div>
              </form>
            </div>
            {currentProvince.name && (
              <h2
                className={
                  classes.mapTitle
                }>{`Provincia - ${currentProvince.name}`}</h2>
            )}
            <div
              id="concessionaries-map2"
              style={{ width: '100%', height: '355px' }}
            />
          </div>
        </div>
      </div>
    )
  }
}

StaticConcessionaryOffices.label = 'Oficinas Concesionarias'

export default StaticConcessionaryOffices
