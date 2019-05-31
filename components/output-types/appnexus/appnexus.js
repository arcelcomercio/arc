'use strict'

function _toConsumableArray(arr) {
  return (
    _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread()
  )
}

function _nonIterableSpread() {
  throw new TypeError('Invalid attempt to spread non-iterable instance')
}

function _iterableToArray(iter) {
  if (
    Symbol.iterator in Object(iter) ||
    Object.prototype.toString.call(iter) === '[object Arguments]'
  )
    return Array.from(iter)
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i]
    }
    return arr2
  }
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {}
    var ownKeys = Object.keys(source)
    if (typeof Object.getOwnPropertySymbols === 'function') {
      ownKeys = ownKeys.concat(
        Object.getOwnPropertySymbols(source).filter(function(sym) {
          return Object.getOwnPropertyDescriptor(source, sym).enumerable
        })
      )
    }
    ownKeys.forEach(function(key) {
      _defineProperty(target, key, source[key])
    })
  }
  return target
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true,
    })
  } else {
    obj[key] = value
  }
  return obj
}

function _readOnlyError(name) {
  throw new Error('"' + name + '" is read-only')
}

var MEMBER_ID = 8484
var TIME_START = new Date().getTime()
var adtype = ''
var atributos = ''
var spaces = []
var agente = navigator.userAgent
var pathname = window.location.pathname
var elements_path = pathname.split('/').filter(function(item) {
  return item.match(/(\w+)/g)
})
var body_class = document.querySelector('body').getAttribute('class')
if (agente.includes('Google Page Speed Insights')) sitio = 'psi'

var getTemplate = function getTemplate() {
  if (body_class.includes('nota') && body_class.includes('fotogaleria'))
    return 'foto'
  if (body_class.includes('nota')) return 'nota'
  return 'portada'
}

var getSection = function getSection() {
  if (elements_path.length) {
    if (elements_path.includes('noticias')) return 'tags'
    if (elements_path.includes('buscar')) return 'buscar'
    return elements_path[0]
      .split('-')
      .join('')
      .toLowerCase()
  }

  return pathname == '/' ? 'home' : ''
}

var getSubsection = function getSubsection() {
  var limit = type_template === 'portada' ? 1 : 2
  if (section === 'tags')
    return elements_path[1]
      .split('-')
      .join('')
      .toLowerCase()
  if (section === 'archivo') return ''
  return elements_path.length > limit
    ? elements_path[1]
        .split('-')
        .join('')
        .toLowerCase()
    : ''
}

var getTags = function getTags() {
  var array_tags = []
  var nota_tags = ''
  var tags_section = document.querySelector("meta[name='etiquetas']")
  var findTags = document.querySelectorAll('meta[property="article:tag"]')
  var tags = tags_section == null ? findTags : tags_section.content

  if (tags.length) {
    if (tags_section !== null) {
      nota_tags = (_readOnlyError('nota_tags'), tags.replace(/ /g, ''))
      nota_tags = (_readOnlyError('nota_tags'),
      nota_tags.normalize('NFKD').replace(/[\u0300-\u036F]/g, ''))
      nota_tags = (_readOnlyError('nota_tags'), nota_tags.toLowerCase())
    } else
      tags.forEach(function(el) {
        return (nota_tags = (_readOnlyError('nota_tags'),
        el.content.replace(/ /g, '')))
      })

    return nota_tags.split(',')
  } else {
    if (section === 'buscar')
      array_tags.push(
        window.location.search
          .slice(3)
          .split('+')
          .join('')
          .toLowerCase()
      )
    else if (section == 'tags')
      array_tags.push(
        elements_path[1]
          .split('-')
          .join('')
          .toLowerCase()
      )
    return array_tags
  }
}

var type_template = getTemplate()
var section = getSection()
var subsection = getSubsection()
var tags = getTags()
var IS_DEBUG = location.href.includes('consoles=true')
IS_DEBUG ? console.log(tags) : null
var IS_MOBILE = navigator.userAgent.match(
  /(iPad)|(iPhone)|(iPod)|(android)|(webOS)|(Windows Phone)/i
)
  ? true
  : false
var device = IS_MOBILE ? 'm' : 'd' // VERSIÓN DESKTOP

if (body_class.includes('nota')) {
  var get_tipo_nota = document.querySelector("meta[name='typeNota']")
  var tipo_nota = get_tipo_nota.content || null
}

var PREBID_TIMEOUT = 3000
var BIDDER_PERCENTAGE = 0.85
var pbjs = pbjs || {}
pbjs.que = pbjs.que || []
var slot = ''
  .concat(site, '_')
  .concat(device, '_')
  .concat(type_space)
var result = available_ports.find(function(el) {
  return el.name === type_space
})
var dataDevice =
  device === 'd' && result !== null ? result.desktop_space : result.mobile_space
var adsParams =
  dataDevice &&
  dataDevice.map(function(el) {
    return {
      invCode: ''.concat(slot, '_').concat(el),
      sizes:
        device === 'd' ? space_device.desktop[el] : space_device.mobile[el],
      allowedformats: ['video', 'banner'],
      targetId: 'ads_'.concat(device, '_').concat(el),
    }
  }) // Definir auction

var iterableAuction = device === 'd' ? auction.desktop : auction.mobile
var dataFilter = iterableAuction.map(function(el) {
  return el.values.filter(function(item) {
    return item.ports.find(function(val) {
      return val === type_space
    })
  })
})
var adUnits = []
dataFilter.forEach(function(el) {
  el.forEach(function(obj) {
    return adUnits.push({
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
  })
}) // if (IS_DEBUG) console.log(adUnits);

if (adUnits.length > 0) {
  pbjs.que.push(function() {
    pbjs.setConfig({
      userSync: {
        filterSettings: {
          iframe: {
            bidders: '*',
            // '*' represents all bidders
            filter: 'include',
          },
        },
      },
      priceGranularity: 'dense',
    })
    pbjs.bidderSettings = {
      rubicon: {
        bidCpmAdjustment: function bidCpmAdjustment(bidCpm) {
          return bidCpm * BIDDER_PERCENTAGE
        },
      },
    }
    pbjs.addAdUnits(adUnits)
    pbjs.requestBids({
      bidsBackHandler: function bidsBackHandler(bidResponses) {
        initAdserver()

        if (!document.location.href.includes('/mag.')) {
          var tag_inline = getTagInline()
          inline(tag_inline)
        }

        peruRedShowTag()
      },
      timeout: PREBID_TIMEOUT,
    })
  }) //if (IS_DEBUG) console.log('HEADER BIDDING CARGADO')
}

var apntag = apntag || {}
apntag.anq = apntag.anq || [] //END EVENTS

apntag.anq.push(function() {
  apntag.setPageOpts({
    member: MEMBER_ID,
    disablePsa: true,
    keywords: {
      tipo: 'portada',
      seccion: 'home',
      subseccion: '',
      categoria: '',
      tags: [''],
      path_name: '/',
    },
  })
  adsParams.map(function(val) {
    return apntag.defineTag(_objectSpread({}, val))
  }) //if (IS_DEBUG) console.log('APP NEXUS CARGADO!!!!')
})

var initWithoutHB = function initWithoutHB() {
  apntag.anq.push(function() {
    apntag.loadTags()
    adsParams.forEach(function(el) {
      return apntag.anq.push(function() {
        apntag.showTag(el.targetId)
      })
    })

    if (!document.location.href.includes('/mag.')) {
      var tag_inline = getTagInline()
      inline(tag_inline)
    }

    peruRedShowTag()
  })
}

if (adUnits.length == 0) {
  //if (IS_DEBUG) console.log(adUnits)
  initWithoutHB()
}

var initAdserver = function initAdserver() {
  if (!pbjs.requestSent) {
    pbjs.requestSent = true
    pbjs.que.push(function() {
      apntag.anq.push(function() {
        pbjs.setTargetingForAst()
        apntag.loadTags()
        adsParams.forEach(function(el) {
          return apntag.anq.push(function() {
            apntag.showTag(el.targetId)
          })
        }) // if (IS_DEBUG) console.log('INITADDSERVER')
      })
    })
  }
}

var createDiv = function createDiv(id) {
  var div = document.createElement('div')
  div.id = id
  return div
}

var peruRedShowTag = function peruRedShowTag() {
  if (body_class.includes('nota')) {
    if (IS_MOBILE) {
      apntag.defineTag({
        invCode: 'red_m_eco_perured1',
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
        targetId: 'an-m-ad-1',
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
            required: true, // sizes: [{width: 300, height: 160}]
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
      apntag.defineTag({
        invCode: 'red_m_eco_perured2',
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
        targetId: 'an-m-ad-2',
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
            required: true, //bsizes: [{width: 300, height: 160}]
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
      apntag.defineTag({
        invCode: 'red_m_eco_perured3',
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
        targetId: 'an-m-ad-3',
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
            required: true, //bsizes: [{width: 300, height: 160}]
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
    } else {
      apntag.defineTag({
        invCode: 'red_d_eco_perured1',
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
        targetId: 'an-d-ad-1',
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
            required: true, // sizes: [{width: 300, height: 160}]
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
      apntag.defineTag({
        invCode: 'red_d_eco_perured2',
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
        targetId: 'an-d-ad-2',
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
            required: true, // sizes: [{width: 300, height: 160}]
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
      apntag.defineTag({
        invCode: 'red_d_eco_perured3',
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
        targetId: 'an-d-ad-3',
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
            required: true, // sizes: [{width: 300, height: 160}]
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

    adtype = (_readOnlyError('adtype'), device)
    apntag.loadTags()
    var cntPerured = document.querySelector('#cnt-perured-' + adtype)

    if (cntPerured != undefined) {
      var _loop = function _loop(index) {
        var id = 'an-' + adtype + '-ad-' + index
        var div = createDiv(id)
        cntPerured.appendChild(div)
        apntag.anq.push(function() {
          apntag.showTag(id)
          apntag.onEvent('adAvailable', id, function(adObj) {
            // console.log("Objeto tipo => ", adObj);
            document.querySelector('.perured-header-' + adtype).style.display =
              'block'
            document.querySelector('.perured-footer-' + adtype).style.display =
              'block'

            if (adObj.adType == 'native') {
              var ad = document.getElementById(adObj.targetId)
              var nObj = adObj['native']
              var clickUrl = nObj.clickUrl
              var title = nObj.title
              var body = nObj.body
              var sponsor =
                typeof nObj.sponsoredBy == 'undefined' ? '' : nObj.sponsoredBy
              var imgSrc = nObj.image && nObj.image.url
              var cta = typeof nObj.cta == 'undefined' ? 'Leer más' : nObj.cta
              var template = '\n                      <a href="'
                .concat(
                  clickUrl,
                  '" target="_blank" style="text-decoration:none;">\n                        <img class="an-native-img" src="'
                )
                .concat(
                  imgSrc,
                  '" width="300"/>\n                        <div class="an-native-ad stacked" style="display:block;font-family:Arial, sans-serif;max-width:300px;border-bottom: #084B9E 1px solid;padding:10px 0;margin-bottom: 6px;">\n                          <header class="an-native-headline" style="font-weight:bold;font-size:18px;line-height: 17px;color: #3b3b3b;padding: 2px 5px;">'
                )
                .concat(
                  title,
                  '</header>\n                          <div class="an-native-body" style="margin:5px 0;font-size:15px;color: #7b7b7b;padding: 2px 5px;">\n                            '
                )
                .concat(
                  body,
                  '\n                          </div>\n                          <div class="an-native-sponsor-wrapper" style="padding: 2px 5px;">\n                            <span class="an-native-sponsor" style="color: #4C4C4C;font-size: 12px;font-weight: bold;">'
                )
                .concat(
                  sponsor,
                  '</span>\n                            <span class="an-native-cta" style="background-color: #ffffff;border: 1px solid #dcdcdc;cursor: pointer;color: #666666;font-size: 10px;font-weight: bold;padding: 6px 16px;float:right;">'
                )
                .concat(
                  cta,
                  '</span>\n                          </div>\n                        </div>\n                      </a>'
                )
              ad.innerHTML = template // collect and fire off the trackers

              var impTrackers = nObj.impressionTrackers || []
              var jsTrackers = parseJsTrackers(nObj.javascriptTrackers) || []
              var clickTrackers = nObj.clickTrackers // fire imp trackers

              impTrackers.forEach(function(el) {
                fireRequest(el)
              })
              jsTrackers.forEach(function(el) {
                // this is where you would filter out tracker that you don't want to fire
                // for example, this will only include moat trackers:
                // if(url.indexOf('//z.moatads.com') > -1) { /* .... * }
                var d = document
                var tar = d.querySelector('head')
                var scr = d.createElement('script')
                scr.type = 'text/javascript'
                scr.async = true
                scr.src = el
                tar.insertBefore(scr, tar.firstChild)
              }) // set up handlers for click trackers -
              // this will only work if you wrap clickable elements in <a> tags

              var clickable = Array.from(ad.getElementsByTagName('a'))
              clickable.forEach(function(node) {
                node.addEventListener('click', function() {
                  clickTrackers.forEach(function(el) {
                    fireRequest(el)
                  })
                })
              })
            }
          })
        })
      }

      for (var index = 1; index <= 3; index++) {
        _loop(index)
      } //if (IS_DEBUG) console.log('PERU RED CARGADO!!!!')
    }
  }
}

var fireRequest = function fireRequest(url) {
  var request = new XMLHttpRequest()
  request.open('GET', url)
  request.send()
} // TODO puede fallar sin el while

var parseJsTrackers = function parseJsTrackers(str) {
  var url = str.split('"').find(function(el) {
    return el.startsWith('http')
  })
  return url !== null ? [url] : []
}

var inline = function inline(data) {
  if (body_class.includes('nota')) {
    var _spaces = data.spaces

    if (_spaces && Array.isArray(_spaces)) {
      _spaces.forEach(function(space) {
        var adPlace = document.getElementById(space.name) || createDiv(space.id)
        var target =
          typeof space.target === 'string'
            ? document.querySelector(space.target)
            : space.target

        if (target) {
          var childs = _toConsumableArray(target.children).filter(function(
            node
          ) {
            return node.nodeName === 'P'
          })

          var numChilds = childs.length

          if (numChilds < 3) {
            target.insertBefore(adPlace, childs[numChilds - 1])
          } else {
            space.position
              ? target.insertBefore(adPlace, childs[space.position])
              : target.insertBefore(adPlace, childs[2])
          }

          setTimeout(function() {
            apntag.anq.push(function() {
              apntag.showTag(space.name)
            })
          }, 2000) // } else {
          //     if (IS_DEBUG) console.log(target);
          // }
        }
      })
    } // if (IS_DEBUG) console.log('INLINE CARGADO!!!!');
  }
}

var getTagInline = function getTagInline() {
  var nameSpace = IS_MOBILE ? 'ads_m_movil3' : 'ads_d_inline'
  return {
    spaces: [
      {
        target: '#contenedor',
        name: nameSpace,
        position: 0,
      },
    ],
  }
} // if (window.location.pathname == '/mundial/seleccion' && IS_MOBILE)
//   document.getElementById('ads-movil-movil_2').style.display = 'block'
