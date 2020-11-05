import React, { useState, useRef } from 'react'

const classes = {
  box: 'flow-1x1',
  match: 'flow-match',
  end_match: 'flow-match flow-last',
  header: 'match-header',
  group: 'group',
  stadium: 'stadium-name',
  icon_camp: 'icon-camp',
  date: 'match-date',
  teams: 'match-teams',
  form: 'frm frm-score ui-validate',
  form_row: 'row ui-row ui-form-row',
  team_text: 'team-txt',
  team_score: 'team-score',
  input: 'input_default',
  vs: 'team-vs',
  send: 'game-link',
  edit_send: 'game-link edit',
  disable_send: 'game-link disable',
}

const MatchBox = ({
  id,
  estadio,
  fecha,
  equipo1,
  equipo1Bandera,
  equipo1Goles,
  equipo2,
  equipo2Bandera,
  equipo2Goles,
  estado,
  jornada,
  resultadoFinal,
  puntos,
  refreshMatchs,
  USUARIO,
  MEDIA_BASE,
  API_BASE,
}) => {
  const [match, setMatch] = useState(id)
  setMatch(id)

  const localGoles = useRef('')
  const visitaGoles = useRef('')

  let clasSend = classes.send
  let textSend = 'Pronosticar resultado'
  if (equipo1Goles !== '' && equipo2Goles !== '') {
    clasSend = classes.edit_send
    textSend = 'Editar mi pronóstico'
  }
  if (estado === 3) {
    clasSend = classes.disable_send
    textSend = 'Partido finalizado'
  }

  const registroPronostico = event => {
    const url = `${API_BASE}usuario/${USUARIO}/pronostico/${match}`
    const pronostico = `${localGoles.current.value}-${visitaGoles.current.value}`
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ pronostico }),
    }).then(response => {
      console.log(response)
      refreshMatchs()
    })
    event.preventDefault()
  }

  return (
    <div className={classes.box}>
      <div className={estado === 3 ? classes.end_match : classes.match}>
        <div className={classes.header}>
          <span className={classes.group}>{jornada}</span>
          <span className={classes.stadium}>
            <i className={classes.icon_camp}></i>
            {estadio}
          </span>
          <span className={classes.date}>{fecha}</span>
        </div>
        <form className={classes.form} onSubmit={registroPronostico}>
          <div className={classes.teams}>
            <div className={classes.form_row}>
              <span className={classes.team_text}>
                <img src={MEDIA_BASE + equipo1Bandera} alt={equipo1} />
                <strong>{equipo1}</strong>
              </span>
              <input
                type="text"
                placeholder=" - "
                ref={localGoles}
                className={classes.input}
                defaultValue={equipo1Goles}
                readOnly={estado === 3}
              />
            </div>
            <div className={classes.form_row}>
              <span className={classes.vs}>VS</span>
              {estado === 3 && (
                <span className={classes.team_text}>
                  Resultado final:<strong>{resultadoFinal}</strong>
                </span>
              )}
            </div>
            <div className={classes.form_row}>
              <input
                type="text"
                placeholder=" - "
                ref={visitaGoles}
                className={classes.input}
                defaultValue={equipo2Goles}
                readOnly={estado === 3}
              />
              <span className={classes.team_text}>
                <img src={MEDIA_BASE + equipo2Bandera} alt={equipo2} />
                <strong>{equipo2}</strong>
              </span>
            </div>

            {estado === 3 && (
              <span className={classes.team_score}>
                Haz obtenido<strong>{puntos} puntos</strong>
              </span>
            )}
          </div>
          <input type="submit" value={textSend} className={clasSend} />
        </form>
      </div>
    </div>
  )
}

export default MatchBox
