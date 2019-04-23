import React, { Fragment, Component } from 'react'
import Data from './_children/datos.json'

class OficinasConcesionarias extends Component {
  constructor(props) {
    super(props)
    this.state = {
      zonas: [],
      distritos: [],
      zonavalue: 'perro',
    }
  }

  getGoogleMaps() {
    if (!this.googleMapsPromise) {
      this.googleMapsPromise = new Promise(resolve => {
        window.resolveGoogleMapsPromise = () => {
          resolve(google)

          delete window.resolveGoogleMapsPromise
        }

        const script = document.createElement('script')
        script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBbwx4nd6vinEmC5nvaRt2GvwuOcktW_1E&callback=resolveGoogleMapsPromise`
        script.async = true
        document.body.appendChild(script)
      })
    }

    return this.googleMapsPromise
  }

  componentWillMount() {
    this.getGoogleMaps()
  }

  componentDidMount() {
    this.getGoogleMaps().then(google => {
      this.iniciarMapa()
    })
    this.changeSelectZonas(Data)
  }

  iniciarMapa() {
    const map = new google.maps.Map(document.getElementById('map'), {
      center: { lat: -34.397, lng: 150.644 },
      zoom: 8,
    })
  }

  changeSelectZonas = Dat => {
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
  }

  render() {
    return (
      <Fragment>
        <div className="title-wrapper">
          <h3>oficinas concesionarias</h3>
          <h6>
            Para conocer el listado de oficinas concesionarias <br /> seleccione
            en el mapa su ubicación
          </h6>
          <div className="concessionaires-selects">
            <div className="concessionaires_2">
              Zona
              <select
                name=""
                id="sel_zonas"
                value={this.state.zonavalue}
                onChange={this.chargeDistritos}>
                <option value="seleccionar">ZONAS</option>
                {this.chargeListZonas()}
              </select>
            </div>
            <div className="concessionaires_3">
              Distrito
              <select name="" id="sel_distritos">
                <option value="seleccionar">DISTRITOS</option>
              </select>
            </div>
          </div>
        </div>

        <div
          id="map"
          style={{ width: '400px', height: '400px', backgroundColor: 'red' }}
        />
      </Fragment>
    )
  }
}

export default OficinasConcesionarias
