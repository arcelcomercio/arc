import React from 'react'

const TProLbl = ({ trustproject, plantilla }) => {
  let txt = ''
  if (trustproject.text !== '') {
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
        txt = 'Provee contexto, definición y detalle de un tópico específico.'
        break
      case 'hechos':
        txt =
          'Verifica una declaración o grupo de declaraciones específicas dadas como un hecho, estableciendo un veredicto en torno a si dichas declaraciones son correctas o no.'
        break
      case 'ayu_inf':
        txt = 'Pedido de información a la audiencia.'
        break
      case 'revision':
        txt = 'Crítica de un servicio, producto u obra creativa.'
        break
      case 'investigacion':
        txt =
          'Examen en profundidad de un hecho noticioso que requiere investigación y recursos extensivos.'
        break
      case 'orbituario':
        txt =
          'Reporta el fallecimiento de un individuo, repasando su vida y sus logros, las controversias en las que hubiera estado envuelto y el recuerdo de las personas que lo conocieron.'
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
      {trustproject.text !== '' ? (
        <p
          className={
            plantilla === 'lite'
              ? 'st-social__tooltip'
              : 'story-header__tooltip'
          }>
          {' '}
          | {trustproject.text}
          {txt !== '' ? <span>{txt}</span> : ''}
        </p>
      ) : (
        ''
      )}
    </>
  )
}

export default TProLbl
