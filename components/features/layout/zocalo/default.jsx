import Consumer from 'fusion:consumer'
import React, { Component, Fragment } from 'react'
import './default.scss'

class Zocalo extends Component {
    render(){
        return(
            <Fragment>
                <div className='zocalo'>publicidad</div>
            </Fragment>
        )
    }
}

Zocalo.static = true

export default Zocalo