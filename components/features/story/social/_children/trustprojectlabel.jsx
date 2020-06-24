import React from 'react'

const TProLbl = ({ trustproject }) => {
  let txt = ''
  if (trustproject.text !== '' && trustproject.url !== '') {
    switch (trustproject.url) {
      case 'noticias':
        txt =
          'Información basada en hechos y verificada de primera mano por el reportero, o reportada y verificada por fuentes expertas.'
        break
      case 'analisis':
        txt =
          'Interpretación de las noticias basada en evidencia, incluyendo data y proyecciones posibles en base a eventos pasados.'
        break
      case 'opinion':
        txt =
          'Basada en la interpretación y juicio de hechos y datos hechos por el autor.'
        break
      case 'publicitario':
        txt =
          'Pagado por un anunciante sin participación de la redacción de El Comercio.'
        break
      case 'patrocinado':
        txt =
          'Producido para un anunciante que puede haber aprobado el contenido.'
        break
      case 'auspiciado':
        txt =
          'Pagado con por un anunciante, pero sin que este lo haya aprobado antes de su publicación.'
        break
      case 'elucidario':
        txt = 'Clarificación acerca de una historia.'
        break
      case 'hechos':
        txt = 'Provee contexto, definición y detalle de un tópico específico.'
        break
      case 'ayu_inf':
        txt = 'Pedido de información a la audiencia.'
        break
      case 'revision':
        txt = 'Crítica de un servicio, producto u obra creativa.'
        break
      case 'investigacion':
        txt = 'Examen en profundidad de un hecho noticioso.'
        break
      case 'det_hist':
        txt = 'Aclara a la audiencia como se reporteó una noticia.'
        break
      case 'satira':
        txt =
          'Uso de la exageración, ironía y humor para establecer un punto, no debe entenderse como factual.'
        break
      default:
        txt = ''
        break
    }
  }

  return (
    <>
      {txt !== '' ? (
        <p className="story-header__tooltip">
          {' '}
          | {trustproject.text}
          <span>{txt}</span>
        </p>
      ) : (
        ''
      )}
    </>
  )
}

export default TProLbl
