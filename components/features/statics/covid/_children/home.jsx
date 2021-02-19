import * as React from 'react'

/**
 * @see estilos `src/websites/elcomercio/scss/components/statics/covid/_home.scss`
 */

const Home = ({
  fecha = '',
  contagiados = 0,
  recuperados = 0,
  fallecidos = 0,
  uci = 0,
  vacunados = 0,
}) => {
  const classes = {
    Home: 'home',
    Block: 'home__block',
    Title: 'home__title',
    SubTitle: 'home__subtitle',
    SubTitleN: 'home__subtitleNumber',
    Tick: 'tick',
    BlockBtnRed: 'home__BlockbuttonRed',
    BtnRed: 'home__buttonRed',
  }
  /*
        window.addEventListener('DOMContentLoaded', () => {requestIdle(() => {
            Tick.DOM.parse(document.body)
            const urlContagiados = document.querySelector(".cls_contagiados")
            const urlCamasUCI = document.querySelector(".cls_camas_uci")
            const urlPlus = document.querySelector(".cls_plus")
            urlContagiados.addEventListener("click", () => {
                window.location = '/covid/contagiados/'
            })
            urlCamasUCI.addEventListener("click", () => {
                window.location = '/covid/camas-uci/'
            })
            urlPlus.addEventListener("click", () => {
                window.location = '/covid/mas-informacion/'
            })

            const myts = document.getElementsByClassName("tick");
            for (let i = 0; i < myts.length; i++) {
                const cmyt = myts[i].children[0].children.length;
                if(myts[i].children[0].children[cmyt-3]){
                    myts[i].children[0].children[cmyt-3].style.marginLeft = '10px'; 
                }
                if(myts[i].children[0].children[cmyt-6]){
                    myts[i].children[0].children[cmyt-6].style.marginLeft = '10px'; 
                }
            }
        })})
    */
  const NewsCustomJs = `"use strict";window.addEventListener("DOMContentLoaded",function(){requestIdle(function(){Tick.DOM.parse(document.body);var e=document.querySelector(".cls_contagiados"),n=document.querySelector(".cls_camas_uci"),c=document.querySelector(".cls_plus");e.addEventListener("click",function(){window.location="/covid/contagiados/"}),n.addEventListener("click",function(){window.location="/covid/camas-uci/"}),c.addEventListener("click",function(){window.location="/covid/mas-informacion/"});for(var i=document.getElementsByClassName("tick"),t=0;t<i.length;t++){var d=i[t].children[0].children.length;i[t].children[0].children[d-3]&&(i[t].children[0].children[d-3].style.marginLeft="10px"),i[t].children[0].children[d-6]&&(i[t].children[0].children[d-6].style.marginLeft="10px")}})});`

  return (
    <>
      <link
        rel="stylesheet"
        href="https://d1ts5g4ys243sh.cloudfront.net/proyectos_especiales_prod/especiales/elementos-comunes/css/countflip.css"
      />
      <div className={classes.Home}>
        <div className={classes.Block}>
          <span className={classes.Title}>El Coronavirus en Perú</span>
          <span className={classes.SubTitle}>{fecha}</span>
        </div>
        <div className={classes.BlockBtnRed}>
          <button type="button" className={`${classes.BtnRed} cls_contagiados`}>
            Contagiados
          </button>
          <button type="button" className={`${classes.BtnRed} cls_camas_uci`}>
            Camas UCI
          </button>
          <button type="button" className={`${classes.BtnRed} cls_plus`}>
            +
          </button>
        </div>
        <div className={classes.Block}>
          <div className={classes.Tick} data-value={contagiados}>
            <div data-repeat="true" aria-hidden="true">
              <span data-view="flip"></span>
            </div>
          </div>
          <span className={classes.SubTitleN}>Total de contagiados</span>

          <div className={classes.Tick} data-value={recuperados}>
            <div data-repeat="true" aria-hidden="true">
              <span data-view="flip"></span>
            </div>
          </div>
          <span className={classes.SubTitleN}>Total de recuperados</span>

          <div className={classes.Tick} data-value={fallecidos}>
            <div data-repeat="true" aria-hidden="true">
              <span data-view="flip"></span>
            </div>
          </div>
          <span className={classes.SubTitleN}>Fallecidos</span>

          <div className={classes.Tick} data-value={uci}>
            <div data-repeat="true" aria-hidden="true">
              <span data-view="flip"></span>
            </div>
          </div>
          <span className={classes.SubTitleN}>Camas UCI disponibles</span>

          <div className={classes.Tick} data-value={vacunados}>
            <div data-repeat="true" aria-hidden="true">
              <span data-view="flip"></span>
            </div>
          </div>
          <span className={classes.SubTitleN}>Total de vacunados</span>
        </div>
      </div>
      <script src="https://d1ts5g4ys243sh.cloudfront.net/proyectos_especiales_prod/especiales/elementos-comunes/js/countflip.min.js"></script>
      <script
        type="text/javascript"
        dangerouslySetInnerHTML={{
          __html: NewsCustomJs,
        }}
      />
    </>
  )
}

export default Home
