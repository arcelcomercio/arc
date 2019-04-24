/* eslint-disable no-undef */
import React, { Component } from 'react'
import { capitalData, provinceData } from './_children/locations'
import Markers from './_children/markers'

class ConcessionaryOffices extends Component {
  constructor(props) {
    super(props)
    this.provinceMap = false
    this.capitalMap = false
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
      currentCapitalMarkers: {},
      currentProvinceMarkers: {},
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
          const currentMarker = new google.maps.Marker({
            position: { lat: provMarker.lat, lng: provMarker.lng },
            map: this.capitalMap,
            title: provMarker.title,
            icon: provMarker.icon,
          })
          infowindow = new google.maps.InfoWindow({
            content: provMarker.infoWindow.content,
          })
          currentMarker.addListener('click', () => {
            infowindow.open(this.provinceMap, currentMarker)
          })
          auxMarkers.push(currentMarker)
        })
      })
    })

    this.setState({
      currentCapitalMarkers: auxMarkers,
    })
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
        const currentMarker = new google.maps.Marker({
          position: { lat: provMarker.lat, lng: provMarker.lng },
          map: this.provinceMap,
          title: provMarker.title,
          icon: provMarker.icon,
        })
        infowindow = new google.maps.InfoWindow({
          content: provMarker.infoWindow.content,
        })
        currentMarker.addListener('click', () => {
          infowindow.open(this.provinceMap, currentMarker)
        })
        auxMarkers.push(currentMarker)
      })
    })

    this.setState({
      currentProvinceMarkers: auxMarkers,
    })
  }

  clearMarkers = markers => {
    for (let i = 0; i < markers.length; i++) {
      markers[i].setMap(null)
    }
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
    const { currentCapitalMarkers } = this.state

    this.clearMarkers(currentCapitalMarkers)

    const { value } = e.target
    const { currentZone } = this.state

    const location = currentZone.districts.filter(loc => loc.value === value)

    const auxMarkers = []
    let infowindow = ''
    Markers[value].forEach(provMarker => {
      const currentMarker = new google.maps.Marker({
        position: { lat: provMarker.lat, lng: provMarker.lng },
        map: this.capitalMap,
        title: provMarker.title,
        icon: provMarker.icon,
      })
      infowindow = new google.maps.InfoWindow({
        content: provMarker.infoWindow.content,
      })
      currentMarker.addListener('click', () => {
        infowindow.open(this.provinceMap, currentMarker)
      })
      auxMarkers.push(currentMarker)
    })

    this.setState({
      currentDistrict: location[0],
      currentCapitalMarkers: auxMarkers,
    })
  }

  handleProvinceChange(e) {
    const { currentProvinceMarkers } = this.state

    this.clearMarkers(currentProvinceMarkers)

    const { value } = e.target

    const province = provinceData.filter(prov => prov.value === value)

    const auxMarkers = []
    let infowindow = ''
    Markers[value].forEach(provMarker => {
      const currentMarker = new google.maps.Marker({
        position: { lat: provMarker.lat, lng: provMarker.lng },
        map: this.provinceMap,
        title: provMarker.title,
        icon: provMarker.icon,
      })
      infowindow = new google.maps.InfoWindow({
        content: provMarker.infoWindow.content,
      })
      currentMarker.addListener('click', () => {
        infowindow.open(this.provinceMap, currentMarker)
      })
      auxMarkers.push(currentMarker)
    })

    this.setState({
      currentProvince: province[0],
      currentProvinceMarkers: auxMarkers,
    })
  }

  render() {
    const { currentZone, currentDistrict, currentProvince } = this.state
    return (
      <div className="concessionaires">
        <span className="concessionaires__arrow" />
        <div className="concessionaires__container">
          <h1 className="concessionaires__title">Oficinas Concesionarias</h1>
          <p className="concessionaires__info">
            Para conocer el listado de oficinas concesionarias seleccione en el
            mapa su ubicación
          </p>
          <div className="concessionaires__locations">
            <div className="concessionaires__search flex">
              <h3 className="concessionaires__search-title">
                Oficinas concesionarias de la capital
              </h3>
              <form className="flex" action="">
                <div className="concessionaires__controls flex">
                  <span className="concessionaires__label">Zona</span>
                  <select
                    value={currentZone.value}
                    className="concessionaires__select"
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
                <div className="concessionaires__controls flex">
                  <span className="concessionaires__label">Distrito</span>
                  <select
                    value={currentDistrict.value}
                    className="concessionaires__select"
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
              <h2 className="concessionaires__map-title">{`${
                currentZone.name
              }${currentZone.name && ' - '}${currentDistrict.name}`}</h2>
            )}
            <div
              id="concessionaries-map"
              style={{ width: '100%', height: '355px' }}
            />
          </div>
          <div className="concessionaires__locations">
            <div className="concessionaires__search flex">
              <h3 className="concessionaires__search-title">
                Oficinas concesionarias en provincias
              </h3>
              <form className="flex" action="">
                <div className="concessionaires__controls flex">
                  <span className="concessionaires__label">Provincia</span>
                  <select
                    value={currentProvince.value}
                    className="concessionaires__select"
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
              <h2 className="concessionaires__map-title">{`Provincia - ${
                currentProvince.name
              }`}</h2>
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

ConcessionaryOffices.label = 'Oficinas concesionarias'

export default ConcessionaryOffices
