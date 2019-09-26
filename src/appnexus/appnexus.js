/* eslint-disable func-names */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-undef */
/* eslint-disable camelcase */
if (!Array.prototype.includes) {
  Object.defineProperty(Array.prototype, 'includes', {
    value: function(searchElement, fromIndex) {
      if (this == null) {
        throw new TypeError('"this" es null o no está definido')
      }

      // 1. Dejar que O sea ? ToObject(this value).
      var o = Object(this)

      // 2. Dejar que len sea ? ToLength(? Get(O, "length")).
      var len = o.length >>> 0

      // 3. Si len es 0, devuelve false.
      if (len === 0) {
        return false
      }

      // 4. Dejar que n sea ? ToInteger(fromIndex).
      //    (Si fromIndex no está definido, este paso produce el valor 0.)
      var n = fromIndex | 0

      // 5. Si n ≥ 0, entonces
      //  a. Dejar que k sea n.
      // 6. Else n < 0,
      //  a. Dejar que k sea len + n.
      //  b. Si k < 0, Dejar que k sea 0.
      var k = Math.max(n >= 0 ? n : len - Math.abs(n), 0)

      function sameValueZero(x, y) {
        return (
          x === y ||
          (typeof x === 'number' &&
            typeof y === 'number' &&
            isNaN(x) &&
            isNaN(y))
        )
      }

      // 7. Repite, mientras k < len
      while (k < len) {
        // a. Dejar que elementK sea el resultado de ? Get(O, ! ToString(k)).
        // b. Si SameValueZero(searchElement, elementK) es true, devuelve true.
        if (sameValueZero(o[k], searchElement)) {
          return true
        }
        // c. Incrementa k por 1.
        k++
      }

      // 8. Devuelve false
      return false
    },
  })
}
if (!Array.prototype.find) {
  Object.defineProperty(Array.prototype, 'find', {
    value: function(predicate) {
      // 1. Let O be ? ToObject(this value).
      if (this == null) {
        throw new TypeError('"this" is null or not defined')
      }

      var o = Object(this)

      // 2. Let len be ? ToLength(? Get(O, "length")).
      var len = o.length >>> 0

      // 3. If IsCallable(predicate) is false, throw a TypeError exception.
      if (typeof predicate !== 'function') {
        throw new TypeError('predicate must be a function')
      }

      // 4. If thisArg was supplied, let T be thisArg; else let T be undefined.
      var thisArg = arguments[1]

      // 5. Let k be 0.
      var k = 0

      // 6. Repeat, while k < len
      while (k < len) {
        // a. Let Pk be ! ToString(k).
        // b. Let kValue be ? Get(O, Pk).
        // c. Let testResult be ToBoolean(? Call(predicate, T, « kValue, k, O »)).
        // d. If testResult is true, return kValue.
        var kValue = o[k]
        if (predicate.call(thisArg, kValue, k, o)) {
          return kValue
        }
        // e. Increase k by 1.
        k++
      }

      // 7. Return undefined.
      return undefined
    },
    configurable: true,
    writable: true,
  })
}
if (!String.prototype.includes) {
  String.prototype.includes = function(search, start) {
    'use strict'
    if (typeof start !== 'number') {
      start = 0
    }

    if (start + search.length > this.length) {
      return false
    } else {
      return this.indexOf(search, start) !== -1
    }
  }
}
if (!String.prototype.endsWith) {
  String.prototype.endsWith = function(searchString, position) {
    var subjectString = this.toString()
    if (
      typeof position !== 'number' ||
      !isFinite(position) ||
      Math.floor(position) !== position ||
      position > subjectString.length
    ) {
      position = subjectString.length
    }
    position -= searchString.length
    var lastIndex = subjectString.indexOf(searchString, position)
    return lastIndex !== -1 && lastIndex === position
  }
}
if (!Array.from) {
  Array.from = (function() {
    var toStr = Object.prototype.toString
    var isCallable = function(fn) {
      return typeof fn === 'function' || toStr.call(fn) === '[object Function]'
    }
    var toInteger = function(value) {
      var number = Number(value)
      if (isNaN(number)) {
        return 0
      }
      if (number === 0 || !isFinite(number)) {
        return number
      }
      return (number > 0 ? 1 : -1) * Math.floor(Math.abs(number))
    }
    var maxSafeInteger = Math.pow(2, 53) - 1
    var toLength = function(value) {
      var len = toInteger(value)
      return Math.min(Math.max(len, 0), maxSafeInteger)
    }

    // La propiedad length del método from es 1.
    return function from(arrayLike /*, mapFn, thisArg */) {
      // 1. Deje a C ser el este valor.
      var C = this

      // 2. Deje que los elementos sean ToObject(arrayLike).
      var items = Object(arrayLike)

      // 3. Retornar IfAbrupt(items).
      if (arrayLike == null) {
        throw new TypeError(
          'Array.from requiere un objeto array-like - not null or undefined'
        )
      }

      // 4. Si mapfn no está definida, entonces deja que sea false.
      var mapFn = arguments.length > 1 ? arguments[1] : void undefined
      var T
      if (typeof mapFn !== 'undefined') {
        // 5. si no
        // 5. a If IsCallable(mapfn) es false, lanza una excepción TypeError.
        if (!isCallable(mapFn)) {
          throw new TypeError(
            'Array.from: si hay mapFn, el segundo argumento debe ser una función'
          )
        }

        // 5. b. Si thisArg se suministró, deje que T sea thisArg; si no, deje que T esté indefinido.
        if (arguments.length > 2) {
          T = arguments[2]
        }
      }

      // 10. Let lenValue be Get(items, "length").
      // 11. Let len be ToLength(lenValue).
      var len = toLength(items.length)

      // 13. If IsConstructor(C) is true, then
      // 13. a. Let A be the result of calling the [[Construct]] internal method of C with an argument list containing the single item len.
      // 14. a. Else, Let A be ArrayCreate(len).
      var A = isCallable(C) ? Object(new C(len)) : new Array(len)

      // 16. Let k be 0.
      var k = 0
      // 17. Repeat, while k < len… (also steps a - h)
      var kValue
      while (k < len) {
        kValue = items[k]
        if (mapFn) {
          A[k] =
            typeof T === 'undefined'
              ? mapFn(kValue, k)
              : mapFn.call(T, kValue, k)
        } else {
          A[k] = kValue
        }
        k += 1
      }
      // 18. Let putStatus be Put(A, "length", len, true).
      A.length = len
      // 20. Return A.
      return A
    }
  })()
}

const MEMBER_ID = 8484
const agente = navigator.userAgent
const { pathname } = window.location
const elements_path = pathname.split('/').filter(item => item.match(/(\w+)/g))
const body_class = document.querySelector('body').getAttribute('class')

// const IS_DEBUG = location.href.includes('consoles=true')

const IS_MOBILE = /iPad|iPhone|iPod|android|webOS|Windows Phone/i.test(
  navigator.userAgent
)

const device = IS_MOBILE ? 'm' : 'd'

const PREBID_TIMEOUT = 3000
const BIDDER_PERCENTAGE = 0.85

// eslint-disable-next-line no-use-before-define
const apntag = apntag || {} // apntag viene de lib
apntag.anq = apntag.anq || []

// eslint-disable-next-line no-use-before-define
const pbjs = pbjs || {} // pbjs viene de lib
pbjs.que = pbjs.que || []

const slot = `${site}_${device}_${type_space}`
const result = available_ports.find(el => el.name === type_space)
const dataDevice =
  device === 'd' && result !== null ? result.desktop_space : result.mobile_space
const adsParams =
  dataDevice &&
  dataDevice.map(el => {
    return {
      invCode: `${slot}_${el}`,
      sizes:
        device === 'd' ? space_device.desktop[el] : space_device.mobile[el],
      allowedformats: ['video', 'banner'],
      targetId: `ads_${device}_${el}`,
    }
  })

if (agente.includes('Google Page Speed Insights')) site = 'psi'

const getTags = () => {
  const array_tags = []
  const tags_section = document.querySelector("meta[name='etiquetas']")
  const findTags = document.querySelectorAll('meta[property="article:tag"]')

  let nota_tags = ''
  const tags = tags_section === null ? findTags : tags_section.content
  if (tags.length) {
    if (tags_section !== null) {
      nota_tags = tags.replace(/ /g, '')
      nota_tags = nota_tags.normalize('NFKD').replace(/[\u0300-\u036F]/g, '')
      nota_tags = nota_tags.toLowerCase().split(',')
    } else nota_tags = tags.map(el => el.content.replace(/ /g, ''))

    return nota_tags
  }
  if (section === 'buscar')
    array_tags.push(
      window.location.search
        .slice(3)
        .split('+')
        .join('')
        .toLowerCase()
    )
  else if (section === 'tags')
    array_tags.push(
      elements_path[1]
        .split('-')
        .join('')
        .toLowerCase()
    )
  return array_tags
}

const tags = getTags()
// if (IS_DEBUG) console.log(tags)

const createDiv = id => {
  const div = document.createElement('div')
  div.id = id
  return div
}

const fireRequest = url => {
  const request = new XMLHttpRequest()
  request.open('GET', url)
  request.send()
}

// TODO puede fallar sin el while
const parseJsTrackers = str => {
  const url = str.split('"').find(el => el.startsWith('http'))
  return url !== null ? [url] : []
}

const peruRedShowTag = () => {
  if (body_class.includes('story')) {
    for (let i = 1; i <= 3; i++) {
      apntag.defineTag({
        invCode: `red_${device}_${site}_perured${i}`,
        sizes: [
          [300, 250],
          [320, 100],
          [320, 50],
          [120, 240],
          [250, 250],
          [200, 200],
          [180, 150],
          [125, 125],
        ],
        allowedFormats: ['native', 'banner'],
        targetId: `an-${device}-ad-${i}`,
        native: {
          title: {
            required: true,
            max_length: 60,
          },
          body: {
            required: true,
            max_length: 130,
          },
          image: {
            required: true,
            // sizes: [{width: 300, height: 160}]
          },
          sponsoredBy: {
            required: false,
            max_length: 25,
          },
          cta: {
            required: false,
            max_length: 15,
          },
        },
      })
    }

    apntag.loadTags()
    const cntPerured = document.querySelector(`#cnt-perured-${device}`)

    if (cntPerured !== undefined) {
      for (let index = 1; index <= 3; index++) {
        const id = `an-${device}-ad-${index}`
        const div = createDiv(id)
        cntPerured.appendChild(div)

        apntag.anq.push(() => {
          apntag.showTag(id)
          apntag.onEvent('adAvailable', id, adObj => {
            // console.log("Objeto tipo => ", adObj);
            /* document.querySelector(`.perured-header-${device}`).style.display =
              'block'
            document.querySelector(`.perured-footer-${device}`).style.display =
              'block' */

            if (adObj.adType === 'native') {
              const ad = document.getElementById(adObj.targetId)

              const nObj = adObj.native
              const {
                image: { url: imgSrc } = {},
                clickUrl = '',
                title = '',
                body = '',
                sponsoredBy = '',
                cta = 'Leer más',
                clickTrackers = '',
              } = nObj

              const template = `
                      <a href="${clickUrl}" target="_blank" style="text-decoration:none;">
                        <img class="an-native-img" src="${imgSrc}" width="300"/>
                        <div class="an-native-ad stacked" style="display:block;font-family:Arial, sans-serif;max-width:300px;border-bottom: #084B9E 1px solid;padding:10px 0;margin-bottom: 6px;">
                          <header class="an-native-headline" style="font-weight:bold;font-size:18px;line-height: 17px;color: #3b3b3b;padding: 2px 5px;">${title}</header>
                          <div class="an-native-body" style="margin:5px 0;font-size:15px;color: #7b7b7b;padding: 2px 5px;">
                            ${body}
                          </div>
                          <div class="an-native-sponsor-wrapper" style="padding: 2px 5px;">
                            <span class="an-native-sponsor" style="color: #4C4C4C;font-size: 12px;font-weight: bold;">${sponsoredBy}</span>
                            <span class="an-native-cta" style="background-color: #ffffff;border: 1px solid #dcdcdc;cursor: pointer;color: #666666;font-size: 10px;font-weight: bold;padding: 6px 16px;float:right;">${cta}</span>
                          </div>
                        </div>
                      </a>`

              ad.innerHTML = template

              // collect and fire off the trackers
              const impTrackers = nObj.impressionTrackers || []
              const jsTrackers = parseJsTrackers(nObj.javascriptTrackers) || []

              // fire imp trackers
              impTrackers.forEach(el => {
                fireRequest(el)
              })

              jsTrackers.forEach(el => {
                // this is where you would filter out tracker that you don't want to fire
                // for example, this will only include moat trackers:
                // if(url.indexOf('//z.moatads.com') > -1) { /* .... * }
                const d = document
                const tar = d.querySelector('head')
                const scr = d.createElement('script')
                scr.type = 'text/javascript'
                scr.async = true
                scr.src = el
                tar.insertBefore(scr, tar.firstChild)
              })

              // set up handlers for click trackers -
              // this will only work if you wrap clickable elements in <a> tags
              const clickable = Array.from(ad.getElementsByTagName('a'))

              clickable.forEach(node => {
                node.addEventListener('click', () => {
                  clickTrackers.forEach(el => {
                    fireRequest(el)
                  })
                })
              })
            }
          })
        })
      }
      // if (IS_DEBUG) console.log('PERU RED CARGADO!!!!')
    }
  }
}

const initAdserver = () => {
  if (!pbjs.requestSent) {
    pbjs.requestSent = true
    pbjs.que.push(() => {
      apntag.anq.push(() => {
        pbjs.setTargetingForAst()
        apntag.loadTags()
        adsParams.forEach(el =>
          apntag.anq.push(() => {
            apntag.showTag(el.targetId)
          })
        )
        // if (IS_DEBUG) console.log('INITADDSERVER')
      })
    })
  }
}

const inline = data => {
  if (body_class.includes('story') || body_class.includes('blogPost')) {
    const { spaces } = data
    if (spaces && Array.isArray(spaces)) {
      spaces.forEach(space => {
        const adPlace =
          document.getElementById(space.name) || createDiv(space.id)
        const target =
          typeof space.target === 'string'
            ? document.querySelector(`${space.target} > section`)
            : space.target
        if (target) {
          const childs = Array.from(target.children).filter(
            node => node.nodeName === 'P'
          )
          const numChilds = childs.length

          if (numChilds < 3) {
            target.insertBefore(adPlace, childs[numChilds - 1])
          } else if (space.position) {
            target.insertBefore(adPlace, childs[space.position])
          } else {
            target.insertBefore(adPlace, childs[2])
          }

          setTimeout(() => {
            apntag.anq.push(() => {
              apntag.showTag(space.name)
            })
          }, 2000)

          // } else {
          //     if (IS_DEBUG) console.log(target);
          // }
        }
      })
    }
    // if (IS_DEBUG) console.log('INLINE CARGADO!!!!');
  }
}

const getTagInline = () => {
  const spaces = IS_MOBILE
    ? [
        {
          target: '#contenedor',
          name: 'ads_m_movil3',
          position: 3,
        },
        {
          target: '#contenedor',
          name: 'ads_m_movil_video',
          position: 1,
        },
      ]
    : [
        {
          target: '#contenedor',
          name: 'ads_d_inline',
          position: 2,
        },
      ]

  return {
    spaces,
  }
}

// Definir auction
const iterableAuction = device === 'd' ? auction.desktop : auction.mobile
const dataFilter = iterableAuction.map(el => {
  return {
    name: el.name,
    val: el.values.filter(
      item =>
        Object.keys(item).length > 0 &&
        item.ports.find(val => val === type_space)
    ),
  }
})
const adUnits = []

dataFilter.forEach(el => {
  el.val.forEach(obj =>
    adUnits.push({
      code: obj.div_id,

      mediaTypes: {
        banner: {
          sizes: obj.size,
        },
      },
      bids: [
        {
          bidder: el.name,

          params: obj.params,
        },
      ],
    })
  )
})

// if (IS_DEBUG) console.log(adUnits);
if (adUnits.length > 0) {
  pbjs.que.push(() => {
    pbjs.setConfig({
      userSync: {
        filterSettings: {
          iframe: {
            bidders: '*', // '*' represents all bidders
            filter: 'include',
          },
        },
      },
      priceGranularity: 'dense',
    })

    const bidders = new Set(adUnits.map(el => el.bids[0].bidder))
    const bds = {}
    bidders.forEach(bd => {
      if (bd === 'rubicon') {
        bds[bd] = {
          bidCpmAdjustment: bidCpm => bidCpm * BIDDER_PERCENTAGE,
        }
      }
      if (bd === 'audienceNetwork') {
        bds[bd] = {
          adserverTargeting: [
            {
              key: 'fb_adid',
              val: bidResponse => bidResponse.fb_adid,
            },
            {
              key: 'hb_bidder',
              val: bidResponse => bidResponse.bidderCode,
            },
            {
              key: 'hb_pb',
              val: bidResponse => bidResponse.pbMg,
            },
          ],
        }
      }
    })
    pbjs.bidderSettings = bds

    pbjs.addAdUnits(adUnits)
    pbjs.requestBids({
      bidsBackHandler: () => {
        initAdserver()
        // if (!document.location.href.includes('/mag.')) {
        const tag_inline = getTagInline()
        inline(tag_inline)
        // }
        peruRedShowTag()
      },
      timeout: PREBID_TIMEOUT,
    })
  })

  // if (IS_DEBUG) console.log('HEADER BIDDING CARGADO')
}

// START APPNEXUS EVENTS

const actionEvent = ({ type, targetId }) => {
  console.warn('Appnexus', type)
  const adsSpace = document.querySelector(`#${targetId}`)
  const containerAd =
    adsSpace.parentNode.childNodes.length === 1 ? adsSpace.parentNode : adsSpace
  containerAd.classList.add('hidden')
}

const setGlobalEvents = (eventList, targetId) => {
  eventList.forEach(eventName => {
    if (apntag) {
      apntag.onEvent(eventName, targetId, () =>
        actionEvent({ type: eventName, targetId })
      )
    }
  })
}

const global_events = ['adNoBid', 'adBadRequest', 'adRequestFailure', 'adError']

dataLayer.push({
  event: 'definir_eventos_appnexus',
})

// END EVENTS
apntag.anq.push(() => {
  apntag.setPageOpts({
    member: MEMBER_ID,
    disablePsa: true,
    keywords: {
      tipo: type_template,
      seccion: section,
      subseccion: subsection,
      categoria: '',
      tags,
      path_name,
    },
  })
  adsParams.map(val =>
    apntag.defineTag({
      ...val,
    })
  )
  adsParams.forEach(
    ({ targetId }) => targetId && setGlobalEvents(global_events, targetId)
  )
  // if (IS_DEBUG) console.log('APP NEXUS CARGADO!!!!')
})

const initWithoutHB = () => {
  apntag.anq.push(function() {
    apntag.loadTags()
    adsParams.forEach(el =>
      apntag.anq.push(() => {
        apntag.showTag(el.targetId)
      })
    )
    // if (!document.location.href.includes('/mag.')) {
    const tag_inline = getTagInline()
    inline(tag_inline)
    // }
    peruRedShowTag()
  })
}

if (adUnits.length === 0) {
  // if (IS_DEBUG) console.log(adUnits)
  initWithoutHB()
}
