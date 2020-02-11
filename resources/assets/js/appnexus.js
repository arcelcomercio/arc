"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/* eslint-disable func-names */

/* eslint-disable no-restricted-globals */

/* eslint-disable no-undef */

/* eslint-disable camelcase */
if (!Array.prototype.includes) {
  Object.defineProperty(Array.prototype, 'includes', {
    value: function value(searchElement, fromIndex) {
      if (this == null) {
        throw new TypeError('"this" es null o no está definido');
      } // 1. Dejar que O sea ? ToObject(this value).


      var o = Object(this); // 2. Dejar que len sea ? ToLength(? Get(O, "length")).

      var len = o.length >>> 0; // 3. Si len es 0, devuelve false.

      if (len === 0) {
        return false;
      } // 4. Dejar que n sea ? ToInteger(fromIndex).
      //    (Si fromIndex no está definido, este paso produce el valor 0.)


      var n = fromIndex | 0; // 5. Si n ≥ 0, entonces
      //  a. Dejar que k sea n.
      // 6. Else n < 0,
      //  a. Dejar que k sea len + n.
      //  b. Si k < 0, Dejar que k sea 0.

      var k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);

      function sameValueZero(x, y) {
        return x === y || typeof x === 'number' && typeof y === 'number' && isNaN(x) && isNaN(y);
      } // 7. Repite, mientras k < len


      while (k < len) {
        // a. Dejar que elementK sea el resultado de ? Get(O, ! ToString(k)).
        // b. Si SameValueZero(searchElement, elementK) es true, devuelve true.
        if (sameValueZero(o[k], searchElement)) {
          return true;
        } // c. Incrementa k por 1.


        k++;
      } // 8. Devuelve false


      return false;
    }
  });
}

if (!Array.prototype.find) {
  Object.defineProperty(Array.prototype, 'find', {
    value: function value(predicate) {
      // 1. Let O be ? ToObject(this value).
      if (this == null) {
        throw new TypeError('"this" is null or not defined');
      }

      var o = Object(this); // 2. Let len be ? ToLength(? Get(O, "length")).

      var len = o.length >>> 0; // 3. If IsCallable(predicate) is false, throw a TypeError exception.

      if (typeof predicate !== 'function') {
        throw new TypeError('predicate must be a function');
      } // 4. If thisArg was supplied, let T be thisArg; else let T be undefined.


      var thisArg = arguments[1]; // 5. Let k be 0.

      var k = 0; // 6. Repeat, while k < len

      while (k < len) {
        // a. Let Pk be ! ToString(k).
        // b. Let kValue be ? Get(O, Pk).
        // c. Let testResult be ToBoolean(? Call(predicate, T, « kValue, k, O »)).
        // d. If testResult is true, return kValue.
        var kValue = o[k];

        if (predicate.call(thisArg, kValue, k, o)) {
          return kValue;
        } // e. Increase k by 1.


        k++;
      } // 7. Return undefined.


      return undefined;
    },
    configurable: true,
    writable: true
  });
}

if (!String.prototype.includes) {
  String.prototype.includes = function (search, start) {
    'use strict';

    if (typeof start !== 'number') {
      start = 0;
    }

    if (start + search.length > this.length) {
      return false;
    } else {
      return this.indexOf(search, start) !== -1;
    }
  };
}

if (!String.prototype.endsWith) {
  String.prototype.endsWith = function (searchString, position) {
    var subjectString = this.toString();

    if (typeof position !== 'number' || !isFinite(position) || Math.floor(position) !== position || position > subjectString.length) {
      position = subjectString.length;
    }

    position -= searchString.length;
    var lastIndex = subjectString.indexOf(searchString, position);
    return lastIndex !== -1 && lastIndex === position;
  };
}

if (!Array.from) {
  Array.from = function () {
    var toStr = Object.prototype.toString;

    var isCallable = function isCallable(fn) {
      return typeof fn === 'function' || toStr.call(fn) === '[object Function]';
    };

    var toInteger = function toInteger(value) {
      var number = Number(value);

      if (isNaN(number)) {
        return 0;
      }

      if (number === 0 || !isFinite(number)) {
        return number;
      }

      return (number > 0 ? 1 : -1) * Math.floor(Math.abs(number));
    };

    var maxSafeInteger = Math.pow(2, 53) - 1;

    var toLength = function toLength(value) {
      var len = toInteger(value);
      return Math.min(Math.max(len, 0), maxSafeInteger);
    }; // La propiedad length del método from es 1.


    return function from(arrayLike
    /*, mapFn, thisArg */
    ) {
      // 1. Deje a C ser el este valor.
      var C = this; // 2. Deje que los elementos sean ToObject(arrayLike).

      var items = Object(arrayLike); // 3. Retornar IfAbrupt(items).

      if (arrayLike == null) {
        throw new TypeError('Array.from requiere un objeto array-like - not null or undefined');
      } // 4. Si mapfn no está definida, entonces deja que sea false.


      var mapFn = arguments.length > 1 ? arguments[1] : void undefined;
      var T;

      if (typeof mapFn !== 'undefined') {
        // 5. si no
        // 5. a If IsCallable(mapfn) es false, lanza una excepción TypeError.
        if (!isCallable(mapFn)) {
          throw new TypeError('Array.from: si hay mapFn, el segundo argumento debe ser una función');
        } // 5. b. Si thisArg se suministró, deje que T sea thisArg; si no, deje que T esté indefinido.


        if (arguments.length > 2) {
          T = arguments[2];
        }
      } // 10. Let lenValue be Get(items, "length").
      // 11. Let len be ToLength(lenValue).


      var len = toLength(items.length); // 13. If IsConstructor(C) is true, then
      // 13. a. Let A be the result of calling the [[Construct]] internal method of C with an argument list containing the single item len.
      // 14. a. Else, Let A be ArrayCreate(len).

      var A = isCallable(C) ? Object(new C(len)) : new Array(len); // 16. Let k be 0.

      var k = 0; // 17. Repeat, while k < len… (also steps a - h)

      var kValue;

      while (k < len) {
        kValue = items[k];

        if (mapFn) {
          A[k] = typeof T === 'undefined' ? mapFn(kValue, k) : mapFn.call(T, kValue, k);
        } else {
          A[k] = kValue;
        }

        k += 1;
      } // 18. Let putStatus be Put(A, "length", len, true).


      A.length = len; // 20. Return A.

      return A;
    };
  }();
}

var MEMBER_ID = 8484;
var agente = navigator.userAgent;
var pathname = window.location.pathname;
var elements_path = pathname.split('/').filter(function (item) {
  return item.match(/(\w+)/g);
});
var body_class = document.querySelector('body').getAttribute('class'); // const IS_DEBUG = location.href.includes('consoles=true')

var IS_MOBILE = /iPad|iPhone|iPod|android|webOS|Windows Phone/i.test(navigator.userAgent);
var device = IS_MOBILE ? 'm' : 'd';
var PREBID_TIMEOUT = site === 'p21' ? 1500 : 3000;
var BIDDER_PERCENTAGE = 0.85; // eslint-disable-next-line no-use-before-define

var apntag = apntag || {}; // apntag viene de lib

apntag.anq = apntag.anq || []; // eslint-disable-next-line no-use-before-define

var pbjs = pbjs || {}; // pbjs viene de lib

pbjs.que = pbjs.que || [];
var slot = "".concat(site, "_").concat(device, "_").concat(type_space);
var result = available_ports.find(function (el) {
  return el.name === type_space;
});
var dataDevice = device === 'd' && result !== null ? result.desktop_space : result.mobile_space;
var adsParams = dataDevice && dataDevice.map(function (el) {
  return {
    invCode: "".concat(slot, "_").concat(el),
    sizes: device === 'd' ? space_device.desktop[el] : space_device.mobile[el],
    allowedFormats: site === 'eco' ? ['video', 'banner', 'native'] : ['video', 'banner'],
    targetId: "ads_".concat(device, "_").concat(el)
  };
});
if (agente.includes('Google Page Speed Insights')) site = 'psi';

var getTags = function getTags() {
  var array_tags = [];
  var tags_section = document.querySelector("meta[name='etiquetas']");
  var findTags = document.querySelectorAll('meta[property="article:tag"]');
  var nota_tags = '';
  var tags = tags_section === null ? findTags : tags_section.content;

  if (tags.length) {
    if (tags_section !== null) {
      nota_tags = tags.replace(/ /g, '');
      nota_tags = nota_tags.normalize('NFKD').replace(/[\u0300-\u036F]/g, '');
      nota_tags = nota_tags.toLowerCase().split(',');
    } else nota_tags = tags.map(function (el) {
      return el.content.replace(/ /g, '');
    });

    return nota_tags;
  }

  if (section === 'buscar') array_tags.push(window.location.search.slice(3).split('+').join('').toLowerCase());else if (section === 'tags') array_tags.push(elements_path[1].split('-').join('').toLowerCase());
  return array_tags;
};

var tags = getTags(); // if (IS_DEBUG) console.log(tags)

var createDiv = function createDiv(id) {
  var div = document.createElement('div');
  div.id = id;
  return div;
};

var fireRequest = function fireRequest(url) {
  var request = new XMLHttpRequest();
  request.open('GET', url);
  request.send();
}; // TODO puede fallar sin el while


var parseJsTrackers = function parseJsTrackers(str) {
  var url = str.split('"').find(function (el) {
    return el.startsWith('http');
  });
  return url !== null ? [url] : [];
};

var peruRedShowTag = function peruRedShowTag() {
  if (body_class.includes('story')) {
    for (var i = 1; i <= 3; i++) {
      apntag.defineTag({
        invCode: "red_".concat(device, "_").concat(site, "_perured").concat(i),
        sizes: [[300, 250], [320, 100], [320, 50], [120, 240], [250, 250], [200, 200], [180, 150], [125, 125]],
        allowedFormats: ['native', 'banner'],
        targetId: "an-".concat(device, "-ad-").concat(i),
        native: {
          title: {
            required: true,
            max_length: 60
          },
          body: {
            required: true,
            max_length: 130
          },
          image: {
            required: true // sizes: [{width: 300, height: 160}]

          },
          sponsoredBy: {
            required: false,
            max_length: 25
          },
          cta: {
            required: false,
            max_length: 15
          }
        }
      });
    }

    apntag.loadTags();
    var cntPerured = document.querySelector("#cnt-perured-".concat(device));

    if (cntPerured !== undefined) {
      var _loop = function _loop(index) {
        var id = "an-".concat(device, "-ad-").concat(index);
        var div = createDiv(id);
        cntPerured.appendChild(div);
        apntag.anq.push(function () {
          apntag.showTag(id);
          apntag.onEvent('adAvailable', id, function (adObj) {
            // console.log("Objeto tipo => ", adObj);

            /* document.querySelector(`.perured-header-${device}`).style.display =
              'block'
            document.querySelector(`.perured-footer-${device}`).style.display =
              'block' */
            if (adObj.adType === 'native') {
              var ad = document.getElementById(adObj.targetId);
              var nObj = adObj.native;
              var _nObj$image = nObj.image;
              _nObj$image = _nObj$image === void 0 ? {} : _nObj$image;
              var imgSrc = _nObj$image.url,
                  _nObj$clickUrl = nObj.clickUrl,
                  clickUrl = _nObj$clickUrl === void 0 ? '' : _nObj$clickUrl,
                  _nObj$title = nObj.title,
                  title = _nObj$title === void 0 ? '' : _nObj$title,
                  _nObj$body = nObj.body,
                  body = _nObj$body === void 0 ? '' : _nObj$body,
                  _nObj$sponsoredBy = nObj.sponsoredBy,
                  sponsoredBy = _nObj$sponsoredBy === void 0 ? '' : _nObj$sponsoredBy,
                  _nObj$cta = nObj.cta,
                  cta = _nObj$cta === void 0 ? 'Leer más' : _nObj$cta,
                  _nObj$clickTrackers = nObj.clickTrackers,
                  clickTrackers = _nObj$clickTrackers === void 0 ? '' : _nObj$clickTrackers;
              var template = "\n                      <a href=\"".concat(clickUrl, "\" target=\"_blank\" style=\"text-decoration:none;\">\n                        <img class=\"an-native-img\" src=\"").concat(imgSrc, "\" width=\"300\"/>\n                        <div class=\"an-native-ad stacked\" style=\"display:block;font-family:Arial, sans-serif;max-width:300px;border-bottom: #084B9E 1px solid;padding:10px 0;margin-bottom: 6px;\">\n                          <header class=\"an-native-headline\" style=\"font-weight:bold;font-size:18px;line-height: 17px;color: #3b3b3b;padding: 2px 5px;\">").concat(title, "</header>\n                          <div class=\"an-native-body\" style=\"margin:5px 0;font-size:15px;color: #7b7b7b;padding: 2px 5px;\">\n                            ").concat(body, "\n                          </div>\n                          <div class=\"an-native-sponsor-wrapper\" style=\"padding: 2px 5px;\">\n                            <span class=\"an-native-sponsor\" style=\"color: #4C4C4C;font-size: 12px;font-weight: bold;\">").concat(sponsoredBy, "</span>\n                            <span class=\"an-native-cta\" style=\"background-color: #ffffff;border: 1px solid #dcdcdc;cursor: pointer;color: #666666;font-size: 10px;font-weight: bold;padding: 6px 16px;float:right;\">").concat(cta, "</span>\n                          </div>\n                        </div>\n                      </a>");
              ad.innerHTML = template; // collect and fire off the trackers

              var impTrackers = nObj.impressionTrackers || [];
              var jsTrackers = parseJsTrackers(nObj.javascriptTrackers) || []; // fire imp trackers

              impTrackers.forEach(function (el) {
                fireRequest(el);
              });
              jsTrackers.forEach(function (el) {
                // this is where you would filter out tracker that you don't want to fire
                // for example, this will only include moat trackers:
                // if(url.indexOf('//z.moatads.com') > -1) { /* .... * }
                var d = document;
                var tar = d.querySelector('head');
                var scr = d.createElement('script');
                scr.type = 'text/javascript';
                scr.async = true;
                scr.src = el;
                tar.insertBefore(scr, tar.firstChild);
              }); // set up handlers for click trackers -
              // this will only work if you wrap clickable elements in <a> tags

              var clickable = Array.from(ad.getElementsByTagName('a'));
              clickable.forEach(function (node) {
                node.addEventListener('click', function () {
                  clickTrackers.forEach(function (el) {
                    fireRequest(el);
                  });
                });
              });
            }
          });
        });
      };

      for (var index = 1; index <= 3; index++) {
        _loop(index);
      } // if (IS_DEBUG) console.log('PERU RED CARGADO!!!!')

    }
  }
};

var initAdserver = function initAdserver() {
  if (!pbjs.requestSent) {
    pbjs.requestSent = true;
    pbjs.que.push(function () {
      apntag.anq.push(function () {
        pbjs.setTargetingForAst();
        apntag.loadTags();
        adsParams.forEach(function (el) {
          return apntag.anq.push(function () {
            apntag.showTag(el.targetId);
          });
        }); // if (IS_DEBUG) console.log('INITADDSERVER')
      });
    });
  }
};

var inline = function inline(data) {
  if (body_class.includes('story') || body_class.includes('blogPost')) {
    var spaces = data.spaces;

    if (spaces && Array.isArray(spaces)) {
      spaces.forEach(function (space) {
        var adPlace = document.getElementById(space.name) || createDiv(space.id);
        var target = typeof space.target === 'string' ? document.querySelector("".concat(space.target, " > section")) : space.target;

        if (target) {
          var childs = Array.from(target.children).filter(function (node) {
            return node.nodeName === 'P';
          });
          var numChilds = childs.length;

          if (numChilds < 3) {
            target.insertBefore(adPlace, childs[numChilds - 1]);
          } else if (space.position) {
            target.insertBefore(adPlace, childs[space.position]);
          } else {
            target.insertBefore(adPlace, childs[2]);
          }

          setTimeout(function () {
            apntag.anq.push(function () {
              apntag.showTag(space.name);
            });
          }, 2000); // } else {
          //     if (IS_DEBUG) console.log(target);
          // }
        }
      });
    } // if (IS_DEBUG) console.log('INLINE CARGADO!!!!');

  }
};

var getTagInline = function getTagInline() {
  var spaces = IS_MOBILE ? [{
    target: '#contenedor',
    name: 'ads_m_movil3',
    position: 3
  }, {
    target: '#contenedor',
    name: 'ads_m_movil_video',
    position: 1
  }] : [{
    target: '#contenedor',
    name: 'ads_d_inline',
    position: 2
  }];
  return {
    spaces: spaces
  };
}; // Definir auction


var iterableAuction = device === 'd' ? auction.desktop : auction.mobile;
var dataFilter = iterableAuction.map(function (el) {
  return {
    name: el.name,
    val: el.values.filter(function (item) {
      return Object.keys(item).length > 0 && item.ports.find(function (val) {
        return val === type_space;
      });
    })
  };
});
var adUnits = [];
dataFilter.forEach(function (el) {
  el.val.forEach(function (obj) {
    return adUnits.push({
      code: obj.div_id,
      mediaTypes: {
        banner: {
          sizes: obj.size
        }
      },
      bids: [{
        bidder: el.name,
        params: obj.params
      }]
    });
  });
}); // if (IS_DEBUG) console.log(adUnits);

if (adUnits.length > 0) {
  pbjs.que.push(function () {
    pbjs.setConfig({
      userSync: {
        filterSettings: {
          iframe: {
            bidders: '*',
            // '*' represents all bidders
            filter: 'include'
          }
        }
      },
      priceGranularity: 'dense'
    });
    var bidders = new Set(adUnits.map(function (el) {
      return el.bids[0].bidder;
    }));
    var bds = {};
    bidders.forEach(function (bd) {
      if (bd === 'rubicon') {
        bds[bd] = {
          bidCpmAdjustment: function bidCpmAdjustment(bidCpm) {
            return bidCpm * BIDDER_PERCENTAGE;
          }
        };
      }

      if (bd === 'audienceNetwork') {
        bds[bd] = {
          adserverTargeting: [{
            key: 'fb_adid',
            val: function val(bidResponse) {
              return bidResponse.fb_adid;
            }
          }, {
            key: 'hb_bidder',
            val: function val(bidResponse) {
              return bidResponse.bidderCode;
            }
          }, {
            key: 'hb_pb',
            val: function val(bidResponse) {
              return bidResponse.pbMg;
            }
          }]
        };
      }
    });
    pbjs.bidderSettings = bds;
    pbjs.addAdUnits(adUnits);
    pbjs.requestBids({
      bidsBackHandler: function bidsBackHandler() {
        initAdserver(); // if (!document.location.href.includes('/mag.')) {

        var tag_inline = getTagInline();
        inline(tag_inline); // }

        peruRedShowTag();
      },
      timeout: PREBID_TIMEOUT
    });
  }); // if (IS_DEBUG) console.log('HEADER BIDDING CARGADO')
} // START APPNEXUS EVENTS


var actionEvent = function actionEvent(_ref) {
  var type = _ref.type,
      targetId = _ref.targetId;
  console.warn('Appnexus', type);
  var adsSpace = document.querySelector("#".concat(targetId));
  var containerAd = adsSpace.parentNode.childNodes.length === 1 ? adsSpace.parentNode : adsSpace;
  containerAd.classList.add('hidden');
};

var setGlobalEvents = function setGlobalEvents(eventList, targetId) {
  eventList.forEach(function (eventName) {
    if (apntag) {
      apntag.onEvent(eventName, targetId, function () {
        return actionEvent({
          type: eventName,
          targetId: targetId
        });
      });
    }
  });
};

var global_events = ['adNoBid', 'adBadRequest', 'adRequestFailure', 'adError'];
dataLayer.push({
  event: 'definir_eventos_appnexus'
}); // END EVENTS

apntag.anq.push(function () {
  apntag.setPageOpts({
    member: MEMBER_ID,
    disablePsa: true,
    keywords: {
      tipo: type_template,
      seccion: section,
      subseccion: subsection,
      categoria: '',
      tags: tags,
      path_name: path_name
    }
  });
  adsParams.map(function (val) {
    return apntag.defineTag(_objectSpread({}, val));
  });
  adsParams.forEach(function (_ref2) {
    var targetId = _ref2.targetId;
    return targetId && setGlobalEvents(global_events, targetId);
  }); // if (IS_DEBUG) console.log('APP NEXUS CARGADO!!!!')
});

var initWithoutHB = function initWithoutHB() {
  apntag.anq.push(function () {
    apntag.loadTags();
    adsParams.forEach(function (el) {
      return apntag.anq.push(function () {
        apntag.showTag(el.targetId);
      });
    }); // if (!document.location.href.includes('/mag.')) {

    var tag_inline = getTagInline();
    inline(tag_inline); // }

    peruRedShowTag();
  });
};

if (adUnits.length === 0) {
  // if (IS_DEBUG) console.log(adUnits)
  initWithoutHB();
}