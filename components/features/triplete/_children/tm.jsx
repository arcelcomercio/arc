import React, {Component} from 'react'

class Tm extends Component
{
    render(){
        return <div className='tm'>
            <article className='tm__item tm__item--multimedia-right'>
                <div className='tm__item__title'>TÍTULO TÍTULO TÍTULO TÍTULO TÍTULO TÍTULO TÍTULO TÍTULO TÍTULO TÍTULO TÍTULO TÍTULO TÍTULO TÍTULO TÍTULO TÍTULO TÍTULO TÍTULO</div>
                <figure className='tm__item__multimedia'>
                    <img src="https://arc-anglerfish-arc2-sandbox-sandbox-elcomercio.s3.amazonaws.com/public/PCFGIWR2MVE7DPPOHO5TFV3CEM.jpeg"/>
                </figure>
                <div className='tm__item__author'>AUTHOR</div>
            </article>
            <article className='tm__item tm__item--multimedia-right'>
                <div className='tm__item__title'>TÍTULO</div>
                <figure className='tm__item__multimedia'>
                    <img src="https://arc-anglerfish-arc2-sandbox-sandbox-elcomercio.s3.amazonaws.com/public/PCFGIWR2MVE7DPPOHO5TFV3CEM.jpeg"/>
                </figure>
                <div className='tm__item__author'>AUTHOR</div>
            </article>
            <article className='tm__item tm__item--multimedia-right'>
                <div className='tm__item__title'>TÍTULO</div>
                <figure className='tm__item__multimedia'>IMAGEN</figure>
                <div className='tm__item__author'>AUTHOR</div>
            </article>
        </div>
    }
}

export default Tm