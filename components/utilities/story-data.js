import { addResizedUrlItem } from './thumbs'
import ConfigParams from './config-params'
import {
  defaultImage,
  formatHtmlToText,
  breadcrumbList,
  addSlashToEnd,
} from './helpers'

class StoryData {
  static VIDEO = ConfigParams.VIDEO

  static GALLERY = ConfigParams.GALLERY

  static HTML = ConfigParams.HTML

  static IMAGE = ConfigParams.IMAGE

  static AUTOR_SOCIAL_NETWORK_TWITTER =
    ConfigParams.AUTOR_SOCIAL_NETWORK_TWITTER

  constructor({
    data = {},
    deployment = () => {},
    contextPath = '',
    arcSite = '',
    defaultImgSize = 'md',
    siteUrl = '',
  }) {
    this._data = data
    this._deployment = deployment
    this._contextPath = contextPath
    this._website = arcSite
    this._defaultImgSize = defaultImgSize
    this._siteUrl = siteUrl
  }

  get __data() {
    return this._data
  }

  set __data(val) {
    this._data = val
  }

  get __website() {
    return this._website
  }

  set __website(val) {
    this._website = val
  }

  get __defaultImgSize() {
    return this._defaultImgSize
  }

  set __defaultImgSize(val) {
    this._defaultImgSize = val
  }

  get id() {
    return (this._data && this._data._id) || ''
  }

  get title() {
    return (
      (this._data && this._data.headlines && this._data.headlines.basic) || ''
    )
  }

  get tags() {
    return (this._data && this._data.taxonomy && this._data.taxonomy.tags) || []
  }

  get subTitle() {
    return (
      (this._data &&
        this._data.subheadlines &&
        this._data.subheadlines.basic) ||
      ''
    )
  }

  get author() {
    return StoryData.getDataAuthor(this._data).nameAuthor
  }

  get seoAuthor() {
    const defaultAuthor = 'Redacción '
    return (
      StoryData.getDataAuthor(this._data).nameAuthor ||
      defaultAuthor +
        this._website.charAt(0).toUpperCase() +
        this._website.slice(1)
    )
  }

  get authorLink() {
    return addSlashToEnd(StoryData.getDataAuthor(this._data).urlAuthor)
  }

  get authorSlug() {
    return StoryData.getDataAuthor(this._data).slugAuthor
  }

  get authorTwitterLink() {
    const twitter = StoryData.getDataAuthor(this._data).socialLinks.filter(
      x => x.site === ConfigParams.AUTOR_SOCIAL_NETWORK_TWITTER
    )
    const result = twitter && twitter[0] && twitter[0].url ? twitter[0].url : ''
    return result
  }

  get defaultImg() {
    return defaultImage({
      deployment: this._deployment,
      contextPath: this._contextPath,
      arcSite: this._website,
      size: this._defaultImgSize,
    })
  }

  get authorImage() {
    return (
      StoryData.getDataAuthor(this._data, {
        contextPath: this._contextPath,
      }).imageAuthor || this.defaultImg
    )
  }

  get multimedia() {
    return this.getMultimediaBySize(ConfigParams.IMAGE_ORIGINAL)
  }

  get multimediaLandscapeXL() {
    return this.getMultimediaBySize(ConfigParams.LANDSCAPE_XL)
  }

  get multimediaLandscapeL() {
    return this.getMultimediaBySize(ConfigParams.LANDSCAPE_L)
  }

  get multimediaLandscapeMD() {
    return this.getMultimediaBySize(ConfigParams.LANDSCAPE_MD)
  }

  get multimediaLandscapeS() {
    return this.getMultimediaBySize(ConfigParams.LANDSCAPE_S)
  }

  get multimediaLandscapeXS() {
    return this.getMultimediaBySize(ConfigParams.LANDSCAPE_XS)
  }

  get multimediaPortraitXL() {
    return this.getMultimediaBySize(ConfigParams.PORTRAIT_XL)
  }

  get multimediaPortraitL() {
    return this.getMultimediaBySize(ConfigParams.PORTRAIT_L)
  }

  get multimediaPortraitMD() {
    return this.getMultimediaBySize(ConfigParams.PORTRAIT_MD)
  }

  get multimediaPortraitS() {
    return this.getMultimediaBySize(ConfigParams.PORTRAIT_S)
  }

  get multimediaPortraitXS() {
    return this.getMultimediaBySize(ConfigParams.PORTRAIT_XS)
  }

  get multimediaSquareXL() {
    return this.getMultimediaBySize(ConfigParams.SQUARE_XL)
  }

  get multimediaSquareL() {
    return this.getMultimediaBySize(ConfigParams.SQUARE_L)
  }

  get multimediaSquareMD() {
    return this.getMultimediaBySize(ConfigParams.SQUARE_MD)
  }

  get multimediaSquareS() {
    return this.getMultimediaBySize(ConfigParams.SQUARE_S)
  }

  get multimediaSquareXS() {
    return this.getMultimediaBySize(ConfigParams.SQUARE_XS)
  }

  get multimediaLazyDefault() {
    return this.getMultimediaBySize(ConfigParams.LAZY_DEFAULT)
  }

  get multimediaType() {
    return StoryData.getTypeMultimedia(this._data)
  }

  get section() {
    // FIXME: deprecated
    return StoryData.getDataSection(this._data, this._website).name
  }

  get sectionLink() {
    // FIXME: deprecated
    return addSlashToEnd(
      StoryData.getDataSection(this._data, this._website).path
    )
  }

  get primarySection() {
    return StoryData.getPrimarySection(this._data).name
  }

  get primarySectionLink() {
    return addSlashToEnd(StoryData.getPrimarySection(this._data).path) || ''
  }

  get sectionsFIA() {
    let result = { section: null, subsection: null }
    if (
      this._data.taxonomy &&
      this._data.taxonomy.primary_section &&
      this._data.taxonomy.primary_section.path
    ) {
      result = { section: null, subsection: null }
      const listSections = this._data.taxonomy.primary_section.path.split('/')

      result.section = listSections[1] !== undefined ? listSections[1] : null
      result.subsection = listSections[2] !== undefined ? listSections[2] : null
    }
    return result
  }

  get allSections() {
    let sections = []
    let result = []
    if (this._data.taxonomy && this._data.taxonomy.sections) {
      sections = this._data.taxonomy.sections.map(sec => sec.name)
    }
    result = sections.filter(x => x !== null || x !== undefined || x !== '')
    return result
  }
  // TODO: Validar que link regrese la url correcta de la nota

  get link() {
    const { website_url: url = '' } = this._data || {}
    return addSlashToEnd(url)
  }

  get canonicalUrl() {
    // obtiene el url de canonical para el content source story-feed-by-collection y story-feed-by-collection-newsletter
    const { canonical_url: url = '' } = this._data || {}
    return url
  }

  get websiteLink() {
    const { websites = {} } = this._data || {}
    const brandWeb = websites[this._website] || {}
    return brandWeb.website_url || ''
  }

  get relatedContent() {
    const { related_content: { basic = [] } = {} } = this._data || {}
    return basic
  }

  get videoSeo() {
    const videosContent = StoryData.getVideoContent(
      this._data && this._data.content_elements,
      'video'
    )

    const promoItemsVideo =
      this._data &&
      this._data.promo_items &&
      StoryData.getSeoMultimedia(this._data.promo_items, 'video')

    return videosContent.concat(promoItemsVideo).filter(String)
  }

  get seoTitle() {
    const { headlines: { meta_title: metaTitle = '', basic = '' } = {} } =
      this._data || {}
    return metaTitle || basic
  }

  get getVideoPrincipal() {
    return (this._data &&
      this._data.promo_items &&
      StoryData.getSeoMultimedia(this._data.promo_items, 'video')) ||
      []
  }

  get getGallery() {
    return (this._data &&
        this._data.promo_items &&
        StoryData.getSeoMultimedia(this._data.promo_items, 'image')) ||
      []
  }

  get imagesSeo() {
    const imagesContent =
      StoryData.getContentElements(
        this._data && this._data.content_elements,
        'image'
      ) || []

    const galleryContentResul =
      StoryData.getContentElements(
        this._data && this._data.content_elements,
        'gallery'
      ) || []

    const { content_elements: galleryContent = [] } =
      galleryContentResul[0] || []

    const promoItemsImage =
      (this._data &&
        this._data.promo_items &&
        StoryData.getSeoMultimedia(this._data.promo_items, 'image')) ||
      []

    return imagesContent
      .concat(galleryContent)
      .concat(promoItemsImage)
      .filter(String)
  }

  // TODO: Cambiar la fecha a lo que se estandarice
  get date() {
    return this.displayDate
  }

  get displayDate() {
    return (this._data && this._data.display_date) || ''
  }

  get publishDate() {
    return (this._data && this._data.publish_date) || ''
  }

  get createdDate() {
    return (this._data && this._data.created_date) || ''
  }

  get firstPublishDate() {
    return (this._data && this._data.first_publish_date) || ''
  }

  get lastPublishDate() {
    return (this._data && this._data.last_updated_date) || ''
  }

  get isPremium() {
    return (
      this.__data &&
      this.__data.content_restrictions &&
      this.__data.content_restrictions.content_code === 'premium'
    )
  }

  get videoId() {
    return (
      (this._data &&
        this._data.promo_items &&
        this._data.promo_items[ConfigParams.VIDEO] &&
        this._data.promo_items[ConfigParams.VIDEO]._id) ||
      ''
    )
  }

  get video() {
    return (
      (this._data &&
        this._data.promo_items &&
        this._data.promo_items[ConfigParams.VIDEO] &&
        this._data.promo_items[ConfigParams.VIDEO].embed_html) ||
      ''
    )
  }

  get paragraphsNews() {
    const { content_elements: contentElements = [] } = this._data

    const parrafo = contentElements.map(
      ({ content = '', type = '', _id = '', url = '' }) => {
        // ELEMENT_VIDEO
        // ELEMENT_IMAGE
        // ELEMENT_TEXT
        const result = { _id, type, payload: '' }
        
        switch (type) {
          case ConfigParams.ELEMENT_TEXT:
            result.payload = content 
            // && content
            break
          case ConfigParams.ELEMENT_IMAGE:
            result.payload = url 
            // && url
            break
          case ConfigParams.ELEMENT_VIDEO:
            result.payload = _id
            break
          case ConfigParams.ELEMENT_RAW_HTML:
            result.payload = content 
            // && content
            break
          default:
            result.payload = content
            break
        }
        return result
      }
    )

    // const result = parrafo.filter(x => x.payload !== null)
    return parrafo
  }

  get breadcrumbList() {
    const { website_url: url = '' } = this._data || {}
    return breadcrumbList(url, this._siteUrl)
  }

  get recentList() {
    const {
      recent_stories: { content_elements: contentElements = [] } = {},
      _id: id,
    } = this._data || {}
    return StoryData.recentList(contentElements, id)
  }

  get recentStoryContinue() {
    const {
      recent_stories: { content_elements: contentElements = [] } = {},
      _id: id,
    } = this._data || {}
    return StoryData.recentList(contentElements, id, 6)
  }

  get seoKeywords() {
    const { taxonomy: { seo_keywords: seoKeywords = [] } = {} } =
      this._data || {}
    return seoKeywords
  }

  // TODO: Improve raw attribute function (should only be getter's attribute)
  get attributesRaw() {
    const attributesObject = {}
    // eslint-disable-next-line no-restricted-syntax
    for (const attr of Object.getOwnPropertyNames(StoryData.prototype)) {
      if (attr !== 'attributesRaw') attributesObject[attr] = this[attr]
    }
    return attributesObject
  }

  get contentElementsText() {
    return (
      (this._data &&
        StoryData.getContentElementsText(
          this._data.content_elements,
          'text'
        )) ||
      ''
    )
  }

  get contentElementGallery() {
    return (
      (this._data &&
        this._data.promo_items &&
        this._data.promo_items[ConfigParams.GALLERY]) ||
      ''
    )
  }

  get contentElements() {
    return (this._data && this._data.content_elements) || []
  }

  get contentPosicionPublicidadAmp() {
    let i = 0
    const { content_elements: contentElements = null } = this._data
    return (
      contentElements &&
      contentElements.map(dataContent => {
        let dataElements = {}
        const { type: typeElement } = dataContent
        dataElements = dataContent
        if (i === 1) {
          dataElements.publicidad = true
          i += 1
        }
        if (typeElement === ConfigParams.ELEMENT_TEXT) {
          i += 1
        }
        return dataElements
      })
    )
  }

  get promoItems() {
    return (this._data && this._data.promo_items) || []
  }

  get sourceId() {
    return (
      (this._data && this._data.source && this._data.source.source_id) || ''
    )
  }

  get contentRestrictions() {
    return (
      (this._data &&
        this._data.content_restrictions &&
        this._data.content_restrictions.content_code === 'premium' &&
        true) ||
      false
    )
  }

  // Ratio (ejemplo: "1:1"), Resolution (ejemplo: "400x400")
  getResizedImage(ratio, resolution) {
    if (this.multimedia) {
      return addResizedUrlItem(this.__website, this.multimedia, [
        `${ratio}|${resolution}`,
      ]).resized_urls[ratio]
    }
    return this.multimedia
  }

  getMultimediaBySize(size) {
    return (
      StoryData.getThumbnailBySize(
        this._data,
        StoryData.getTypeMultimedia(this._data),
        size
      ) || this.defaultImg
    )
  }

  static getSeoMultimedia(
    {
      basic_video: basicVideo = {},
      basic_gallery: basicGallery = {},
      basic: basicImage = {},
    } = {},
    type = ''
  ) {
    if (basicVideo.promo_image && (type === 'video' || type === 'image')) {
      const {
        streams = [],
        publish_date: date = '',
        promo_image: { url: urlImage = '' } = {},
        headlines: { basic: caption = '' } = {},
      } = basicVideo
      if (type === 'video') {
        const dataVideo = streams
          .map(({ url, stream_type: streamType }) => {
            return streamType === 'mp4'
              ? {
                  url,
                  caption,
                  urlImage,
                  date,
                }
              : []
          })
          .filter(String)          
          const cantidadVideo = dataVideo.length
        return [dataVideo[cantidadVideo-1]]
      }

      return {
        url: urlImage,
        subtitle: caption,
      }
    }

    if (basicGallery.content_elements && type !== 'video') {
      const { content_elements: contentElements = {} } = basicGallery
      return contentElements
    }
    if (basicImage.url && type === 'image') {
      const {
        content_element: { basic: { url: urlImage1, caption = '' } = {} } = {},
        url: urlImage,
        subtitle,
      } = basicImage
      return {
        url: urlImage1 || urlImage,
        subtitle: caption || subtitle,
      }
    }

    return []
  }

  static getContentElementsText(data = [], typeElement = '') {
    return (
      data &&
      data.map(({ content, type }) => {
        return type === typeElement ? formatHtmlToText(content) : []
      })
    ).join(' ')
  }

  static getContentElements(data = [], typeElement = '') {
    return (
      data.map(item => {
        return item.type === typeElement ? item : []
      }) || []
    )
  }

  static getVideoContent(data = []) {
    const dataVideo =
      StoryData.getContentElements(data, 'video').filter(String) || []

    return (
      dataVideo
        .map(
          ({
            promo_image: { url: urlImage },
            streams,
            publish_date: date,
            headlines: { basic: caption = '' } = {},
          }) => {
            const resultVideo = streams
              .map(({ url = '', stream_type: streamType = '' }) => {
                return streamType === 'mp4'
                  ? {
                      url,
                      caption,
                      urlImage,
                      date,
                    }
                  : []
              })
              .filter(String)

            return resultVideo[0] || []
          }
        )
        .filter(String) || []
    )
  }

  static getPrimarySection(data) {
    const {
      taxonomy: {
        primary_section: { name = '', path = '' } = {},
        sections = [],
      } = {},
    } = data || {}

    // En caso de que el primary section no devuelva "path" ni "name"
    const { name: auxName, path: auxPath } = sections[0] || {}

    if (!name && !path) {
      return {
        name: auxName,
        path: auxPath,
      }
    }
    // //////////////////////////////////

    return {
      name,
      path,
    }
  }

  static getDataSection(data, website) {
    const sectionData =
      (data &&
        data.websites &&
        data.websites[website] &&
        data.websites[website].website_section) ||
      {}

    const section = sectionData.name || ''
    const path = sectionData.path || ''
    return {
      name: section,
      path,
    }
  }

  static getDataAuthor(data, { contextPath = '' } = {}) {
    const authorData = (data && data.credits && data.credits.by) || []
    const authorImageDefault = `${contextPath}/resources/assets/author-grid/author.png`

    let nameAuthor = ''
    let urlAuthor = ''
    let slugAuthor = ''
    let socialLinks = []

    let imageAuthor = authorImageDefault
    for (let i = 0; i < authorData.length; i++) {
      const iterator = authorData[i]
      if (iterator.type === 'author') {
        nameAuthor = iterator.name && iterator.name !== '' ? iterator.name : ''
        urlAuthor = iterator.url && iterator.url !== '' ? iterator.url : '#'
        slugAuthor = iterator.slug && iterator.slug !== '' ? iterator.slug : ''
        imageAuthor =
          iterator.image && iterator.image.url && iterator.image.url !== ''
            ? iterator.image.url
            : authorImageDefault
        socialLinks = iterator.social_links ? iterator.social_links : []
        break
      }
    }

    return {
      nameAuthor,
      urlAuthor,
      slugAuthor,
      imageAuthor,
      socialLinks,
    }
  }

  static getTypeMultimedia(data) {
    let typeMultimedia = ''
    const promoItems = (data && data.promo_items && data.promo_items) || {}
    const items = Object.keys(promoItems)
    let item = {}
    for (let i = 0; i <= items.length; i++) {
      item = promoItems[items[i]]
      if (
        typeof item === 'object' &&
        item !== null &&
        item !== undefined &&
        items[i] !== ConfigParams.HTML
      ) {
        typeMultimedia = items[i]
        break
      }
    }

    return typeMultimedia
  }

  static getThumbnailVideo(data, size = ConfigParams.IMAGE_ORIGINAL) {
    const thumb =
      (data &&
        data.promo_items &&
        data.promo_items[ConfigParams.VIDEO] &&
        data.promo_items[ConfigParams.VIDEO].promo_items &&
        data.promo_items[ConfigParams.VIDEO].promo_items[ConfigParams.IMAGE] &&
        ((data.promo_items[ConfigParams.VIDEO].promo_items[ConfigParams.IMAGE]
          .resized_urls &&
          data.promo_items[ConfigParams.VIDEO].promo_items[ConfigParams.IMAGE]
            .resized_urls[size]) ||
          data.promo_items[ConfigParams.VIDEO].promo_items[ConfigParams.IMAGE]
            .url)) ||
      ''
    return thumb
  }

  static getThumbnailGalleryBySize(data, size = ConfigParams.IMAGE_ORIGINAL) {
    const thumb =
      (data &&
        data.promo_items &&
        data.promo_items[ConfigParams.GALLERY] &&
        data.promo_items[ConfigParams.GALLERY].promo_items &&
        data.promo_items[ConfigParams.GALLERY].promo_items[
          ConfigParams.IMAGE
        ] &&
        ((data.promo_items[ConfigParams.GALLERY].promo_items[ConfigParams.IMAGE]
          .resized_urls &&
          data.promo_items[ConfigParams.GALLERY].promo_items[ConfigParams.IMAGE]
            .resized_urls[size]) ||
          data.promo_items[ConfigParams.GALLERY].promo_items[ConfigParams.IMAGE]
            .url)) ||
      ''
    return thumb
  }

  static getImageBySize(data, size = ConfigParams.IMAGE_ORIGINAL) {
    const { url = '', resized_urls: resizeUrls = {}, type = null } =
      (data && data.promo_items && data.promo_items[ConfigParams.IMAGE]) || null
    if (size === ConfigParams.IMAGE_ORIGINAL) return url
    return (
      (type === ConfigParams.ELEMENT_IMAGE && resizeUrls[size]
        ? resizeUrls[size]
        : url) || ''
    )
  }

  static getThumbnailBySize(data, type, size) {
    let thumb = ''
    if (type === ConfigParams.VIDEO) {
      thumb = StoryData.getThumbnailVideo(data, size)
    } else if (type === ConfigParams.GALLERY) {
      thumb = StoryData.getThumbnailGalleryBySize(data, size)
    } else if (type === ConfigParams.IMAGE) {
      thumb = StoryData.getImageBySize(data, size)
    }
    return thumb
  }

  static recentList(recentElements, id, numero = 2) {
    let i = 0
    return (
      recentElements
        .map(data => {
          const {
            headlines: { basic } = {},
            website_url: websiteUrl,
            _id: storyId,
          } = data
          if (storyId !== id && i < numero) {
            const type = StoryData.getTypeMultimedia(data)
            const urlImage = StoryData.getThumbnailBySize(data, type)
            i += 1
            return {
              basic,
              websiteUrl,
              urlImage,
            }
          }
          return []
        })
        .filter(String) || {}
    )
  }
}

export default StoryData
