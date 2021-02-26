import * as React from 'react'
import { useContent } from 'fusion:content'

/**
 * @see estilos `src/websites/elcomercio/scss/components/statics/covid/_infected.scss`
 */

const classes = {
    wrapper: 'infected__wrapper',
    closeButton: 'infected__close-button',
    title: 'infected__title',
    subtitle: 'infected__subtitle',
    buttonWrapper: 'infected__btn-wrapper', 
    sectionsWrapper: 'infected__sections_wrapper',
    regionsWrapper: 'infected__rgn_wrapper',
    regionTitle: 'infected__rgn_title',
    itemsList: 'infected__items_list',
    itemUp: 'infected__item up',
    itemDown: 'infected__item down',
    itemEquals: 'infected__item equals',
    button:
      'infected__button',
    homeButton:
      'infected__home-button',
  }

const StaticsCovidInfectedList = ({region}) => {


  const { data = [] } =
    useContent({
        source: 'get-spreadsheet-covid',
        query: {
        title: 'Contagiados ' + region.charAt(0).toUpperCase() + region.slice(1) + ' API',
        },
    }) || {}

  const grupos = []

  data.map((element) => {
    if(typeof(grupos[element.grupo]) === 'undefined'){
      grupos[element.grupo] = [];
    }
    if(element.dist_prov !== null && element.dist_prov !== ""){
      grupos[element.grupo].push({"nombre": element.dist_prov, "slug": element.slug, "estado": element.estado})
    }
    return 
  })

  let lista = [];
   
  for(let clave in grupos){
    let grupo = grupos[clave]
    
    const distritos = grupo.map((dist) => {
      let infClass = classes.itemEquals
      if(dist.estado === "(+)") infClass = classes.itemUp
      if(dist.estado === "(-)") infClass = classes.itemDown

      const link = `/covid-19/contagiados/${region}/${dist.slug}`
      
      return <li className={infClass}><a href={link} alt={dist.nombre} title={dist.nombre}>{dist.nombre}</a></li>
    })
    lista.push(<><li className={classes.regionTitle}>{clave}</li>{distritos}</>)
  }

  return (
  <div className={classes.wrapper}>
    <h1 className={classes.title}>Contagiados</h1>
    <h2 className={classes.subtitle}>Elige tu departamento</h2>
    <div className={classes.buttonWrapper}>
      <a className={classes.button} href="/covid-19/contagiados/lima/">Lima</a>
      <a className={classes.button} href="/covid-19/contagiados/nacional/">Nacional</a>
    </div>
    <div className={classes.sectionsWrapper}>
      <a className={classes.closeButton} href="/covid-19/"></a>
      <ul className={classes.regionsWrapper}>
        {lista}
      </ul>
    </div>
    <a className={classes.homeButton} href="/covid-19/">Inicio</a>
  </div>
  )
}

export default StaticsCovidInfectedList