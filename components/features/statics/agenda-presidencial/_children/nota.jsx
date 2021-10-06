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

  const objetoHTML = (value) => {
    if (value.search(/[+]/) !== -1) {
      return `${value}&nbsp;&nbsp;<svg
    xmlns="http://www.w3.org/2000/svg"
    width={15.484}
    height={20.817}
    viewBox="0 0 512 512"
    style={{
      enableBackground: "new 0 0 512 512",
    }}
    xmlSpace="preserve"
    {...props}
  >
    <path fill="#54C762"
      style={{
        fill: "#54C762",
      }}
      d="M263.169 3.051A10.666 10.666 0 0 0 255.617 0a10.669 10.669 0 0 0-7.552 3.136L35.286 216.555a10.667 10.667 0 0 0 7.552 18.112h117.333v266.667c0 5.891 4.776 10.667 10.667 10.667h170.667c5.891 0 10.667-4.776 10.667-10.667V234.667h116.885a10.667 10.667 0 0 0 7.552-18.219L263.169 3.051z"
    />
  </svg>`
    }
    if (value.search(/[(-]/) !== -1) {
      return `${value}&nbsp;&nbsp;<svg
    xmlns="http://www.w3.org/2000/svg"
    width={15.484}
    height={20.817}
    viewBox="0 0 512.171 512.171"
    style={{
      enableBackground: "new 0 0 512.171 512.171",
    }}
    xmlSpace="preserve"
    {...props}
  >
    <path fill="#F73910" d="M479.046 283.925c-1.664-3.989-5.547-6.592-9.856-6.592H352.305V10.667C352.305 4.779 347.526 0 341.638 0H170.971c-5.888 0-10.667 4.779-10.667 10.667v266.667H42.971a10.702 10.702 0 0 0-9.856 6.571c-1.643 3.989-.747 8.576 2.304 11.627l212.8 213.504c2.005 2.005 4.715 3.136 7.552 3.136s5.547-1.131 7.552-3.115l213.419-213.504a10.645 10.645 0 0 0 2.304-11.628z" />
  </svg>`
    }

    return value
  }

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
                              __html: objetoHTML(item.content),
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
