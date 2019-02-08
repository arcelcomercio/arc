import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Consumer from 'fusion:consumer'
import Ae from './_children/ae'
import './style.scss'

@Consumer
class AperturaExtraordinaria extends Component 
{
    constructor (props) {
        super(props)
        this.state = { data: {} }
        this.fetch()
    }

    fetch() {
        if(this.props.customFields.link){
            const { fetched } = this.getContent(
                'get-story-by-websiteurl', 
                { website_url: this.props.customFields.link, website: this.props.arcSite }, 
                this.filterSchema()
            )
            fetched.then(response => {
                console.log('get-story-by-websiteurl')
                console.dir(response)
                this.setState({ data: response })
            })
        }
    }

    filterSchema() {
        return `{
            headlines {
                basic
            }
            subheadlines {
                basic
            }
            promo_items {
                basic {
                    type
                    url
                }
            }
            credits {
                by {
                    type
                    name
                }
            }
        }`
    }
    
    render(){
        console.log('this render', this)
        return <Ae multimediaOrientation={this.props.customFields.multimediaOrientation} />
    }
}

AperturaExtraordinaria.propTypes = {
    customFields: PropTypes.shape({
        content: PropTypes.label.tag({
            name: 'Contenido'
        }),
        link: PropTypes.string.isRequired.tag({
            name: 'Link de nota interna'
        }),
        section: PropTypes.string.isRequired.tag({
            name: 'Sección',
            description: 'Dejar vacío para tomar el valor original de la noticia.'
        }),
        title: PropTypes.string.isRequired.tag({
            name: 'Título',
            description: 'Dejar vacío para tomar el valor original de la noticia.'
        }),
        subTitle: PropTypes.string.isRequired.tag({
            name: 'Bajada',
            description: 'Dejar vacío para tomar el valor original de la noticia.'
        }),
        orientation: PropTypes.label.tag({
            name: 'Posición del contenido'
        }),
        multimediaOrientation: PropTypes.oneOf(['top', 'bottom', 'left', 'right']).tag({
            name: 'Posición de la imagen o video',
            labels: {
                top: 'Superior',
                bottom: 'Inferior',
                left: 'Izquierda',
                right: 'Derecha'
            },
            defaultValue: 'bottom'
        }),
        contentOrientation: PropTypes.oneOf(['center', 'left', 'right']).tag({
            name: 'Posición del contenido',
            labels: {
                center: 'Centro',
                left: 'Izquierda',
                right: 'Derecha'
            },
            defaultValue: 'left'
        }),
        hasVideo: PropTypes.bool.tag({
            name: '¿Colocar un video?',
            group: 'Video'
        }),
        videoService: PropTypes.oneOf(['goldfish', 'youtube']).tag({
            name: 'Proveedor',
            group: 'Video',
            labels: {
                goldfish: 'GoldFish',
                youtube: 'Youtube'
            },
            defaultValue: 'goldfish'
        }),
        videoCode: PropTypes.string.tag({
            name: 'Código de video',
            group: 'Video'
        })
    })
}

export default AperturaExtraordinaria
