import React, { useState } from 'react'
import MatchBox from './_children/item'

const classes = {
  grid: 'flows-grid box-secundary clearfix',
  column: 'column',
  title: 'box-subtitle',
  form: 'frm frm-partidos ui-validate',
}

// const SIGNWALL = 'https://trome.pe/signwall/?outputType=signwall&signwallOrganic=1'
const MEDIA_BASE = 'https://resultadosopta.minoticia.pe/'
// const USUARIO = '6f3015f2281091770eb7b700b87b547883b03bd916e5b705cc7dd70ae63ba89c'
// const USUARIO = 'f7b1822e77b2091584248e377df3fe50f32082e3'
// const API_BASE = 'http://localhost:8000/depor/'
const API_BASE =
  'https://pmdu68gci6.execute-api.us-east-1.amazonaws.com/prod/depor/'

const Polla = () => {

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

  let USUARIO = null
  if(typeof window !== "undefined"){
    USUARIO = getLoggedUser()
  }

  const confs = { API_BASE, USUARIO, MEDIA_BASE }

  const getRemoteMatchs = () => {
    fetch(`${API_BASE}usuario/${USUARIO}/partidos?v=${new Date().getTime()}`)
      .then(response => response.json())
      .then(data => {
        setMatchs(data.losPartidos)
      })
  }

  if(matchs.length === 0 && USUARIO !== null){
      getRemoteMatchs()
  }

  return (
    <div className={classes.grid}>
      <form className={classes.form}>
        <div className={classes.column}>
          <h2 className={classes.title}>Todos los partidos</h2>
        </div>
      </form>
      {matchs &&
        matchs.map(match => {
          return (
            <MatchBox
              key={match.id}
              refreshMatchs={getRemoteMatchs}
              {...confs}
              {...match}
            />
          )
        })}
    </div>
  )
}

Polla.label = 'La Polla - Listado'
Polla.static = false

export default Polla
