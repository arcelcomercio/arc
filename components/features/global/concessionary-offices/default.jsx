/* eslint-disable no-undef */
import React, { Component } from 'react'
// import Data from './_children/datos.json'

class ConcessionaryOffices extends Component {
  constructor(props) {
    super(props)
    this.state = {
      /* zonas: [],
      distritos: [],
      zonavalue: 'perro', */
    }
  }

  componentWillMount() {
    this.getGoogleMaps()
  }

  componentDidMount() {
    this.getGoogleMaps().then(() => {
      this.iniciarMapa()
    })
    // this.changeSelectZonas(Data)
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

  /* changeSelectZonas = Dat => {
    const zonas = Object.keys(Dat)
    this.setState({
      zonas,
    })
  }

  chargeListZonas = () => {
    const aZonas = this.state.zonas
    return aZonas.map(zona => (
      <option key={zona} value={zona}>
        {zona}
      </option>
    ))
  }

  chargeDistritos = event => {
    const zona = event.target.value
    const distritos = Data[`${zona}`].zonaDistritos.map(distrito => {
      return distrito.nomDistrito
    })
    this.setState({
      distritos,
    })
  } */

  iniciarMapa = () => {
    this.primermapa()
    this.segundmaa()
  }

  primermapa = () => {
    const map = new google.maps.Map(
      document.getElementById('concessionaries-map'),
      {
        center: new google.maps.LatLng(-12.1558913, -76.9601941),
        zoom: 13,
      }
    )
    return map
  }

  segundmaa = () => {
    const contentString = `
      <h4>CENTRO SUPERIOR TECNOLOGICO Y SISTEMAS – PERÚ E.I.R.L.</h4>
      <p>
        Distrito: <span>Huamanga</span><br />Dirección:
        <span>JR. CUSCO NRO. 303 URB. CERCADO AYACUCHO - HUAMANGA</span
        ><br />Teléfono: <span>965 835 151</span><br />E-mail:
        <span>cestys2017_publicidad@outlook.es</span>
      </p>
		`

    const infowindow = new google.maps.InfoWindow({
      content: contentString,
    })

    const map = new google.maps.Map(
      document.getElementById('concessionaries-map2'),
      {
        center: new google.maps.LatLng(-12.1558913, -76.9601941),
        zoom: 13,
      }
    )
    const marker = new google.maps.Marker({
      position: { lat: -12.1558913, lng: -76.9601941 },
      map,
      title: 'Hello World!',
      icon:
        'https://s3.amazonaws.com/s.3.elcomercio.pe/f/i/icono_concesionario.png?2112.1800',
    })

    marker.addListener('click', () => {
      infowindow.open(map, marker)
    })

    return marker
  }

  render() {
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
                  <select className="concessionaires__select" name="" id="">
                    <option value="">Seleccionar</option>
                    <option value="">Zona Norte</option>
                  </select>
                </div>
                <div className="concessionaires__controls flex">
                  <span className="concessionaires__label">Distrito</span>
                  <select className="concessionaires__select" name="" id="">
                    <option value="">Seleccionar</option>
                    <option value="">Zona Norte</option>
                  </select>
                </div>
              </form>
            </div>
            <div
              id="concessionaries-map"
              style={{ width: '100%', height: '355px' }}
            />
          </div>
          <div className="concessionaires__locations">
            <div className="concessionaires__search flex">
              <h3 className="concessionaires__search-title">
                Oficinas concesionarias de la capital
              </h3>
              <form className="flex" action="">
                <div className="concessionaires__controls flex">
                  <span className="concessionaires__label">Zona</span>
                  <select className="concessionaires__select" name="" id="">
                    <option value="">Seleccionar</option>
                    <option value="">Zona Norte</option>
                  </select>
                </div>
                <div className="concessionaires__controls flex">
                  <span className="concessionaires__label">Distrito</span>
                  <select className="concessionaires__select" name="" id="">
                    <option value="">Seleccionar</option>
                    <option value="">Zona Norte</option>
                  </select>
                </div>
              </form>
            </div>
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
