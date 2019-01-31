import React, { Component, Fragment } from 'react'
import Ads from '../../features/ads/default'

const ZocaloLayout = (props) => {
    return(
    <Fragment>
        <div className='zocalo__container'>
            <Ads
                adElement={props.adElement}
                device={props.device}
            />
        </div>
    </Fragment>
    )
}

export default ZocaloLayout;