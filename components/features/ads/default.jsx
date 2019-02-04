import Consumer from 'fusion:consumer'
import React, { Component, Fragment } from 'react'
import './default.scss'

class Ads extends Component {

    render(){

        const { adElement, device } = this.props 

        return(
            <Fragment>
                <div 
                    className='ad' 
                    id={`ads_${device}_${adElement}`}
                ></div>
            </Fragment>
        )
    }
}

Ads.static = true

export default Ads