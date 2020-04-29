/* TODO: Agregar la lógica sin minificar de este script, no son iguales
const fetchLive = () => {
  const partido = document.getElementsByTagName("mxm-partido")[0]
  const tagLive =
    document.getElementsByTagName('mxm-partido')[0] ||
    document.getElementsByTagName('mxm-evento')[0]
  if (tagLive.getAttribute('admin') === 'false') {
    const createScript = ({ src, async, defer, textContent = '', jquery }) => {
      const node = document.createElement('script')
      if (src) {
        node.type = 'text/javascript'
        node.src = src
      }
      if (async) {
        node.async = true
      }
      if (defer) {
        node.defer = true
      }
      if (jquery) {
        node.setAttribute(
          'integrity',
          'sha256-BbhdlvQf/xTY9gja0Dq3HiwQF8LaCRTXxZKRutelT44='
        )
        node.setAttribute('crossorigin', 'anonymous')
      }
      node.textContent = textContent
      return document.body.append(node)
    }

    createScript({
      src:
        'https://w.ecodigital.pe/components/elcomercio/mxm/mxm.bundle.js?v=1.7',
      async: true,
    })

    createScript({
      src: 'https://code.jquery.com/jquery-2.2.4.min.js',
      async: true,
      jquery: true,
    })

    const gameStatus = (status = '-') => {
      const cases = {
        PT: '1ER TIEMPO',
        ST: '2DO TIEMPO',
        PTS: '1ER TIEMPO SUPL.',
        STS: '2DO TIEMPO SUPL.',
        Final: '',
        PENALES: 'PENALES',
        ENTRETIEMPO: 'ENTRETIEMPO',
        default: '',
      }
      return cases[status] || cases.default
    }
    const getTimeRender = (time = '') => {
      if (time !== '' && time !== 'PENALES' && time !== 'ENTRETIEMPO')
        return time
      if (time === 'ENTRETIEMPO') return 'ET'
      return '-'
    }

    const defaultValue = '-'

    function runScorer() {
      // eslint-disable-next-line no-undef
      const instances = getMxmInstances()
      const key = Object.keys(instances)[0]

      instances[key].pubsub.on('data', function(data) {
        const equipos = (data && data.match && data.match[0]) || {}
        const { time, tiempo, info, publicidad = {} } = data || {}
        if(partido){
        document.getElementById('tiempo').innerHTML = gameStatus(tiempo)
         document.getElementById('info').innerHTML = info
        document.getElementById('game-status-time').innerHTML = getTimeRender(
          time
        )
        document.getElementById('bandera_local').src = equipos.bandera_local
        document.getElementById('local').innerHTML =
          equipos.local || defaultValue
        document.getElementById('visitante').innerHTML =
          equipos.visitante || defaultValue
        document.getElementById('goles_local').innerHTML = equipos.goles_local
        document.getElementById('goles_visitante').innerHTML =
          equipos.goles_visitante || defaultValue
        document.getElementById('bandera_visitante').src =
          equipos.bandera_visitante
        }

       

        document.getElementById('srcset_320').srcSet =
          publicidad.img_publ_320x52
        document.getElementById('srcset_637').srcSet = publicidad.img_publ_637x70
        document.getElementById('srcset_493').srcSet = publicidad.img_publ_493x97
        document.getElementById('srcset_675').srcSet = publicidad.img_publ_675x97
        document.getElementById('scorer-image').src = publicidad.img_publ_675x97
      })
    }

    window.on_mxm_loaded = function(instances) {
      window.getMxmInstances = () => {
        return instances
      }
    }

    // eslint-disable-next-line consistent-return
    const waitjQueryAndMxm = () => {
      let timeout = 100
      if (window.jQuery) {
        if (document.querySelector('.mxm-input')) {
          runScorer()
          return true
        }
        timeout = 1000
      }
      setTimeout(waitjQueryAndMxm, timeout)
    }

    waitjQueryAndMxm()
  }
}
*/

// eslint-disable-next-line import/prefer-default-export
export const fetchLive =
  '"use strict";var partido=document.getElementsByTagName("mxm-partido")[0];var tagLive=document.getElementsByTagName("mxm-partido")[0]||document.getElementsByTagName("mxm-evento")[0];if(tagLive.getAttribute("admin")==="false"){var runScorer=function runScorer(){var instances=getMxmInstances();var key=Object.keys(instances)[0];instances[key].pubsub.on("data",function(data){var equipos=data&&data.match&&data.match[0]||{};var _ref2=data||{},time=_ref2.time,tiempo=_ref2.tiempo,info=_ref2.info,_ref2$publicidad=_ref2.publicidad,publicidad=_ref2$publicidad===void 0?{}:_ref2$publicidad;if(partido){document.getElementById("tiempo").innerHTML=gameStatus(tiempo);document.getElementById("info").innerHTML=info;document.getElementById("game-status-time").innerHTML=getTimeRender(time);document.getElementById("bandera_local").src=equipos.bandera_local;document.getElementById("local").innerHTML=equipos.local||defaultValue;document.getElementById("visitante").innerHTML=equipos.visitante||defaultValue;document.getElementById("goles_local").innerHTML=equipos.goles_local;document.getElementById("goles_visitante").innerHTML=equipos.goles_visitante||defaultValue;document.getElementById("bandera_visitante").src=equipos.bandera_visitante}document.getElementById("srcset_320").srcSet=publicidad.img_publ_320x52;document.getElementById("srcset_637").srcSet=publicidad.img_publ_637x70;document.getElementById("srcset_493").srcSet=publicidad.img_publ_493x97;document.getElementById("srcset_675").srcSet=publicidad.img_publ_675x97;document.getElementById("scorer-image").src=publicidad.img_publ_675x97})};var createScript=function createScript(_ref){var src=_ref.src,async=_ref.async,defer=_ref.defer,_ref$textContent=_ref.textContent,textContent=_ref$textContent===void 0?"":_ref$textContent,jquery=_ref.jquery;var node=document.createElement("script");if(src){node.type="text/javascript";node.src=src}if(async){node.async=!0}if(defer){node.defer=!0}if(jquery){node.setAttribute("integrity","sha256-BbhdlvQf/xTY9gja0Dq3HiwQF8LaCRTXxZKRutelT44=");node.setAttribute("crossorigin","anonymous")}node.textContent=textContent;return document.body.append(node)};createScript({src:"https://w.ecodigital.pe/components/elcomercio/mxm/mxm.bundle.js?v=1.7",async:!0});createScript({src:"https://code.jquery.com/jquery-2.2.4.min.js",async:!0,jquery:!0});var gameStatus=function gameStatus(){var status=arguments.length>0&&arguments[0]!==undefined?arguments[0]:"-";var cases={PT:"1ER TIEMPO",ST:"2DO TIEMPO",PTS:"1ER TIEMPO SUPL.",STS:"2DO TIEMPO SUPL.",Final:"",PENALES:"PENALES",ENTRETIEMPO:"ENTRETIEMPO",default:""};return cases[status]||cases.default};var getTimeRender=function getTimeRender(){var time=arguments.length>0&&arguments[0]!==undefined?arguments[0]:"";if(time!==""&&time!=="PENALES"&&time!=="ENTRETIEMPO")return time;if(time==="ENTRETIEMPO")return"ET";return"-"};var defaultValue="-";window.on_mxm_loaded=function(instances){window.getMxmInstances=function(){return instances}};var waitjQueryAndMxm=function waitjQueryAndMxm(){var timeout=100;if(window.jQuery){if(document.querySelector(".mxm-input")){runScorer();return!0}timeout=1000}setTimeout(waitjQueryAndMxm,timeout)};waitjQueryAndMxm()}'
