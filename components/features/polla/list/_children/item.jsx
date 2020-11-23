import React, { useRef, useState } from 'react'

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
  saveButton: 'game-link save',
  disable_send: 'game-link disable',
}

const MatchBox = ({
  id,
  estadio,
  // fecha,
  timestamp,
  equipo1,
  equipo1Bandera,
  equipo1Goles,
  equipo2,
  equipo2Bandera,
  equipo2Goles,
  // estado,
  jornada,
  resultadoFinal,
  puntos,
  // refreshMatchs,
  matchStatus,
  USUARIO,
  MEDIA_BASE,
  API_BASE,
}) => {
  const estado = matchStatus

  const localGoles = useRef('')
  const visitaGoles = useRef('')

  const MSG_SAVE_PROGNOSTIC = 'Pronóstico guardado'
  const MSG_EDIT_PROGNOSTIC = 'Editar mi pronóstico'
  const [styleButton, setStyleButton] = useState('')
  const [labelItem, setLabelItem] = useState('')

  let clasSend = classes.send
  let textSend = 'Pronosticar resultado'
  if (equipo1Goles !== '' && equipo2Goles !== '') {
    clasSend = classes.edit_send
    textSend = MSG_EDIT_PROGNOSTIC
  }
  if (estado === 2) {
    clasSend = classes.disable_send
    textSend = 'Pronóstico cerrado'
  }
  if (estado === 3) {
    clasSend = classes.disable_send
    textSend = 'Partido finalizado'
  }

  const estadioName = estadio.replace('Estadio', 'Est.')

  const dateObj = new Date(timestamp * 1000)
  const dateLabel = `${dateObj.getDate()}/${dateObj.getMonth() + 1}`

  const registroPronostico = event => {
    if (estado === 0 || estado === 1) {
      const url = `${API_BASE}usuario/${USUARIO}/pronostico/${id}`
      const pronostico = `${localGoles.current.value || '0'}-${visitaGoles
        .current.value || '0'}`
      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ pronostico }),
      })
        .then(response => {
          return response.json()
        })
        .then(data => {
          if (data.resultado === true) {
            // refreshMatchs()
            setLabelItem(MSG_SAVE_PROGNOSTIC)
            setStyleButton(classes.saveButton)
            setTimeout(() => {
              setStyleButton(classes.edit_send)
              setLabelItem(MSG_EDIT_PROGNOSTIC)
            }, 2000)
          }
        })
    }
    event.preventDefault()
  }

  return (
    <div className={classes.box} uuid={id}>
      <div
        className={
          estado === 3 || estado === 2 ? classes.end_match : classes.match
        }>
        <div className={classes.header}>
          <span className={classes.group}>{jornada}</span>
          <span className={classes.stadium}>
            <i className={classes.icon_camp}></i>
            {estadioName}
          </span>
          <span className={classes.date}>{dateLabel}</span>
        </div>
        <form className={classes.form} onSubmit={registroPronostico}>
          <div className={classes.teams}>
            <div className={classes.form_row}>
              <span className={classes.team_text}>
                <img src={MEDIA_BASE + equipo1Bandera} alt={equipo1} />
                <strong>{equipo1}</strong>
              </span>
              <input
                type="number"
                max="99"
                min="0"
                placeholder=" - "
                ref={localGoles}
                className={classes.input}
                defaultValue={equipo1Goles}
                readOnly={estado === 2 || estado === 3}
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
                type="number"
                max="99"
                min="0"
                placeholder=" - "
                ref={visitaGoles}
                className={classes.input}
                defaultValue={equipo2Goles}
                readOnly={estado === 2 || estado === 3}
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
          <input
            type="submit"
            value={labelItem || textSend}
            className={styleButton || clasSend}
          />
        </form>
      </div>
    </div>
  )
}

export default MatchBox
