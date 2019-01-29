import Consumer from 'fusion:consumer'
import React, { Component, Fragment } from 'react'

const header = {
    backgroundColor: 'yellow',
    width: '100%',
    height: 76,
    fontSize: 12,
    fontWeight: 'bold',
    fontFamilu: 'Arial',
    display: 'flex',
    'justify-content': 'space-between',
    'align-items': 'center'
}

const hot = {
    backgroundColor: '#f1f1f1',
    width: '100%',
    height: 38,
    'list-style': 'none',
    display: 'flex',
    'justify-content': 'center',
    'align-items': 'center',
    margin: 0,
    fontSize: 16
}

@Consumer
class Header extends Component {

    render() {

        return(
            <Fragment>
                <div style={header}>
                    <span>29 DE ENERO, 2019</span>
                    <img 
                        src={`${this.props.contextPath}/resources/dist/${this.props.arcSite}/images/logo.png`} 
                        alt={`Logo de ${this.props.arcSite}`}
                        height={34}
                    />
                    <div>
                        <button>Ingresar</button>
                        <button>Suscríbete</button>
                    </div>
                </div>
                <ul style={hot}>
                    <li>lomas </li>
                    <li>lomas </li>
                    <li>lomas </li>
                    <li>lomas </li>
                    <li>lomas </li>
                </ul> 
                <div className='jojo'></div>         
            </Fragment>
        )
    }
}

Header.static = true

export default Header
