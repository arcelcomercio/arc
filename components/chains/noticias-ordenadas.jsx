import React from 'react'
import PropTypes from 'prop-types'

export default function OrderedNews({ children }) {
  const AutoChildren = React.Children.map(children, (child, i) => {
    console.log(child)
    return React.cloneElement(child, {
      storyNumber: i,
    })
  })
  return (
    <div className="content-grid-base content--3col content--2col content--1col full-width margin-top">
      {AutoChildren}
    </div>
  )
}

OrderedNews.propTypes = {
  customFields: PropTypes.shape({
    initialNew: PropTypes.number.tag({
      name: 'Iniciar desde la noticia:',
      description:
        'Indique el número de la noticia desde la que quiere empezar a imprimir.',
    }),
  }),
}
