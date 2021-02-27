import * as React from 'react'

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

const StaticsCovidInfected = ({data}) => {
  const grupos = []

  data.map((element) => {
    if(typeof(grupos[element.grupo]) === 'undefined'){
      grupos[element.grupo] = [];
    }
    grupos[element.grupo].push({"nombre": element.dist_prov, "slug": element.dist_slug, "estado": element.estado})
  })

  let lista = [];
   
  for(let clave in grupos){
    let grupo = grupos[clave]
    let distritos = []
    
    grupo.map((dist) => {
      let infClass = classes.itemEquals
      if(dist.estado === "(+)") infClass = classes.itemUp
      if(dist.estado === "(-)") infClass = classes.itemDown
      
      distritos.push(<li className={infClass}><a href="/covid-19/contagiados/{dist.slug}/">{dist.nombre}</a></li>)
    })
    lista.push(<><li className={classes.regionTitle}>{clave}</li>{distritos}</>)
  }

  return (
  <div className={classes.wrapper}>
    <a className={classes.closeButton} href="/covid-19/">X</a>
    <h1 className={classes.title}>Contagiados</h1>
    <h2 className={classes.subtitle}>Elige tu departamento</h2>
    <div className={classes.buttonWrapper}>
      <a className={classes.button} href="/covid-19/contagiados/lima/">Lima</a>
      <a className={classes.button} href="/covid-19/contagiados/nacional/">Nacional</a>
    </div>
    <div className={classes.sectionsWrapper}>
      <ul className={classes.regionsWrapper}>
        {lista}
      </ul>
    </div>
    <a className={classes.homeButton} href="/covid-19/">Inicio</a>
  </div>
  )
}

export default StaticsCovidInfected
