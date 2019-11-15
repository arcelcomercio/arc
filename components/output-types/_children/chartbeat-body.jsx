import React from 'react'

const getSectionList = (sections, type) => {
  const regex = /^\/[\d\w-/]+/g
  const evalString = sections.match(regex)
  const formatList = `${evalString}`.startsWith('/')
    ? `${evalString}`.slice(1)
    : `${evalString}`
  const stringList = formatList.split('/')
  if (type === 'meta_home') return 'portada'
  if (type === 'meta_section') return stringList
  if (type === 'meta_story') return stringList.slice(0, [stringList.length - 1])
  if (
    type === 'meta_archive' ||
    type === 'meta_author' ||
    type === 'meta_tag' ||
    type === 'meta_search'
  ) {
    return stringList[0]
  }
  return ''
}

const infoStory = (
  { credits: { by = [] } = {}, taxonomy = {}, promo_items: promoItems = {} },
  arcSite
) => {
  const getAuthor = () => {
    return (by && by[0] && by[0].name) || arcSite
  }

  const getTagList = () => {
    const { tags = [] } = taxonomy
    const listTags = tags.map(tag => tag.slug)
    const formatTags = listTags.join()
    return formatTags
  }

  const getTypeStory = () => {
    const type = promoItems
    const arrType = Object.keys(type)

    if (arrType[0] === 'basic_gallery') {
      return {
        stringType: 'Articulo Nota Fotogaleria',
        type: 'foto_galeria',
      }
    }
    if (arrType[0] === 'basic_video') {
      return {
        stringType: 'Articulo Nota Simple',
        type: 'video',
      }
    }
    return {
      stringType: 'Articulo Nota Simple',
      type: 'imagen',
    }
  }

  return {
    author: getAuthor(),
    tags: getTagList(),
    typeStory: getTypeStory(),
  }
}

const ChartbeatBody = props => {
  const { story, requestUri, metaValue, globalContent, arcSite } = props
  const page = metaValue('id')
  const sectionList = getSectionList(requestUri, page)
  const dataStory = story && infoStory(globalContent, arcSite)
  const { author, tags, typeStory } = dataStory || {}
  const { type, stringType } = typeStory || {}
  const renderSections = story ? sectionList.concat(tags) : sectionList
  const chartbeatConfig = `
    var _sf_async_config = _sf_async_config || {}; 	_sf_async_config.sections = "${renderSections}";
		${
    story
      ? `
		_sf_async_config.authors = '${author}'; 	_sf_async_config.type =  '${type}'; 		_sf_async_config.contentType = "${stringType}";
		`
      : ''
    }
    (function() {
          function loadChartbeat() {
              window._sf_endpt = (new Date()).getTime(); var e = document.createElement('script'); e.setAttribute('language', 'javascript'); e.setAttribute('type', 'text/javascript');
              e.setAttribute('src', '//static.chartbeat.com/js/chartbeat_video.js'); document.body.appendChild(e);
          }
          var oldonload = window.onload;
          window.onload = (typeof window.onload != 'function') 
            ? loadChartbeat 
            : function() { oldonload(); loadChartbeat(); };
      })();    
  `
  return (
    <>
      <script
        async
        type="text/javascript"
        dangerouslySetInnerHTML={{ __html: chartbeatConfig }}
      />
    </>
  )
}

export default ChartbeatBody
