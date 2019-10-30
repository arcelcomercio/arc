import React, { PureComponent } from 'react'
import Consumer from 'fusion:consumer';
import customFields from './_dependencies/custom-fields'

@Consumer
class CustomImage extends PureComponent {
 
  render() {
    const {
      customFields: {
        imgUrlDesktop = '',
        imgUrlMobile = '',
        imgTitle = '',
        imgAlt,
        imgLink = '',
        imgWidth = 0
      } = {},
    } = this.props

    if(imgUrlDesktop === '') 
      return <div>Modulo imagen, clic en editar para configurar.</div> 
    const picture = (
      <picture>
        { imgUrlMobile !== '' && <source media="(max-width: 650px)" srcSet={imgUrlMobile} className="lazy" /> }
        <img 
          src={imgUrlDesktop} 
          alt={imgAlt}
          {...imgTitle !== '' ? {title:imgTitle} : {}}
          {...imgWidth > 0 ? {width:imgWidth} : {}}
          className="lazy"
        />
      </picture>
    );
    
    if(imgLink !== ''){
      return (<div><a href={imgLink}>{ picture }</a></div>);
    }

    return <div>{picture}</div>;
  }
}

CustomImage.propTypes = {
  customFields,
}
CustomImage.label = 'Imagen con enlace'
CustomImage.static = true

export default CustomImage
