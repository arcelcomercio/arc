import * as React from 'react'

import Image from '../../../../global-components/image'

const classes = {
  contenedor: 'agenda-presidencial__nota__contenedor',

  elecont1: 'agenda-presidencial__nota__elemento__contenedor1',
  eleparrafo: 'agenda-presidencial__nota__elemento__parrafo',
  eleimage: 'agenda-presidencial__nota__elemento__image',
  elecaption: 'agenda-presidencial__nota__elemento__caption',

  linea: 'agenda-presidencial__nota__linea',
  eleindicador: 'agenda-presidencial__nota__elemento__indicador',

  elecont2: 'agenda-presidencial__nota__elemento__contenedor2',
  elecaja: 'agenda-presidencial__nota__elemento__caja',
  vernota: 'agenda-presidencial__nota__vernota',
  informe: 'agenda-presidencial__nota__informe',
  linea2: 'agenda-presidencial__nota__linea2',
  ecdata: 'agenda-presidencial__nota__ecdata',
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
                      {element.type === 'text' && element.content !== '<br/>' && (
                        <li
                          className={classes.eleparrafo}
                          key={element._id}
                          dangerouslySetInnerHTML={{
                            __html: element.content,
                          }}
                        />
                      )}

                      {element.type === 'image' && (
                        <>
                          <Image
                            className={classes.eleimage}
                            key={element._id}
                            src={element.url}
                            alt="fuente el comercio"
                            loading="lazy"
                            width={410}
                            height={260}
                          />
                          <div
                            className={classes.elecaption}
                            key={element._id}
                            dangerouslySetInnerHTML={{
                              __html: element.caption,
                            }}
                          />
                        </>
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
          <hr className={classes.linea2} />
          <div className={classes.ecdata}>
            <svg width={123.735} height={25.356}>
              <g data-name="Grupo 226">
                <g data-name="Grupo 224">
                  <path
                    data-name="Trazado 110"
                    d="M12.985 25.356A12.681 12.681 0 1 0 .004 12.677a12.834 12.834 0 0 0 12.985 12.678"
                    fill="#0a0a0b"
                  />
                  <path
                    data-name="Trazado 111"
                    d="m20.665 16.471-.288.244a10.348 10.348 0 0 1-2.908 1.651 7.928 7.928 0 0 1-2.982.542l-.568-.01V6.555a4.988 4.988 0 0 0 2.623.718c1.524 0 2.9-1.03 3.979-2.572l-.414-.216a2.428 2.428 0 0 1-1.94 1 6.81 6.81 0 0 1-3.351-1.353l-5.27 4.292v5.141a6.967 6.967 0 0 1-.129 2.023 2.636 2.636 0 0 1-.549.689 6.82 6.82 0 0 1-1.577-4.317 6.426 6.426 0 0 1 1.063-3.554A8.643 8.643 0 0 1 10.78 5.88l.154-.1-.286-.3-.137.081a12.835 12.835 0 0 0-3.962 3.1 7.82 7.82 0 0 0-1.537 4.643 7.946 7.946 0 0 0 1.087 3.951 7.471 7.471 0 0 0 3.017 2.949 8.582 8.582 0 0 0 4.1 1.027 9.423 9.423 0 0 0 2.952-.489 8.445 8.445 0 0 0 2.548-1.312 8.885 8.885 0 0 0 2-2.329l.245-.375Zm-7.267 2.352a7.322 7.322 0 0 1-2.295-.683 6.721 6.721 0 0 1-1.943-1.51 21.19 21.19 0 0 0 2.368-2.216 2.529 2.529 0 0 0 .568-.958 5.04 5.04 0 0 0 .11-1.321V7.057l1.192-1Z"
                    fill="#fff"
                  />
                </g>
                <g data-name="Grupo 225">
                  <path
                    data-name="Trazado 112"
                    d="m40.459 17.54 1.512-.392V7.071l-1.512-.392v-2.56h14.126l.188 5.073h-3l-.8-2.19h-3.708v3.6h1.063l.354-1.314h2.409v5.419h-2.409l-.354-1.361h-1.063v3.874h3.755l1.087-2.675h3.047l-.213 5.558H40.459Z"
                  />
                  <path
                    data-name="Trazado 113"
                    d="M56.005 12.214c0-6.2 4.37-8.372 8.787-8.372a17.167 17.167 0 0 1 5.292.739l.165 4.981h-3.308l-.684-2.1a3.48 3.48 0 0 0-1.56-.323c-2.267 0-2.975 1.683-2.975 4.612 0 4.381.874 5.327 3.094 5.327a3.36 3.36 0 0 0 1.677-.392l.685-2.145h3.259l-.236 4.912a15.373 15.373 0 0 1-5.858.922c-4.747.002-8.338-2.304-8.338-8.161Z"
                  />
                  <path
                    data-name="Trazado 114"
                    d="m71.597 17.54 1.511-.392V7.071l-1.487-.392v-2.56h8.314c4.866 0 8.172 2.052 8.172 7.748 0 5.834-3.543 8.232-8.125 8.232h-8.385Zm7.984-.508c1.89 0 2.906-.922 2.906-4.843 0-4.266-1.087-5-3.024-5h-.945v9.847Z"
                  />
                  <path
                    data-name="Trazado 115"
                    d="M88.466 16.988c0-2.492 1.795-3.3 4.818-3.828l1.984-.37v-.438c0-1.084-.52-1.522-2.267-1.522a22.763 22.763 0 0 0-3.284.231V8.27a17.822 17.822 0 0 1 5.575-.876c3.33 0 4.842 1.36 4.842 4.174v5.166c0 .53.354.714.779.714h.331v2.307a5.853 5.853 0 0 1-2.692.645c-1.465 0-2.339-.438-2.741-1.5h-.118a4.328 4.328 0 0 1-3.472 1.5c-2.315 0-3.755-1.43-3.755-3.412Zm6.8.345v-2.467l-.779.023c-.8.046-1.2.461-1.2 1.429 0 .992.283 1.384 1.039 1.384a1.414 1.414 0 0 0 .942-.369Z"
                  />
                  <path
                    data-name="Trazado 116"
                    d="M102.782 16.826v-6.364h-1.251V8.271l1.7-.646.567-2.86h3.85v2.906h2.409v2.791h-2.409v5.6c0 1.014.519 1.268 1.441 1.268a3.956 3.956 0 0 0 1.086-.161v2.544a6.72 6.72 0 0 1-3.189.668c-2.668-.004-4.204-.857-4.204-3.555Z"
                  />
                  <path
                    data-name="Trazado 117"
                    d="M110.957 16.988c0-2.492 1.8-3.3 4.818-3.828l1.985-.37v-.438c0-1.084-.521-1.522-2.268-1.522a22.772 22.772 0 0 0-3.284.231V8.27a17.823 17.823 0 0 1 5.575-.876c3.33 0 4.842 1.36 4.842 4.174v5.166c0 .53.354.714.779.714h.33v2.307a5.846 5.846 0 0 1-2.692.645c-1.464 0-2.339-.438-2.74-1.5h-.117a4.332 4.332 0 0 1-3.473 1.5c-2.314 0-3.755-1.43-3.755-3.412Zm6.8.345v-2.467l-.78.023c-.8.046-1.2.461-1.2 1.429 0 .992.283 1.384 1.039 1.384a1.416 1.416 0 0 0 .944-.369Z"
                  />
                </g>
                <path
                  data-name="L\xEDnea 4"
                  fill="none"
                  stroke="#1d1d1b"
                  strokeWidth={0.5}
                  d="M32.801 3.84v16.261"
                />
              </g>
            </svg>
          </div>
        </div>
      </div>
    </>
  )
}

export default AgendaNota
