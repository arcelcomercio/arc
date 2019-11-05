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
      imgWidth = 0
    } = {},
  } = props;

  if(imgUrlDesktop === '') 
    return <div>Modulo imagen, clic en editar para configurar.</div> 

  const picture = (
    <picture>
      { imgUrlMobile !== '' && <source media="(max-width: 650px)" srcSet={imgUrlMobile} className={classes.lazy} /> }
      <img 
        src={imgUrlDesktop} 
        alt={imgAlt}
        {...imgTitle !== '' ? {title:imgTitle} : {}}
        {...imgWidth > 0 ? {width:imgWidth} : {}}
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