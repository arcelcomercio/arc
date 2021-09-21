import * as React from 'react'

const classes = {
  contenedor: 'agenda-presidencial__nota__contenedor',

  elecont1: 'agenda-presidencial__nota__elemento__contenedor1',
  eleparrafo: 'agenda-presidencial__nota__elemento__parrafo',
  linea: 'agenda-presidencial__nota__linea',
  eleindicador: 'agenda-presidencial__nota__elemento__indicador',

  elecont2: 'agenda-presidencial__nota__elemento__contenedor2',
  elecaja: 'agenda-presidencial__nota__elemento__caja',
  vernota: 'agenda-presidencial__nota__vernota',
  informe: 'agenda-presidencial__nota__informe',
}

const AgendaNota = (props) => {
  const { dataNota = '', titleUpDown = '' } = props
  return (
    <>
      <div className={classes.contenedor}>
        <div className={classes.elecont1}>
          <ul>
            {dataNota &&
              dataNota !== undefined &&
              dataNota.content_elements !== undefined && (
                <>
                  {dataNota.content_elements.map((element) => (
                    <>
                      {element.type === 'text' && (
                        <li
                          className={classes.eleparrafo}
                          key={element._id}
                          dangerouslySetInnerHTML={{ __html: element.content }}
                        />
                      )}
                    </>
                  ))}
                </>
              )}
            <hr className={classes.linea} />
            <li className={classes.eleindicador}>{titleUpDown}</li>
            {dataNota &&
              dataNota !== undefined &&
              dataNota.content_elements !== undefined && (
                <>
                  {dataNota.content_elements.map((element) => (
                    <>
                      {element.type === 'list' &&
                        element.list_type === 'unordered' &&
                        element.items.map((item) => (
                          <li
                            className={`${classes.eleindicador}`}
                            style={{ listStyle: 'none', paddingBottom: '15px' }}
                            key={item.content}
                            dangerouslySetInnerHTML={{ __html: item.content }}
                          />
                        ))}
                    </>
                  ))}
                </>
              )}
          </ul>
        </div>

        <div className={classes.elecont2}>
          <div className={classes.elecaja}>
            <span className={classes.informe}>
              <b>Lee el informe:</b> <br />
              {dataNota &&
                dataNota !== undefined &&
                dataNota.content_elements !== undefined && (
                  <>
                    {dataNota.content_elements.map((element) => (
                      <>
                        {element.type === 'interstitial_link' &&
                          element.content}
                      </>
                    ))}
                  </>
                )}
            </span>
            {dataNota &&
              dataNota !== undefined &&
              dataNota.content_elements !== undefined && (
                <>
                  {dataNota.content_elements.map((element) => (
                    <>
                      {element.type === 'interstitial_link' && (
                        <a className={classes.vernota} href={element.url}>
                          Ver nota
                        </a>
                      )}
                    </>
                  ))}
                </>
              )}
          </div>
        </div>
      </div>
    </>
  )
}

export default AgendaNota
