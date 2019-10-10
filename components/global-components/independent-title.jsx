import React from 'react'

const classes = {
  titulo:
    'independent-title line-h-none w-full text-white text-center flex justify-center items-center',
  link: 'independent-title__link primary-font title-xs font-bold uppercase',
}

/**
 * @todo TODO: Revisar estilos, que se vea de forma homogénea cuando
 * se comporte como h1, h2 o h3.
 * @param title
 * @param link
 * @param bgColor
 * @param fontColor
 * @param TextType String: Es el tipo de nodo a construir para el título.
 * Se espera que sea 'h1', 'h2', 'h3' o 'div.
 */

const IndependentTitle = ({
  title,
  link,
  bgColor,
  fontColor,
  TextType = 'h1',
}) => (
  <TextType className={`${classes.titulo} ${bgColor}`}>
    <a href={link} className={`${classes.link} ${fontColor}`}>
      {title}
    </a>
  </TextType>
)

export default IndependentTitle
