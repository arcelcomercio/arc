import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Consumer from 'fusion:consumer'
import Ae from './_children/ae'

@Consumer
class AperturaExtraordinaria extends Component 
{
    constructor (props) {
        super(props)
        this.state = { data: {} }
        this.renderCount = 0
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
                    type url
                }
            }
            credits {
                by {
                    type name
                }
            }
            website
            website_url
            taxonomy {
                sections {
                    _id _website type name path
                }
            }
        }`
    }
    
    render(){
        console.log('apertura extraordinaria render', ++this.renderCount)
        const params = {
            customFields: this.props.customFields,
            data: this.state.data,
            editableField: this.props.editableField,
            website: this.props.arcSite
        }
        return <Ae {...params} />
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
            name: 'Posición de los textos',
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
