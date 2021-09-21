import * as React from "react";

import customFields from './_dependencies/custom-fields';
import Item from './_children/item';

const classes = {
  container: 'title__container',
  containerBgRed: 'title__container--bg-red',
}


const Title = (props: any) => {
  const {customFields: {title = '', subtitle = '', color: colorInput = '#000'},} = props;
  return (
    <div className={`${classes.container} ${classes.containerBgRed}`} style={{color: colorInput}}>
      {title || 'Título'}
      <Item />
      {subtitle || 'Subtitulo'}
    </div>
  );
};

Title.propTypes = {
  customFields,
}

Title.label = 'Título de prueba';
Title.static = true;

export default Title;