'use strict'
function ownKeys(e, t) {
  var n = Object.keys(e)
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e)
    t &&
      (a = a.filter(function(t) {
        return Object.getOwnPropertyDescriptor(e, t).enumerable
      })),
      n.push.apply(n, a)
  }
  return n
}
function _objectSpread(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = null != arguments[t] ? arguments[t] : {}
    t % 2
      ? ownKeys(Object(n), !0).forEach(function(t) {
          _defineProperty(e, t, n[t])
        })
      : Object.getOwnPropertyDescriptors
      ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
      : ownKeys(Object(n)).forEach(function(t) {
          Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t))
        })
  }
  return e
}
function _defineProperty(e, t, n) {
  return (
    t in e
      ? Object.defineProperty(e, t, {
          value: n,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        })
      : (e[t] = n),
    e
  )
}
Array.prototype.includes ||
  Object.defineProperty(Array.prototype, 'includes', {
    value: function(e, t) {
      if (null == this) throw new TypeError('"this" es null o no está definido')
      var n = Object(this),
        a = n.length >>> 0
      if (0 === a) return !1
      var r,
        i,
        o = 0 | t,
        s = Math.max(o >= 0 ? o : a - Math.abs(o), 0)
      for (; s < a; ) {
        if (
          (r = n[s]) === (i = e) ||
          ('number' == typeof r && 'number' == typeof i && isNaN(r) && isNaN(i))
        )
          return !0
        s++
      }
      return !1
    },
  }),
  Array.prototype.find ||
    Object.defineProperty(Array.prototype, 'find', {
      value: function(e) {
        if (null == this) throw new TypeError('"this" is null or not defined')
        var t = Object(this),
          n = t.length >>> 0
        if ('function' != typeof e)
          throw new TypeError('predicate must be a function')
        for (var a = arguments[1], r = 0; r < n; ) {
          var i = t[r]
          if (e.call(a, i, r, t)) return i
          r++
        }
      },
      configurable: !0,
      writable: !0,
    }),
  String.prototype.includes ||
    (String.prototype.includes = function(e, t) {
      return (
        'number' != typeof t && (t = 0),
        !(t + e.length > this.length) && -1 !== this.indexOf(e, t)
      )
    }),
  String.prototype.endsWith ||
    (String.prototype.endsWith = function(e, t) {
      var n = this.toString()
      ;('number' != typeof t ||
        !isFinite(t) ||
        Math.floor(t) !== t ||
        t > n.length) &&
        (t = n.length),
        (t -= e.length)
      var a = n.indexOf(e, t)
      return -1 !== a && a === t
    }),
  Array.from ||
    (Array.from = (function() {
      var e = Object.prototype.toString,
        t = function(t) {
          return 'function' == typeof t || '[object Function]' === e.call(t)
        },
        n = Math.pow(2, 53) - 1,
        a = function(e) {
          var t = (function(e) {
            var t = Number(e)
            return isNaN(t)
              ? 0
              : 0 !== t && isFinite(t)
              ? (t > 0 ? 1 : -1) * Math.floor(Math.abs(t))
              : t
          })(e)
          return Math.min(Math.max(t, 0), n)
        }
      return function(e) {
        var n = Object(e)
        if (null == e)
          throw new TypeError(
            'Array.from requiere un objeto array-like - not null or undefined'
          )
        var r,
          i = arguments.length > 1 ? arguments[1] : void 0
        if (void 0 !== i) {
          if (!t(i))
            throw new TypeError(
              'Array.from: si hay mapFn, el segundo argumento debe ser una función'
            )
          arguments.length > 2 && (r = arguments[2])
        }
        for (
          var o,
            s = a(n.length),
            c = t(this) ? Object(new this(s)) : new Array(s),
            d = 0;
          d < s;

        )
          (o = n[d]),
            (c[d] = i ? (void 0 === r ? i(o, d) : i.call(r, o, d)) : o),
            (d += 1)
        return (c.length = s), c
      }
    })())
var MEMBER_ID = 8484,
  agente = navigator.userAgent,
  pathname = window.location.pathname,
  elements_path = pathname.split('/').filter(function(e) {
    return e.match(/(\w+)/g)
  }),
  body_class = document.querySelector('body').getAttribute('class'),
  IS_MOBILE = /iPad|iPhone|iPod|android|webOS|Windows Phone/i.test(
    navigator.userAgent
  ),
  device = IS_MOBILE ? 'm' : 'd',
  PREBID_TIMEOUT = 'p21' === site ? 1500 : 3e3,
  BIDDER_PERCENTAGE = 0.85,
  apntag = apntag || {}
apntag.anq = apntag.anq || []
var pbjs = pbjs || {}
pbjs.que = pbjs.que || []
var slot = ''
    .concat(site, '_')
    .concat(device, '_')
    .concat(type_space),
  result = available_ports.find(function(e) {
    return e.name === type_space
  }),
  dataDevice =
    'd' === device && null !== result
      ? result.desktop_space
      : result.mobile_space,
  adsParams =
    dataDevice &&
    dataDevice.map(function(e) {
      return {
        invCode: ''.concat(slot, '_').concat(e),
        sizes:
          'd' === device ? space_device.desktop[e] : space_device.mobile[e],
        allowedFormats:
          'eco' === site ? ['video', 'banner', 'native'] : ['video', 'banner'],
        targetId: 'ads_'.concat(device, '_').concat(e),
      }
    })
agente.includes('Google Page Speed Insights') && (site = 'psi')
var getTags = function() {
    var e = [],
      t = document.querySelector("meta[name='etiquetas']"),
      n = document.querySelectorAll('meta[property="article:tag"]'),
      a = null === t ? n : t.content
    return a.length
      ? null !== t
        ? a
            .replace(/ /g, '')
            .normalize('NFKD')
            .replace(/[\u0300-\u036F]/g, '')
            .toLowerCase()
            .split(',')
        : a.map(function(e) {
            return e.content.replace(/ /g, '')
          })
      : ('buscar' === section
          ? e.push(
              window.location.search
                .slice(3)
                .split('+')
                .join('')
                .toLowerCase()
            )
          : 'tags' === section &&
            e.push(
              elements_path[1]
                .split('-')
                .join('')
                .toLowerCase()
            ),
        e)
  },
  tags = getTags(),
  createDiv = function(e) {
    var t = document.createElement('div')
    return (t.id = e), t
  },
  fireRequest = function(e) {
    var t = new XMLHttpRequest()
    t.open('GET', e), t.send()
  },
  parseJsTrackers = function(e) {
    var t = e.split('"').find(function(e) {
      return e.startsWith('http')
    })
    return null !== t ? [t] : []
  },
  peruRedShowTag = function() {
    if (body_class.includes('story')) {
      for (var e = 1; e <= 3; e++)
        apntag.defineTag({
          invCode: 'red_'
            .concat(device, '_')
            .concat(site, '_perured')
            .concat(e),
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
          targetId: 'an-'.concat(device, '-ad-').concat(e),
          native: {
            title: { required: !0, max_length: 60 },
            body: { required: !0, max_length: 130 },
            image: { required: !0 },
            sponsoredBy: { required: !1, max_length: 25 },
            cta: { required: !1, max_length: 15 },
          },
        })
      apntag.loadTags()
      var t = document.querySelector('#cnt-perured-'.concat(device))
      if (void 0 !== t)
        for (
          var n = function(e) {
              var n = 'an-'.concat(device, '-ad-').concat(e),
                a = createDiv(n)
              t.appendChild(a),
                apntag.anq.push(function() {
                  apntag.showTag(n),
                    apntag.onEvent('adAvailable', n, function(e) {
                      if ('native' === e.adType) {
                        var t = document.getElementById(e.targetId),
                          n = e.native,
                          a = n.image,
                          r = (a = void 0 === a ? {} : a).url,
                          i = n.clickUrl,
                          o = void 0 === i ? '' : i,
                          s = n.title,
                          c = void 0 === s ? '' : s,
                          d = n.body,
                          u = void 0 === d ? '' : d,
                          p = n.sponsoredBy,
                          l = void 0 === p ? '' : p,
                          f = n.cta,
                          g = void 0 === f ? 'Leer más' : f,
                          v = n.clickTrackers,
                          h = void 0 === v ? '' : v,
                          b = '\n                      <a href="'
                            .concat(
                              o,
                              '" target="_blank" style="text-decoration:none;">\n                        <img class="an-native-img" src="'
                            )
                            .concat(
                              r,
                              '" width="300"/>\n                        <div class="an-native-ad stacked" style="display:block;font-family:Arial, sans-serif;max-width:300px;border-bottom: #084B9E 1px solid;padding:10px 0;margin-bottom: 6px;">\n                          <header class="an-native-headline" style="font-weight:bold;font-size:18px;line-height: 17px;color: #3b3b3b;padding: 2px 5px;">'
                            )
                            .concat(
                              c,
                              '</header>\n                          <div class="an-native-body" style="margin:5px 0;font-size:15px;color: #7b7b7b;padding: 2px 5px;">\n                            '
                            )
                            .concat(
                              u,
                              '\n                          </div>\n                          <div class="an-native-sponsor-wrapper" style="padding: 2px 5px;">\n                            <span class="an-native-sponsor" style="color: #4C4C4C;font-size: 12px;font-weight: bold;">'
                            )
                            .concat(
                              l,
                              '</span>\n                            <span class="an-native-cta" style="background-color: #ffffff;border: 1px solid #dcdcdc;cursor: pointer;color: #666666;font-size: 10px;font-weight: bold;padding: 6px 16px;float:right;">'
                            )
                            .concat(
                              g,
                              '</span>\n                          </div>\n                        </div>\n                      </a>'
                            )
                        t.innerHTML = b
                        var m = n.impressionTrackers || [],
                          y = parseJsTrackers(n.javascriptTrackers) || []
                        m.forEach(function(e) {
                          fireRequest(e)
                        }),
                          y.forEach(function(e) {
                            var t = document,
                              n = t.querySelector('head'),
                              a = t.createElement('script')
                            ;(a.type = 'text/javascript'),
                              (a.async = !0),
                              (a.src = e),
                              n.insertBefore(a, n.firstChild)
                          }),
                          Array.from(t.getElementsByTagName('a')).forEach(
                            function(e) {
                              e.addEventListener('click', function() {
                                h.forEach(function(e) {
                                  fireRequest(e)
                                })
                              })
                            }
                          )
                      }
                    })
                })
            },
            a = 1;
          a <= 3;
          a++
        )
          n(a)
    }
  },
  initAdserver = function() {
    pbjs.requestSent ||
      ((pbjs.requestSent = !0),
      pbjs.que.push(function() {
        apntag.anq.push(function() {
          pbjs.setTargetingForAst(),
            apntag.loadTags(),
            adsParams.forEach(function(e) {
              return apntag.anq.push(function() {
                apntag.showTag(e.targetId)
              })
            })
        })
      }))
  },
  inline = function(e) {
    if (body_class.includes('story') || body_class.includes('blogPost')) {
      var t = e.spaces
      t &&
        Array.isArray(t) &&
        t.forEach(function(e) {
          var t = document.getElementById(e.name) || createDiv(e.id),
            n =
              'string' == typeof e.target
                ? document.querySelector(''.concat(e.target, ' > section'))
                : e.target
          if (n) {
            var a = Array.from(n.children).filter(function(e) {
                return 'P' === e.nodeName
              }),
              r = a.length
            r < 3
              ? n.insertBefore(t, a[r - 1])
              : e.position
              ? n.insertBefore(t, a[e.position])
              : n.insertBefore(t, a[2]),
              setTimeout(function() {
                apntag.anq.push(function() {
                  apntag.showTag(e.name)
                })
              }, 2e3)
          }
        })
    }
  },
  getTagInline = function() {
    return {
      spaces: IS_MOBILE
        ? [
            { target: '#contenedor', name: 'ads_m_movil3', position: 3 },
            { target: '#contenedor', name: 'ads_m_movil_video', position: 1 },
          ]
        : [{ target: '#contenedor', name: 'ads_d_inline', position: 2 }],
    }
  },
  iterableAuction = 'd' === device ? auction.desktop : auction.mobile,
  dataFilter = iterableAuction.map(function(e) {
    return {
      name: e.name,
      val: e.values.filter(function(e) {
        return (
          Object.keys(e).length > 0 &&
          e.ports.find(function(e) {
            return e === type_space
          })
        )
      }),
    }
  }),
  adUnits = []
dataFilter.forEach(function(e) {
  e.val.forEach(function(t) {
    return adUnits.push({
      code: t.div_id,
      mediaTypes: { banner: { sizes: t.size } },
      bids: [{ bidder: e.name, params: t.params }],
    })
  })
}),
  adUnits.length > 0 &&
    pbjs.que.push(function() {
      pbjs.setConfig({
        userSync: {
          filterSettings: { iframe: { bidders: '*', filter: 'include' } },
        },
        priceGranularity: 'dense',
      })
      var e = new Set(
          adUnits.map(function(e) {
            return e.bids[0].bidder
          })
        ),
        t = {}
      e.forEach(function(e) {
        'rubicon' === e &&
          (t[e] = {
            bidCpmAdjustment: function(e) {
              return e * BIDDER_PERCENTAGE
            },
          }),
          'audienceNetwork' === e &&
            (t[e] = {
              adserverTargeting: [
                {
                  key: 'fb_adid',
                  val: function(e) {
                    return e.fb_adid
                  },
                },
                {
                  key: 'hb_bidder',
                  val: function(e) {
                    return e.bidderCode
                  },
                },
                {
                  key: 'hb_pb',
                  val: function(e) {
                    return e.pbMg
                  },
                },
              ],
            })
      }),
        (pbjs.bidderSettings = t),
        pbjs.addAdUnits(adUnits),
        pbjs.requestBids({
          bidsBackHandler: function() {
            initAdserver()
            var e = getTagInline()
            inline(e), peruRedShowTag()
          },
          timeout: PREBID_TIMEOUT,
        })
    })
var actionEvent = function(e) {
    var t = e.type,
      n = e.targetId
    console.warn('Appnexus', t)
    var a = document.querySelector('#'.concat(n))
    ;(1 === a.parentNode.childNodes.length ? a.parentNode : a).classList.add(
      'hidden'
    )
  },
  setGlobalEvents = function(e, t) {
    e.forEach(function(e) {
      apntag &&
        apntag.onEvent(e, t, function() {
          return actionEvent({ type: e, targetId: t })
        })
    })
  },
  global_events = ['adNoBid', 'adBadRequest', 'adRequestFailure', 'adError']
dataLayer.push({ event: 'definir_eventos_appnexus' }),
  apntag.anq.push(function() {
    apntag.setPageOpts({
      member: MEMBER_ID,
      disablePsa: !0,
      keywords: {
        tipo: type_template,
        seccion: section,
        subseccion: subsection,
        categoria: '',
        tags: tags,
        path_name: path_name,
      },
    }),
      adsParams.map(function(e) {
        return apntag.defineTag(_objectSpread({}, e))
      }),
      adsParams.forEach(function(e) {
        var t = e.targetId
        return t && setGlobalEvents(global_events, t)
      })
  })
var initWithoutHB = function() {
  apntag.anq.push(function() {
    apntag.loadTags(),
      adsParams.forEach(function(e) {
        return apntag.anq.push(function() {
          apntag.showTag(e.targetId)
        })
      })
    var e = getTagInline()
    inline(e), peruRedShowTag()
  })
}
0 === adUnits.length && initWithoutHB()
