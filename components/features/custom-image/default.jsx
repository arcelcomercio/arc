import React, { PureComponent } from 'react'
import Consumer from 'fusion:consumer'
import PropTypes from 'prop-types'

@Consumer
class CustomImage extends PureComponent {
 
  render() {
    const {
      globalContent,
      globalContentConfig,
      customFields: {
        imgUrlDesktop = '',
        imgUrlMobile = '',
        imgLink = '',
        imgWidth = 0,
        imgHeight = 0
      } = {},
    } = this.props

    if(imgUrlDesktop == '') 
      return <div>Modulo imagen, clic en editar para configurar.</div> 
    let picture = (
      <picture>
        { imgUrlMobile != '' && <source media="(max-width: 650px)" srcset={imgUrlMobile} /> }
        <img 
          src={imgUrlDesktop} 
          alt="" 
          {...imgWidth > 0 ? {width:imgWidth} : {}}
          {...imgHeight > 0 ? {height:imgHeight} : {}}
        />
      </picture>
    );
    
    if(imgLink != ''){
      return (<div><a href={imgLink}>{ picture }</a></div>);
    }

    return <div>{picture}</div>;
  }
}

CustomImage.propTypes = {
  customFields: PropTypes.shape({
    imgUrlDesktop: PropTypes.string.tag({
      name: 'Url imagen desktop',
    }),
    imgUrlMobile: PropTypes.string.tag({
      name: 'Url imagen mobile',
    }),
    imgLink: PropTypes.string.tag({
      name: 'Link imagen',
    }),
    imgWidth: PropTypes.string.tag({
      name: 'Ancho',
    }),
    imgHeight: PropTypes.string.tag({
      name: 'Alto',
    })
  }),
  editableField: PropTypes.func,
}

CustomImage.label = 'Imagen con enlace'
CustomImage.static = true

export default CustomImage
