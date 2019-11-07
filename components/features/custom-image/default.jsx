import React from 'react'
import customFields from './_dependencies/custom-fields'

const classes = { lazy: "lazy" };

const CustomImage = props => 
{ 
  const {
    customFields: {
      imgUrlDesktop = '',
      imgUrlMobile = '',
      imgTitle = '',
      imgAlt,
      imgLink = '',
      imgWidth = ''
    } = {},
  } = props;

  if(imgUrlDesktop === '') 
    return <div>Modulo imagen, clic en editar para configurar.</div>

  const picture = (
    <picture>
      { imgUrlMobile !== '' && <source media="(max-width: 650px)" srcSet={imgUrlMobile} data-srcset={imgUrlMobile} className={classes.lazy} /> }
      <img 
        src={imgUrlDesktop} 
        data-src={imgUrlDesktop}
        alt={imgAlt}
        {...imgTitle !== '' ? {title:imgTitle} : {}}
        {...imgWidth !== '' ? {width:imgWidth} : {width:'100%'}}
        className={classes.lazy}
      />
    </picture>
  );
  
  if(imgLink !== ''){
    return (<div><a href={imgLink}>{ picture }</a></div>);
  }

  return <div>{picture}</div>;

}

CustomImage.propTypes = {
  customFields,
}
CustomImage.label = 'Imagen con enlace'
CustomImage.static = true

export default CustomImage