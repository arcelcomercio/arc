import React from 'react'
import { useContent } from 'fusion:content'
import { useFusionContext } from 'fusion:context'
import ENV from "fusion:environment";

const Lifweek = () => 
{
    const designersData = useContent({
        source: 'get-designers-lifweek'
    })

    const { arcSite } = useFusionContext()

    const _env = ENV.ENVIRONMENT === 'elcomercio' ? 'prod' : 'sandbox'

    const { participantes = [] } = designersData || {}

    const currentUrl   = window.location.href.split('?')[0];
    let   slugDesigner = currentUrl.match(/([^\/]*)\/*$/)[1];

    if(slugDesigner === 'disenadores')
    {
        // eslint-disable-next-line prefer-destructuring
        slugDesigner = Object.keys(participantes)[0];                
    }

    const perfilDesigner = participantes[slugDesigner];
    const separateName = (perfilDesigner.nombre).trim().split(" ");

    return (
        <div className="lifweek">
            <h1 className="section-title">Diseñadores</h1>
            <div className="designer-profile">
                <div className="designer-profile__image">
                    <figure>
                        <img src={ perfilDesigner.imagen } alt={separateName[0]} className="designer-img"/>
                    </figure>
                </div>
                <div className="designer-profile__detail">
                    <h2 className="designer-profile__name"><span>{ separateName[0] }</span> {separateName[1]}</h2>
                    <p className="designer-profile__bio">{ perfilDesigner.bio }</p>
                    <div className="designer-profile__divider"></div>
                </div>
            </div>
            <div className="box-designers">
                <h3 className="box-designers__title">Galería de <b>Diseñadores &amp; Marcas</b></h3>
                <div className="box-designers__content">
                {
                    Object.keys(participantes).map((key) => {
                        if(slugDesigner === key){
                            return true; 
                        }
                        const itemName = (participantes[key].nombre).trim().split(" ");
                        return (
                            <div className="box-designers__item">
                                <figure className="box-designers__image">
                                    <a href={`/lifweek/disenadores/${key}/${_env !== "prod" ? `?_website=${arcSite}&` : `?`}`}>
                                        <img src={participantes[key].imagen} width="276" height="354" alt={itemName[0]}/>
                                        <figcaption><span className="box-designers__name">{itemName[0]}</span>
                                        <span className="box-designers__lastname">{itemName[1]}</span></figcaption>
                                    </a>
                                </figure>
                            </div>
                        )
                        
                    })
                }
                </div>
            </div>
        </div>
    )
}

Lifweek.label = 'Lifweek Diseñadores'

export default Lifweek
