import React, {Component} from 'react'
import PropTypes from 'prop-types'

class AperturaExtraordinaria extends Component 
{
    render(){
        return <div className="apertura-extraordinaria">Apertura Extraordinaria</div>
    }
}

AperturaExtraordinaria.propTypes = {
    customFields: PropTypes.shape({
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
        videoService: PropTypes.oneOf(['goldfish', 'youtube']).tag({
            name: 'Video test',
            group: 'Video',
            labels: {
                goldfish: 'GoldFish',
                youtube: 'Youtube'
            },
            defaultValue: 'goldfish'
        }),
        hasVideo: PropTypes.bool.tag({
            name: '¿Colocar un video?',
            group: 'Video'
        }),
        videoCode: PropTypes.string.tag({
            name: 'Código de video',
            group: 'Video'
        }),
        ll: PropTypes.label,
        rt: PropTypes.richtext,
        dd: PropTypes.date,
        dt: PropTypes.dateTime,
        ur: PropTypes.url,
        em: PropTypes.email,
        li: PropTypes.link,
        topics: PropTypes.list,
        candidateVotePercent: PropTypes.kvp,
        j: PropTypes.json,
        n: PropTypes.number,
        di: PropTypes.disabled
        //imageAndVideoOrientation
    })
}

export default AperturaExtraordinaria
