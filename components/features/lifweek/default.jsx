import React from 'react'
import { useContent } from 'fusion:content'
import { useFusionContext } from 'fusion:context'
import ENV from "fusion:environment";

const classes = {
    lifweek: 'lifweek-designers p-0 pl-20 pr-20 md:p-0',
    seccion_title: 'lifweek-designers__section-title mb-20 mt-20',
    profile: 'lifweek-designers__profile flex flex-row flex-wrap mb-40',
    profile_image: 'lifweek-designers__profile-image',
    profile_detail: 'lifweek-designers__profile-detail p-0 md:pl-20 mt-30 md:mt-0',
    profile_name: 'lifweek-designers__profile-name mb-15',
    profile_name_blue: 'lifweek-designers__profile-name_blue inline-block mr-5 text-white',
    profile_bio: 'lifweek-designers__profile-bio',
    profile_divider: 'lifweek-designers__profile-divider mt-30 mb-20',

    list: 'lifweek-designers__list border-1 border-solid mb-10 pb-20 pt-30 text-center',
    list_title: 'lifweek-designers__list-title inline-block mb-20 ml-5 mr-5 md:ml-0 md:mr-0 border-b-1 border-solid',
    list_title_bold: 'lifweek-designers__list-title--bold',
    list_content: 'lifweek-designers__list-content flex flex-row flex-wrap justify-center items-center',
    list_item: 'lifweek-designers__list-item position-relative m-10',
    list_link: 'lifweek-designers__list-link block text-white',
    list_content_name: 'lifweek-designers__list-content_name position-absolute text-left',
    list_name: 'lifweek-designers__list-name inline-block text-white',
    list_lastname: 'lifweek-designers__list-lastname w-full inline-block bg-white'
}

const LIFWEEK_SOURCE = 'get-designers-lifweek';

const Lifweek = () => 
{
    const designersData = useContent({
        source: LIFWEEK_SOURCE
    })

    const { arcSite, isAdmin, requestUri } = useFusionContext()

    const _env = ENV.ENVIRONMENT === 'elcomercio' ? 'prod' : 'sandbox'

    const { participantes = [] } = designersData || {}

    const currentUrl   = requestUri.split('?')[0];
    let   slugDesigner = currentUrl.match(/([^/]*)\/*$/)[1];

    if(slugDesigner === 'disenadores' || isAdmin)
    {
        // eslint-disable-next-line prefer-destructuring
        slugDesigner = Object.keys(participantes)[0];                
    }

    const perfilDesigner = participantes[slugDesigner];
    const separateName = (perfilDesigner.nombre).trim().split(" ");

    return (
        <div className={classes.lifweek}>
            <h1 className={classes.seccion_title}>Diseñadores</h1>
            <div className={classes.profile}>
                <div className={classes.profile_image}>
                    <figure>
                        <img src={ perfilDesigner.imagen } alt={separateName[0]}/>
                    </figure>
                </div>
                <div className={classes.profile_detail}>
                    <h2 className={classes.profile_name}>
                        <span className={classes.profile_name_blue}>{ separateName[0] }</span> {separateName[1]}
                    </h2>
                    <p className={classes.profile_bio}>{ perfilDesigner.bio }</p>
                    <div className={classes.profile_divider}></div>
                </div>
            </div>
            <div className={classes.list}>
                <h3 className={classes.list_title}>Galería de <span className={classes.list_title_bold}>Diseñadores &amp; Marcas</span></h3>
                <div className={classes.list_content}>
                {
                    Object.keys(participantes).map((key) => {
                        if(slugDesigner === key){
                            return true; 
                        }
                        const itemName = (participantes[key].nombre).trim().split(" ");
                        const itemUrl  = `/lifweek/disenadores/${key}/${_env !== "prod" ? `?_website=${arcSite}&` : `?`}`
                        
                        return (
                            <div className={classes.list_item}>
                                <figure>
                                    <a href={itemUrl} className={classes.list_link}>
                                        <img src={participantes[key].imagen} width="276" height="354" alt={itemName[0]}/>
                                        <figcaption className={classes.list_content_name}>
                                            <span className={classes.list_name}>{itemName[0]}</span>
                                            <span className={classes.list_lastname}>{itemName[1]}</span>
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
Lifweek.static = true
export default Lifweek
