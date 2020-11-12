import React, { useState, useEffect } from 'react'
import ENV from 'fusion:environment'
import MatchBox from './_children/item'
import customFields from './_dependencies/custom-fields'

const classes = {
  grid: 'flows-grid box-secundary clearfix',
  column: 'column',
  title: 'box-subtitle',
  form: 'frm frm-partidos ui-validate',
}

// const SIGNWALL = 'https://trome.pe/signwall/?outputType=signwall&signwallOrganic=1'
const MEDIA_BASE = 'https://resultadosopta.minoticia.pe/'
const ANONIMO = '6f3015f2281091770eb7b700b87b547883b03bd916e5b705cc7dd70ae63ba89c'
// const USUARIO = 'f7b1822e77b2091584248e377df3fe50f32082e3'
// const API_BASE = 'http://localhost:8000/depor/'

let API_BASE = 'https://dsnvo9xv4g.execute-api.us-east-1.amazonaws.com/dev/depor/'
if(ENV.ENVIRONMENT === 'elcomercio'){
  API_BASE = 'https://pmdu68gci6.execute-api.us-east-1.amazonaws.com/prod/depor/'
}

const Polla = (props) => {

  const {
    customFields: { 
      anonymous = false, 
      firstWeek = 1, 
      closeForecastMatchs = '', 
      intervalTime = 30
    } = {}
  } = props

  let USUARIO = ANONIMO

  const getLoggedUser = () => {
    let userId = null
    if(window.localStorage && window.localStorage.hasOwnProperty('ArcId.USER_INFO') && window.localStorage.getItem('ArcId.USER_INFO') !== '{}'){
      const UUID_USER = JSON.parse(window.localStorage.getItem('ArcId.USER_INFO')).uuid;
      // if(COUNT_USER && COUNT_USER.sub.p.length) { isPremium = true }
      if(UUID_USER){ 
          userId = UUID_USER
      }
    }
    return userId;
  }

  const [matchs, setMatchs] = useState([])
  const [validLoad, setValidLoad] = useState(false)
  const [refreshInterval, setRefreshInterval] = useState(intervalTime)

  const getRemoteMatchs = () => {
    fetch(`${API_BASE}usuario/${USUARIO}/partidos?v=${new Date().getTime()}`)
      .then(response => response.json())
      .then(data => {
        if(typeof(data.mensaje) !== "undefined" && data.mensaje === "ok"){
          setValidLoad(true)
          setMatchs(data.losPartidos)
        }else{
          fetch(`${API_BASE}usuario/${ANONIMO}/partidos?v=${new Date().getTime()}`)
          .then(response => response.json())
          .then(data2 => {
            if(typeof(data2.mensaje) !== "undefined" && data2.mensaje === "ok"){
              setValidLoad(true)
              setMatchs(data2.losPartidos)
            }
          })
        }
      })
  }

  if(typeof window !== "undefined"){
    if(anonymous !== true){
      USUARIO = getLoggedUser()
    }

    if(validLoad === false && USUARIO !== null){
      getRemoteMatchs()
    }
  }

  useEffect(() => {
    let interval = null
    if (refreshInterval && refreshInterval > 0) {
      interval = setInterval(getRemoteMatchs, refreshInterval*1000);
    }
    return () => clearInterval(interval);
  });

  const confs = { API_BASE, USUARIO, MEDIA_BASE }

  let jornadaActual = 0
  const closeMatchs = closeForecastMatchs.split(',')
  let title = false
  let weekView = false
  // let iMatchView = 0
  const styleTitle = {
    clear: 'both'
  }
  return (
    <div className={classes.grid}>
      <form className={classes.form}>
        <div className={classes.column}>
          <h2 className={classes.title}>Todos los partidos</h2>
        </div>
      </form>
      {matchs &&
        matchs.map((match) => {
          title = false
          weekView = false
          let matchStatus = match.estado
          if(jornadaActual < match.jornada){
            title = true
            jornadaActual = match.jornada
          }

          if(match.jornada >= firstWeek){
            weekView = true
            // iMatchView += 1
          }

          if((match.estado === 0 || match.estado === 1) && closeMatchs.includes(match.id)){
            matchStatus = 2
          }

          // console.log(`======${match.jornada} - Match=====`)
          // console.log(`${match.equipo1} / ${match.equipo2} -> Estado: ${match.estado} / matchStatus: ${matchStatus}`)
          // console.log("=============================")
          return (
            (weekView) && (
              <>
              {(title === true) && (
                <><div style={styleTitle}></div><h2 className="journeyTitle">Fecha {match.jornada}</h2></>
              )}
              <MatchBox
                key={match.id}
                matchStatus={matchStatus}
                refreshMatchs={getRemoteMatchs}
                {...confs}
                {...match}
              />
              </>
            )
          )
      })}
    </div>
  )
}

Polla.propTypes = {
  customFields,
}

Polla.label = 'La Polla - Listado'
Polla.static = false

export default Polla
