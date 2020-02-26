import React from 'react'
import { useContent } from 'fusion:content'
import { useFusionContext } from 'fusion:context'
import ENV from "fusion:environment";

const classes = {
    lifweek: 'lifweek',
    seccion_title: 'section-title mb-20 mt-20',
    designer_profile: 'designer-profile flex',
    designer_profile_image: 'designer-profile__image',
    designer_profile_detail: 'designer-profile__detail lg:mt30',
    designer_profile_name: 'designer-profile__name',
    designer_profile_bio: 'designer-profile__bio',
    designer_profile_divider: 'designer-profile__divider mt-30 mb-20',

    box_designers: 'box-designers mb-10 pb-20 pt-30',
    box_designers_title: 'box-designers__title inline-block mb-20',
    box_designers_content: 'box-designers__content flex',
    item_designer: 'designer-item position-relative m-10',
    item_designer_image: 'designer-item__image',
    item_designer_name: 'designer-item__name inline-block',
    item_designer_lastname: 'designer-item__lastname w-full inline-block'

}

const LIFWEEK_SOURCE = 'get-designers-lifweek';

const Lifweek = () => 
{
    const designersData = useContent({
        source: LIFWEEK_SOURCE
    })

    const { arcSite } = useFusionContext()

    const _env = ENV.ENVIRONMENT === 'elcomercio' ? 'prod' : 'sandbox'

    const { participantes = [] } = designersData || {}

    const currentUrl   = window.location.href.split('?')[0];
    let   slugDesigner = currentUrl.match(/([^/]*)\/*$/)[1];

    if(slugDesigner === 'disenadores')
    {
        // eslint-disable-next-line prefer-destructuring
        slugDesigner = Object.keys(participantes)[0];                
    }

    const perfilDesigner = participantes[slugDesigner];
    const separateName = (perfilDesigner.nombre).trim().split(" ");

    return (
        <div className={classes.lifweek}>
            <h1 className={classes.seccion_title}>Diseñadores</h1>
            <div className={classes.designer_profile}>
                <div className={classes.designer_profile_image}>
                    <figure>
                        <img src={ perfilDesigner.imagen } alt={separateName[0]}/>
                    </figure>
                </div>
                <div className={classes.designer_profile_detail}>
                    <h2 className={classes.designer_profile_name}>
                        <span>{ separateName[0] }</span> {separateName[1]}
                    </h2>
                    <p className={classes.designer_profile_bio}>{ perfilDesigner.bio }</p>
                    <div className={classes.designer_profile_divider}></div>
                </div>
            </div>
            <div className={classes.box_designers}>
                <h3 className={classes.box_designers_title}>Galería de <b>Diseñadores &amp; Marcas</b></h3>
                <div className={classes.box_designers_content}>
                {
                    Object.keys(participantes).map((key) => {
                        if(slugDesigner === key){
                            return true; 
                        }
                        const itemName = (participantes[key].nombre).trim().split(" ");
                        const itemUrl  = `/lifweek/disenadores/${key}/${_env !== "prod" ? `?_website=${arcSite}&` : `?`}`
                        
                        return (
                            <div className={classes.item_designer}>
                                <figure className={classes.item_designer_image}>
                                    <a href={itemUrl}>
                                        <img src={participantes[key].imagen} width="276" height="354" alt={itemName[0]}/>
                                        <figcaption>
                                            <span className={classes.item_designer_name}>{itemName[0]}</span>
                                            <span className={classes.item_designer_lastname}>{itemName[1]}</span>
                                        </figcaption>
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
