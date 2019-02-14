import React, {Component} from 'react'
import './../style.scss'

class Tm extends Component
{
    render(){
        return <div className='tm'>
            <div className='tm__item tm__item--multimedia-right'>
                <div className='tm__item__title'>TÍTULO TÍTULO TÍTULO TÍTULO TÍTULO TÍTULO TÍTULO TÍTULO TÍTULO TÍTULO TÍTULO TÍTULO TÍTULO TÍTULO TÍTULO TÍTULO TÍTULO TÍTULO</div>
                <div className='tm__item__multimedia'>
                    <img src="https://arc-anglerfish-arc2-sandbox-sandbox-elcomercio.s3.amazonaws.com/public/PCFGIWR2MVE7DPPOHO5TFV3CEM.jpeg"/>
                </div>
                <div className='tm__item__author'>AUTHOR</div>
            </div>
            <div className='tm__item tm__item--multimedia-right'>
                <div className='tm__item__title'>TÍTULO</div>
                <div className='tm__item__multimedia'>
                    <img src="https://arc-anglerfish-arc2-sandbox-sandbox-elcomercio.s3.amazonaws.com/public/PCFGIWR2MVE7DPPOHO5TFV3CEM.jpeg"/>
                </div>
                <div className='tm__item__author'>AUTHOR</div>
            </div>
            <div className='tm__item tm__item--multimedia-right'>
                <div className='tm__item__title'>TÍTULO</div>
                <div className='tm__item__multimedia'>IMAGEN</div>
                <div className='tm__item__author'>AUTHOR</div>
            </div>
        </div>
    }
}

export default Tm