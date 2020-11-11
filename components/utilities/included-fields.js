import {
  IMAGE,
  VIDEO,
  GALLERY,
  ELEMENT_YOUTUBE_ID,
  HTML,
  JWPLAYER,
} from './constants/multimedia-types'

/** ----------------------------*
 *          PROMO ITEMS         *
 *------------------------------*/

const promoItemsBase = 'promo_items'
const imageBase = `${promoItemsBase}.${IMAGE}`
const galleryBase = `${promoItemsBase}.${GALLERY}`
const videoBase = `${promoItemsBase}.${VIDEO}`
const youtubeBase = `${promoItemsBase}.${ELEMENT_YOUTUBE_ID}`
const htmlBase = `${promoItemsBase}.${HTML}`
const videoJwplayer = `${promoItemsBase}.${JWPLAYER}`

const galleryElements = `${galleryBase}.content_elements`

export const includePromoItems = `${imageBase}.type,${imageBase}.url,${imageBase}.resized_urls,${videoBase}.${imageBase}.url,${videoBase}.${imageBase}.resized_urls,${galleryBase}.${imageBase}.url,${galleryBase}.${imageBase}.resized_urls,${youtubeBase}.content,${htmlBase},${videoJwplayer}.type,${videoJwplayer}.subtype,${videoJwplayer}.embed,${videoJwplayer}.embed.config,${videoJwplayer}.embed.config.thumbnail_url,${videoJwplayer}.embed.config.resized_urls,${videoJwplayer}.embed.config.key`

export const includePromoItemsCaptions = `${imageBase}.subtitle,${imageBase}.caption,${videoBase}.${imageBase}.subtitle,${videoBase}.${imageBase}.caption,${galleryBase}.${imageBase}.subtitle,${galleryBase}.${imageBase}.caption`

export const includePromoItemsSizes = `${imageBase}.width,${imageBase}.height,${videoBase}.${imageBase}.width,${videoBase}.${imageBase}.height,${galleryBase}.${imageBase}.width,${galleryBase}.${imageBase}.height`

export const includePromoVideo = `${videoBase}._id,${videoBase}.embed_html,${videoBase}.duration,${videoBase}.streams`

export const includePromoVideoAds = `${videoBase}.additional_properties.advertising.playAds,${videoBase}.additional_properties.advertising.playVideoAds`

export const includeGalleryUrls = `${galleryElements}.resized_urls,${galleryElements}.subtitle,${galleryElements}.caption,${galleryElements}.type,${galleryElements}.url,${galleryElements}.width,${galleryElements}.height`

/** ----------------------------*
 *            TAXONOMY          *
 *------------------------------*/

const taxonomy = 'taxonomy'
const primarySection = `${taxonomy}.primary_section`
const sections = `${taxonomy}.sections`
const tags = `${taxonomy}.tags`

export const includePrimarySection = `${primarySection}.path,${primarySection}.name`

export const includeSections = `${sections}.path,${sections}._id,${sections}.name`

export const includeTags = `${tags}.description,${tags}.slug,${tags}.text`

/** ----------------------------*
 *           CREDITS            *
 *------------------------------*/

const creditsBy = 'credits.by'

export const includeCredits = `${creditsBy}._id, ${creditsBy}.name,${creditsBy}.url,${creditsBy}.type`

export const includeCreditsImage = `${creditsBy}.image.url`

export const includeCreditsRole = `${creditsBy}.additional_properties.original.role`

export const includeCreditsEducation = `${creditsBy}.additional_properties.original.education.name`

/** ----------------------------*
 *       CONTENT_ELEMENTS       *
 *------------------------------*/

export const includeContentBasic = `content_elements.content,content_elements.type,content_elements._id,content_elements.url,content_elements.headlines,content_elements.subtitle,content_elements.caption,content_elements.height,content_elements.width,content_elements.level,content_elements.items,content_elements.embed_html`

/** ----------------------------*
 *           FEATURES            *
 *------------------------------*/

const encodedFueatureName = name => `<${name}>`

export const featuredStoryFields = encodedFueatureName('featuredStory')
export const sectionColumnsFields = encodedFueatureName('sectionColumns')
export const separatorFeaturedFields = encodedFueatureName('separatorFeatured')
export const separatorBasicFields = encodedFueatureName('separatorBasic')
export const separatorStoriesFields = encodedFueatureName('separatorStories')
export const featuredStoryPremiumFields = encodedFueatureName(
  'featuredStoryPremium'
)
export const featuredStoryRecentImgFields = encodedFueatureName(
  'featuredStoryRecentImg'
)
export const featuredStoryRecentFields = encodedFueatureName(
  'featuredStoryRecent'
)

const getFeaturesIncludedFields = arcSite => ({
  featuredStory: `websites.${arcSite}.website_url,headlines.basic,${includePromoItems},${includePromoItemsCaptions},${includeCredits},${includePrimarySection},${includeSections},publish_date,display_date`,
  sectionColumns: `websites.${arcSite}.website_url,_id,headlines.basic,display_date,publish_date,${includePromoItems},${includeCredits}`,
  separatorFeatured: `headlines.basic,${includePromoItems},${includePromoItemsCaptions},websites.${arcSite}.website_url,${includePrimarySection}`,
  separatorBasic: `websites.${arcSite}.website_url,canonical_url,headlines.basic,subheadlines.basic,content_restrictions.content_code,${includePromoItems},${includePrimarySection}`,
  separatorStories: `headlines.basic,${includeCredits},${includePromoItems},websites.${arcSite}.website_url`,
  featuredStoryPremium: `websites.${arcSite}.website_url,headlines.basic,subheadlines.basic,content_restrictions.content_code,${includePromoItems},${includePromoItemsCaptions},${includeCredits},${includePrimarySection}`,
  featuredStoryRecentImg: `headlines.basic,websites.${arcSite}.website_url,content_restrictions.content_code,_id,display_date,publish_date,${includePromoItems}`,
  featuredStoryRecent: `headlines.basic,websites.${arcSite}.website_url,_id,content_restrictions.content_code,display_date,publish_date`,
})

/** Función que reemplaza los caracteres "<encodedFeatureName>" por los included fields
 *  de un campo del objeto resultante de la función getFeaturesIncludedFields
 */

export const formatIncludedFields = ({ includedFields = '', arcSite = '' }) => {
  // Formato de la variable a reemplazar <feature>
  const matched = includedFields.match(/<(.*)>/) || []
  const feature = matched[1] || ''

  return includedFields.replace(
    /<(.*)>/,
    getFeaturesIncludedFields(arcSite)[feature] || ''
  )
}
