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

  // const objetoHTML = (value) => {
  //   if (value.search(/[(+]/) !== -1) {
  //     return `${value} <svg
  //     xmlns="http://www.w3.org/2000/svg"
  //     width={15.484}
  //     height={20.817}
  //     {...props}
  //   >
  //     <path fill="#54C762"
  //       d="M6.188 11.676v10.547a.844.844 0 0 0 .844.844h3.938a.844.844 0 0 0 .844-.844V11.676h3.239A1.688 1.688 0 0 0 16.244 8.8l-6.051-6.056a1.687 1.687 0 0 0-2.386 0L1.756 8.8a1.688 1.688 0 0 0 1.193 2.881Z"
  //       transform="translate(-1.258 -2.25)"
  //       style={{
  //         fill: "#54c762",
  //       }}
  //     />
  //   </svg>`
  //   }
  //   if (value.search(/[(-]/) !== -1) {
  //     return `${value} SVG2`
  //   }
  //   return value
  // }

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
                            dangerouslySetInnerHTML={{
                              __html: item.content,
                            }}
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
              <i>
                <b>Lee el informe:</b>
              </i>
              <br />
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
