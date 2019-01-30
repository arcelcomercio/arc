import React, { Component, Fragment } from 'react'
import Zocalo from '../../features/layout/zocalo/default'

const ZocaloLayout = (props) => {
    return(
    <Fragment>
        <div className={`zocalo__container zocalo__${props.position}`}>
            <Zocalo/>
        </div>
    </Fragment>
    )
}
/* class ZocaloLayout extends Component {
    render() {
        return(
            <Fragment>
                <div className='zocalo__container'>
                    <Zocalo
                        position={this.props.position}
                    />
                </div>
            </Fragment>
        )
    }
}
 */
export default ZocaloLayout;