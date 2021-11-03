import * as React from 'react'

const classes = {
  main: 'elections-widget flex',
  svgA: 'elections-widget__svga',
  svgB: 'elections-widget__svgb',
  svgC: 'elections-widget__svgc',
  box: 'elections-widget__box w-full',
  header: 'elections-widget__header flex',
  figure: 'elections-widget__figure',
  figurePhoto: 'elections-widget__figure-photo',
  photo: 'elections-widget__photo',
  logo: 'elections-widget__logo',
  logoDescription: 'elections-widget__logo-description',
  logotypes: 'elections-widget__logotypes flex',
  description: 'elections-widget__description',
  graph: 'elections-widget__graph flex',
  bar: 'elections-widget__bar',
  percent: 'elections-widget__percent',
  left: 'elections-widget__left',
  right: 'elections-widget__right',
  center: 'elections-widget__center',
  text: 'elections-widget__text',
  btn: 'elections-widget__btn',
  showDesktop: 'elections-widget__show-desktop',
  showPhone: 'elections-widget__show-phone',
  dataPolitic: 'elections-widget__data-politic',
  dataBox: 'elections-widget__data-box',
}

interface PoliticaParties {
  nombre?: string
  candidato?: string
  porcentaje_votos?: number
}
interface WidgetProps {
  description?: string
  link?: string
  politicaPartiesOne?: PoliticaParties
  politicaPartiesTwo?: PoliticaParties
}

const ElectionsChildWidget: React.FC<WidgetProps> = (props) => {
  const pathImg =
    'https://cdna.elcomercio.pe/resources/dist/elcomercio/images/segundavuelta'
  const image = {
    logoOne: `${pathImg}/logo%20peru%20libre.png`,
    logoTwo: `${pathImg}/logo%20fuerza%20popular.png`,
    photoOneMovil: `${pathImg}/pedro_castillo_mobile.png`,
    photoOneDesktop: `${pathImg}/pedro_castillo_desktop.png`,
    photoTwoMovil: `${pathImg}/keiko_fujimori_mobile.png`,
    photoTwoDesktop: `${pathImg}/keiko_fujimori_desktop.png`,
  }
  const {
    link = '',
    description = '',
    politicaPartiesOne: {
      nombre = '',
      candidato = '',
      porcentaje_votos: porcentajeVotos = '',
    } = {},
    politicaPartiesTwo: {
      nombre: nombre2 = '',
      candidato: candidato2 = '',
      porcentaje_votos: porcentajeVotos2 = '',
    } = {},
  } = props
  return (
    <div className={classes.main}>
      <figure
        className={`${classes.figure} ${classes.figurePhoto} ${classes.showDesktop}`}>
        <picture>
          <source srcSet={image.photoOneMovil} media="(max-width: 640px)" />
          <img
            className={classes.photo}
            src={image.photoOneDesktop}
            alt={candidato}
          />
        </picture>
      </figure>
      <div className={classes.box}>
        <div className={classes.header}>
          <svg
            className={classes.logoDescription}
            width="223.597"
            height="22.642"
            viewBox="0 0 223.598 22.642">
            <defs>
              <clipPath id="a">
                <rect
                  style={{ fill: 'none;' }}
                  width="223.598"
                  height="22.642"
                />
              </clipPath>
            </defs>
            <rect
              className={classes.svgA}
              width="223.598"
              height="21.893"
              transform="translate(0 0.748)"
            />
            <g transform="translate(0)">
              <rect
                className={classes.svgB}
                width="0.302"
                height="21.688"
                transform="translate(223.296 0.861)"
              />
              <rect
                className={classes.svgC}
                width="118.774"
                height="21.941"
                transform="translate(0 0.701)"
              />
              <rect
                className={classes.svgB}
                width="104.836"
                height="0.302"
                transform="translate(118.762 0.702)"
              />
              <g style={{ 'clip-path': 'url(#a)' }}>
                <g transform="translate(3.297 0)">
                  <path
                    className={classes.svgA}
                    d="M166.161,431.542h-4.309v9.335c0,3.876,2.663,5.608,6.344,5.608,3.659,0,6.344-1.732,6.344-5.608v-9.335h-4.309v9.335c0,1.148-.434,2.078-2.032,2.078a1.827,1.827,0,0,1-2.033-2.078Zm5.868-2.663-1.256-2.231-3.551,2.4,1.039,1.626Zm-10.61,2.663H149.576v3.523h3.767v11.193h4.309V435.07h3.767Z"
                    transform="translate(-149.576 -426.648)"
                  />
                  <path
                    className={classes.svgA}
                    d="M287.088,436.6a18.031,18.031,0,0,0-5.52-.844c-3.075,0-5.716,1.213-5.716,4.351,0,5.5,7.341,4.525,7.341,6.369,0,.736-.909,1.018-1.819,1.018a23.154,23.154,0,0,1-5.149-.757l-.585,3.442a21.377,21.377,0,0,0,5.932.736c3.292,0,5.933-1.408,5.933-4.763,0-5.349-7.341-4.221-7.341-6.041,0-.649.585-.91,1.491-.91a16.92,16.92,0,0,1,4.547.736Zm-11.864-.628H264.548v14.722h10.783v-3.523h-6.475v-2.3h5.37v-3.523h-5.37V439.5h6.369Zm-20.2,11.193V439.5h1.626c1.8,0,2.686,1.126,2.686,3.833,0,2.686-.887,3.832-2.686,3.832Zm1.626,3.524c4.915,0,6.994-3.139,6.994-7.362s-2.079-7.362-6.994-7.362h-5.915v14.729Zm-7.431-14.717h-4.309v14.722h4.309Zm-5.889,10.458a10.115,10.115,0,0,1-3.876.949c-2.187,0-3.378-1.321-3.378-4.049,0-2.71,1.191-4.048,3.378-4.048a9.811,9.811,0,0,1,3.876.973l.779-3.252a11.38,11.38,0,0,0-5.149-1.255c-5.262,0-7.182,3.355-7.182,7.578s1.927,7.578,7.182,7.578a11.38,11.38,0,0,0,5.149-1.255Zm-11.953-10.458H220.7v14.722h10.781v-3.523h-6.472v-2.3h5.369v-3.523h-5.369V439.5h6.369Zm-20.2,11.193V439.5H212.8c1.8,0,2.685,1.126,2.685,3.833,0,2.686-.887,3.832-2.685,3.832Zm1.626,3.524c4.915,0,6.994-3.139,6.994-7.362s-2.08-7.355-7-7.355h-5.911v14.722Z"
                    transform="translate(-177.15 -431.026)"
                  />
                  <rect
                    className={classes.svgB}
                    width="104.836"
                    height="0.302"
                    transform="translate(115.465 22.341)"
                  />
                  <path
                    className={classes.svgB}
                    d="M429.89,451.227a8.1,8.1,0,0,0-2.315-.341c-1.308,0-2.353.5-2.353,1.79,0,2.415,3.863,1.69,3.863,3.331,0,.573-.473,1.158-1.55,1.158a9.206,9.206,0,0,1-2.284-.323l-.135.764a9.116,9.116,0,0,0,2.454.321c1.409,0,2.454-.652,2.454-1.99,0-2.426-3.863-1.66-3.863-3.261,0-.553.341-1.026,1.43-1.026a7.58,7.58,0,0,1,2.092.323Zm-5.544-.241h-4.354v6.839h4.4v-.783h-3.459v-2.374h2.947v-.783h-2.947V451.77h3.415Zm-9.486,0v6.839h4.265v-.783H415.8v-6.055Zm-3.794.873,1.176,3.472h-2.414l1.22-3.472Zm1.951,5.963h.976l-2.343-6.891H410.5l-2.384,6.891h.937l.612-1.79h2.747Zm-9.567-6.056h1.872a1.279,1.279,0,1,1-.091,2.557H403.45Zm4.246,6.056-1.69-2.8a1.9,1.9,0,0,0,1.467-1.983,1.991,1.991,0,0,0-2.152-2.061h-2.816v6.839h.949v-2.71h1.529l1.651,2.71Zm-6.318-6.839h-4.356v6.839h4.406v-.779h-3.461v-2.374h2.947v-.783h-2.947V451.77h3.411Zm-10.17,6.839v-3.535l-.02-1.65h.02l3.5,5.19h.924v-6.839h-.864v3.54l.02,1.74h-.02l-3.563-5.285h-.863v6.839Zm-1.992-6.839h-4.354v6.839h4.405v-.779h-3.461v-2.374h2.947v-.783h-2.947V451.77h3.41Zm-6.64,5.925a3.834,3.834,0,0,1-1.3.231c-1.449,0-2.043-1.2-2.043-2.737s.554-2.736,2.123-2.736a5.515,5.515,0,0,1,1.99.423l.171-.724a5.893,5.893,0,0,0-2.262-.483c-2.215,0-2.968,1.559-2.968,3.523s.753,3.524,2.968,3.524a5.893,5.893,0,0,0,2.262-.483v-2.96h-.949Z"
                    transform="translate(-259.613 -438.307)"
                  />
                  <path
                    className={classes.svgB}
                    d="M521.661,440.275l.786-.35-.088,1.6v8.412h4.351V435.075h-3.124l-4.108,1.748,1.092,3.868Zm-13.2,9.657h11.077v-3.562h-3.889l-2.011.2v-.044c2.776-1.857,5.571-3.779,5.571-7.122,0-2.644-1.988-4.544-5.421-4.544a13.71,13.71,0,0,0-5.331,1.092l.721,2.971a10.863,10.863,0,0,1,3.626-.7c.982,0,2.053.393,2.053,1.857,0,1.638-1.53,3.168-6.4,6.685Zm-6.86-3.342c-1.355,0-2.053-1.377-2.053-4.086,0-2.73.7-4.084,2.053-4.084s2.053,1.355,2.053,4.084c0,2.711-.7,4.086-2.053,4.086m0,3.56c4.3,0,6.4-3.388,6.4-7.647s-2.1-7.647-6.4-7.647-6.4,3.388-6.4,7.647,2.1,7.647,6.4,7.647m-18.09-.218h11.078v-3.562H490.7l-2.01.2v-.044c2.775-1.857,5.571-3.779,5.571-7.122,0-2.644-1.988-4.544-5.42-4.544a13.713,13.713,0,0,0-5.332,1.092l.721,2.971a10.857,10.857,0,0,1,3.626-.7c.984,0,2.053.393,2.053,1.857,0,1.638-1.53,3.168-6.4,6.685Z"
                    transform="translate(-310.238 -430.597)"
                  />
                  <path
                    className={classes.svgB}
                    d="M430.058,435.043a7.937,7.937,0,0,0-2.409-.366c-1.34,0-2.485.53-2.485,1.888,0,2.421,3.354,1.938,3.354,2.911,0,.377-.415.579-.948.579a9.966,9.966,0,0,1-2.274-.328l-.231,1.367a9.373,9.373,0,0,0,2.583.328c1.446,0,2.583-.626,2.583-2.08,0-2.373-3.354-1.813-3.354-2.777,0-.328.279-.52.813-.52a7.426,7.426,0,0,1,2.014.328Zm-5.285-.271h-4.635v6.554h4.684V439.92h-2.968v-1.274h2.477v-1.405h-2.477V436.18h2.92Zm-9.531,6.552v-2.156l-.038-1.435h.019l2.4,3.594h1.667v-6.554h-1.56v2.159l.038,1.6h-.02l-2.507-3.758h-1.56v6.552Zm-5.269-1.3c-.926,0-1.331-.733-1.331-1.977s.407-1.957,1.331-1.957,1.331.714,1.331,1.957-.407,1.977-1.331,1.977m0,1.406c2.159,0,3.045-1.5,3.045-3.388s-.886-3.364-3.045-3.364-3.044,1.491-3.044,3.364.886,3.388,3.044,3.388m-3.7-6.648h-1.714v6.549h1.714Zm-2.525,4.819a4.581,4.581,0,0,1-1.762.424c-1.084,0-1.609-.7-1.609-1.966s.53-1.967,1.609-1.967a4.581,4.581,0,0,1,1.762.424l.309-1.29a5.057,5.057,0,0,0-2.264-.542c-2.3,0-3.13,1.491-3.13,3.373s.828,3.373,3.13,3.373a5.058,5.058,0,0,0,2.264-.542Zm-5.473,0a4.591,4.591,0,0,1-1.762.424c-1.084,0-1.609-.7-1.609-1.966s.53-1.967,1.609-1.967a4.581,4.581,0,0,1,1.762.424l.309-1.29a5.055,5.055,0,0,0-2.264-.542c-2.3,0-3.131,1.491-3.131,3.373s.828,3.373,3.131,3.373a5.063,5.063,0,0,0,2.264-.542Zm-5.368-4.819h-4.635v6.549h4.683V439.92h-2.968v-1.274h2.473v-1.405h-2.477V436.18h2.92Zm-9.569,0v6.549h4.509V439.92h-2.794v-5.149Zm-.637,0h-4.635v6.549h4.683V439.92h-2.967v-1.274h2.477v-1.405h-2.477V436.18H382.7Z"
                    transform="translate(-259.506 -430.509)"
                  />
                </g>
              </g>
            </g>
          </svg>
          <div className={classes.description}>{description}</div>
        </div>
        <div className={classes.dataBox}>
          <figure
            className={`${classes.figure} ${classes.figurePhoto} ${classes.showPhone}`}>
            <picture>
              <source srcSet={image.photoOneMovil} media="(max-width: 640px)" />
              <img
                className={classes.photo}
                src={image.photoOneDesktop}
                alt={candidato}
              />
            </picture>
          </figure>
          <div className={classes.graph}>
            <span
              className={classes.bar}
              data-percent={`${porcentajeVotos}%`}
              style={{ width: `${porcentajeVotos}%` }}
            />
            <span className={`${classes.percent} ${classes.left} ml-5`}>
              {porcentajeVotos}%
            </span>
            <span className={`${classes.percent} ${classes.right} mr-5`}>
              {porcentajeVotos2}%
            </span>
          </div>
          <figure
            className={`${classes.figure} ${classes.figurePhoto} ${classes.showPhone}`}>
            <picture>
              <source srcSet={image.photoTwoMovil} media="(max-width: 640px)" />
              <img
                className={classes.photo}
                src={image.photoTwoDesktop}
                alt={candidato2}
              />
            </picture>
          </figure>
        </div>
        <div className={classes.logotypes}>
          <div className={`${classes.left} ${classes.dataPolitic}`}>
            <figure className={`${classes.figure}`}>
              <picture>
                <source srcSet={image.logoOne} media="(max-width: 640px)" />
                <img
                  className={classes.logo}
                  src={image.logoOne}
                  alt={nombre}
                />
              </picture>
            </figure>
            <div className={`${classes.text} ${classes.showDesktop}`}>
              <b>{candidato} /</b> {nombre}
            </div>
            <div className={`${classes.text} ${classes.showPhone} ml-5`}>
              <b>{candidato}</b>
              <span>{nombre}</span>
            </div>
          </div>
          <a href={link} className={`${classes.btn} ${classes.center}`}>
            Ver más
          </a>
          <div className={`${classes.right} ${classes.dataPolitic}`}>
            <figure className={`${classes.figure}`}>
              <picture>
                <source srcSet={image.logoTwo} media="(max-width: 640px)" />
                <img
                  className={classes.logo}
                  src={image.logoTwo}
                  alt={nombre2}
                />
              </picture>
            </figure>
            <div className={`${classes.text} ${classes.showDesktop}`}>
              {nombre2} <b>/ {candidato2}</b>
            </div>
            <div className={`${classes.text} ${classes.showPhone} mr-5`}>
              <b>{candidato2}</b>
              <span>{nombre2}</span>
            </div>
          </div>
        </div>
      </div>
      <figure
        className={`${classes.figure} ${classes.figurePhoto} ${classes.showDesktop}`}>
        <picture>
          <source srcSet={image.photoTwoMovil} media="(max-width: 640px)" />
          <img
            className={classes.photo}
            src={image.photoTwoDesktop}
            alt={candidato2}
          />
        </picture>
      </figure>
    </div>
  )
}

export default ElectionsChildWidget
