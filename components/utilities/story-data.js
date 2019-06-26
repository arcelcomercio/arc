import { addResizedUrlItem } from './thumbs'
import ConfigParams from './config-params'
import { defaultImage, formatHtmlToText, breadcrumbList } from './helpers'

class StoryData {
  static VIDEO = ConfigParams.VIDEO

  static GALLERY = ConfigParams.GALLERY

  static HTML = ConfigParams.HTML

  static IMAGE = ConfigParams.IMAGE

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
    return StoryData.getDataAuthor(this._data).urlAuthor
  }

  get authorSlug() {
    return StoryData.getDataAuthor(this._data).slugAuthor
  }

  get authorImage() {
    return (
      StoryData.getDataAuthor(this._data, {
        contextPath: this._contextPath,
      }).imageAuthor ||
      defaultImage({
        deployment: this._deployment,
        contextPath: this._contextPath,
        arcSite: this._website,
        size: this._defaultImgSize,
      })
    )
  }

  get multimedia() {
    return (
      StoryData.getThumbnail(
        this._data,
        StoryData.getTypeMultimedia(this._data)
      ) ||
      defaultImage({
        deployment: this._deployment,
        contextPath: this._contextPath,
        arcSite: this._website,
        size: this._defaultImgSize,
      })
    )
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
    return StoryData.getDataSection(this._data, this._website).path
  }

  get primarySection() {
    return StoryData.getPrimarySection(this._data).name
  }

  get primarySectionLink() {
    return StoryData.getPrimarySection(this._data).path
  }

  get link() {
    const { website_url: url = '' } = this._data || {}
    return url
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
    return this.publishDate
  }

  get displayDate() {
    return (this._data && this._data.display_date) || ''
  }

  get publishDate() {
    return (this._data && this._data.publish_date) || ''
  }

  get firstPublishDate() {
    return (this._data && this._data.first_publish_date) || ''
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

  get breadcrumbList() {
    const { website_url: url = '' } = this._data || {}
    return breadcrumbList(url, this._siteUrl, this._contextPath)
  }

  get recentList() {
    const {
      recent_stories: { content_elements: contentElements } = {},
      _id: id,
    } = this._data || {}
    return StoryData.recentList(contentElements, id)
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

  get promoItems() {
    return (this._data && this._data.promo_items) || []
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
        return [dataVideo[0]]
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
    )
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
      taxonomy: { primary_section: { name = '', path = '' } = {} } = {},
    } = data || {}

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
    let imageAuthor = authorImageDefault
    for (let i = 0; i < authorData.length; i++) {
      const iterator = authorData[i]
      if (iterator.type === 'author') {
        nameAuthor = iterator.name && iterator.name !== '' ? iterator.name : ''
        urlAuthor = iterator.url && iterator.url !== '' ? iterator.url : ''
        slugAuthor = iterator.slug && iterator.slug !== '' ? iterator.slug : ''
        imageAuthor =
          iterator.image && iterator.image.url && iterator.image.url !== ''
            ? iterator.image.url
            : authorImageDefault
        break
      }
    }

    return {
      nameAuthor,
      urlAuthor,
      slugAuthor,
      imageAuthor,
    }
  }

  static getTypeMultimedia(data) {
    let typeMultimedia = ''
    const promoItems = (data && data.promo_items && data.promo_items) || {}
    const items = Object.keys(promoItems)
    let item = {}
    for (let i = 0; i <= items.length; i++) {
      item = promoItems[items[i]]
      if (typeof item === 'object' && item !== null) {
        typeMultimedia = items[i]
        break
      }
    }
    return typeMultimedia
  }

  static getThumbnailVideo(data) {
    const thumb =
      (data &&
        data.promo_items &&
        data.promo_items[ConfigParams.VIDEO] &&
        data.promo_items[ConfigParams.VIDEO].promo_items &&
        data.promo_items[ConfigParams.VIDEO].promo_items[ConfigParams.IMAGE] &&
        data.promo_items[ConfigParams.VIDEO].promo_items[ConfigParams.IMAGE]
          .url) ||
      ''
    return thumb
  }

  static getThumbnailGallery(data) {
    const thumb =
      (data &&
        data.promo_items &&
        data.promo_items[ConfigParams.GALLERY] &&
        data.promo_items[ConfigParams.GALLERY].promo_items &&
        data.promo_items[ConfigParams.GALLERY].promo_items[
          ConfigParams.IMAGE
        ] &&
        data.promo_items[ConfigParams.GALLERY].promo_items[ConfigParams.IMAGE]
          .url) ||
      ''
    return thumb
  }

  static getImage(data) {
    const basicPromoItems =
      (data && data.promo_items && data.promo_items[ConfigParams.IMAGE]) || null
    const typePromoItems = (basicPromoItems && basicPromoItems.type) || null
    return (
      (typePromoItems && typePromoItems === 'image' && basicPromoItems.url) ||
      ''
    )
  }

  static getThumbnail(data, type) {
    let thumb = ''
    if (type === ConfigParams.VIDEO) {
      thumb = StoryData.getThumbnailVideo(data)
    } else if (type === ConfigParams.GALLERY) {
      thumb = StoryData.getThumbnailGallery(data)
    } else if (type === ConfigParams.IMAGE) {
      thumb = StoryData.getImage(data)
    }
    return thumb
  }

  static recentList(recentElements, id) {
    let i = 0
    return (
      recentElements
        .map(data => {
          const {
            headlines: { basic } = {},
            website_url: websiteUrl,
            _id: storyId,
          } = data
          if (storyId !== id && i < 2) {
            const type = StoryData.getTypeMultimedia(data)
            const urlImage = StoryData.getThumbnail(data, type)
            i += 1
            return { basic, websiteUrl, urlImage }
          }
          return []
        })
        .filter(String) || {}
    )
  }
}

export default StoryData
