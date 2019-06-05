const MEMBER_ID = 8484
const adtype = ''
const spaces = []
const agente = navigator.userAgent
const pathname = window.location.pathname
const elements_path = pathname.split('/').filter(item => item.match(/(\w+)/g))
const body_class = document.querySelector('body').getAttribute('class')
if (agente.includes('Google Page Speed Insights')) site = 'psi'

const getTags = () => {
  const array_tags = []
  const nota_tags = ''
  const tags_section = document.querySelector("meta[name='etiquetas']")
  const findTags = document.querySelectorAll('meta[property="article:tag"]')
  const tags = tags_section == null ? findTags : tags_section.content

  if (tags.length) {
    if (tags_section !== null) {
      nota_tags = tags.replace(/ /g, '')
      nota_tags = nota_tags.normalize('NFKD').replace(/[\u0300-\u036F]/g, '')
      nota_tags = nota_tags.toLowerCase()
    } else tags.forEach(el => (nota_tags = el.content.replace(/ /g, '')))
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

const tags = getTags()

const IS_DEBUG = location.href.includes('consoles=true')
IS_DEBUG ? console.log(tags) : null

const IS_MOBILE = navigator.userAgent.match(
  /(iPad)|(iPhone)|(iPod)|(android)|(webOS)|(Windows Phone)/i
)
  ? true
  : false

const device = IS_MOBILE ? 'm' : 'd'

// VERSIÓN DESKTOP
if (body_class.includes('nota')) {
  const get_tipo_nota = document.querySelector("meta[name='typeNota']")
  const tipo_nota = get_tipo_nota.content || null
}

const PREBID_TIMEOUT = 3000
const BIDDER_PERCENTAGE = 0.85

let pbjs = pbjs || {}
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

// Definir auction
const iterableAuction = device === 'd' ? auction.desktop : auction.mobile
const dataFilter = iterableAuction.map(el => {
  return {
    name: el.name,
    val: el.values.filter(item => item.ports.find(val => val === type_space)),
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
      if (bd === 'smartadserver') {
        bds[bd] = {
          bidCpmAdjustment: (bidCpm, bid) => {
            const nbcpm = bidCpm * 0.8
            window.sessionStorage.setItem(
              '4519_SMART',
              JSON.stringify({
                bidCpm,
                bid,
                new_bidCpm: nbcpm,
              })
            )
            return nbcpm
          },
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
      bidsBackHandler: bidResponses => {
        initAdserver()
        if (!document.location.href.includes('/mag.')) {
          const tag_inline = getTagInline()
          inline(tag_inline)
        }
        peruRedShowTag()
      },
      timeout: PREBID_TIMEOUT,
    })
  })

  //if (IS_DEBUG) console.log('HEADER BIDDING CARGADO')
}

var apntag = apntag || {}
apntag.anq = apntag.anq || []

//END EVENTS
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
  adsParams.map(val => apntag.defineTag({ ...val }))
  //if (IS_DEBUG) console.log('APP NEXUS CARGADO!!!!')
})

const initWithoutHB = () => {
  apntag.anq.push(function() {
    apntag.loadTags()
    adsParams.forEach(el =>
      apntag.anq.push(() => {
        apntag.showTag(el.targetId)
      })
    )
    if (!document.location.href.includes('/mag.')) {
      const tag_inline = getTagInline()
      inline(tag_inline)
    }
    peruRedShowTag()
  })
}

if (adUnits.length == 0) {
  //if (IS_DEBUG) console.log(adUnits)
  initWithoutHB()
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

const createDiv = id => {
  const div = document.createElement('div')
  div.id = id
  return div
}

const peruRedShowTag = () => {
  if (body_class.includes('nota')) {
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
    adtype = device
    apntag.loadTags()
    const cntPerured = document.querySelector(`#cnt-perured-${adtype}`)

    if (cntPerured != undefined) {
      for (let index = 1; index <= 3; index++) {
        const id = `an-${adtype}-ad-${index}`
        const div = createDiv(id)
        cntPerured.appendChild(div)

        apntag.anq.push(() => {
          apntag.showTag(id)
          apntag.onEvent('adAvailable', id, adObj => {
            // console.log("Objeto tipo => ", adObj);
            document.querySelector(`.perured-header-${adtype}`).style.display =
              'block'
            document.querySelector(`.perured-footer-${adtype}`).style.display =
              'block'

            if (adObj.adType == 'native') {
              const ad = document.getElementById(adObj.targetId)

              const nObj = adObj.native
              const clickUrl = nObj.clickUrl
              const title = nObj.title
              const body = nObj.body
              const sponsor =
                typeof nObj.sponsoredBy == 'undefined' ? '' : nObj.sponsoredBy
              const imgSrc = nObj.image && nObj.image.url
              const cta = typeof nObj.cta == 'undefined' ? 'Leer más' : nObj.cta

              const template = `
                      <a href="${clickUrl}" target="_blank" style="text-decoration:none;">
                        <img class="an-native-img" src="${imgSrc}" width="300"/>
                        <div class="an-native-ad stacked" style="display:block;font-family:Arial, sans-serif;max-width:300px;border-bottom: #084B9E 1px solid;padding:10px 0;margin-bottom: 6px;">
                          <header class="an-native-headline" style="font-weight:bold;font-size:18px;line-height: 17px;color: #3b3b3b;padding: 2px 5px;">${title}</header>
                          <div class="an-native-body" style="margin:5px 0;font-size:15px;color: #7b7b7b;padding: 2px 5px;">
                            ${body}
                          </div>
                          <div class="an-native-sponsor-wrapper" style="padding: 2px 5px;">
                            <span class="an-native-sponsor" style="color: #4C4C4C;font-size: 12px;font-weight: bold;">${sponsor}</span>
                            <span class="an-native-cta" style="background-color: #ffffff;border: 1px solid #dcdcdc;cursor: pointer;color: #666666;font-size: 10px;font-weight: bold;padding: 6px 16px;float:right;">${cta}</span>
                          </div>
                        </div>
                      </a>`

              ad.innerHTML = template

              // collect and fire off the trackers
              const impTrackers = nObj.impressionTrackers || []
              const jsTrackers = parseJsTrackers(nObj.javascriptTrackers) || []
              const clickTrackers = nObj.clickTrackers

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
      //if (IS_DEBUG) console.log('PERU RED CARGADO!!!!')
    }
  }
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

const inline = data => {
  if (body_class.includes('nota')) {
    const spaces = data.spaces
    if (spaces && Array.isArray(spaces)) {
      spaces.forEach(space => {
        const adPlace =
          document.getElementById(space.name) || createDiv(space.id)
        const target =
          typeof space.target === 'string'
            ? document.querySelector(space.target)
            : space.target
        if (target) {
          const childs = [...target.children].filter(
            node => node.nodeName === 'P'
          )
          const numChilds = childs.length

          if (numChilds < 3) {
            target.insertBefore(adPlace, childs[numChilds - 1])
          } else {
            space.position
              ? target.insertBefore(adPlace, childs[space.position])
              : target.insertBefore(adPlace, childs[2])
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
  const nameSpace = IS_MOBILE ? 'ads_m_movil3' : 'ads_d_inline'
  return {
    spaces: [
      {
        target: '#contenedor',
        name: nameSpace,
        position: 0,
      },
    ],
  }
}

// if (window.location.pathname == '/mundial/seleccion' && IS_MOBILE)
//   document.getElementById('ads-movil-movil_2').style.display = 'block'
