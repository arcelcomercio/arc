/** ----------------------------*
 *          PROMO ITEMS         *
 *------------------------------*/

export const includePromoItems = `promo_items.basic.type,promo_items.basic.url,promo_items.basic.resized_urls,promo_items.basic_video.promo_items.basic.url,promo_items.basic_video.promo_items.basic.resized_urls,promo_items.basic_gallery.promo_items.basic.url,promo_items.basic_gallery.promo_items.basic.resized_urls,promo_items.youtube_id.content`

export const includePromoItemsCaptions = `promo_items.basic.subtitle,promo_items.basic.caption,promo_items.basic_video.promo_items.basic.subtitle,promo_items.basic_video.promo_items.basic.caption,promo_items.basic_gallery.promo_items.basic.subtitle,promo_items.basic_gallery.promo_items.basic.caption`

export const includePromoVideoAds = `promo_items.basic_video._id,promo_items.basic_video.embed_html,promo_items.basic_video.additional_properties.advertising.playAds,promo_items.basic_video.additional_properties.advertising.playVideoAds`

export const includeGalleryUrls =
  'promo_items.basic_gallery.content_elements.resized_urls,promo_items.basic_gallery.content_elements.subtitle,promo_items.basic_gallery.content_elements.caption,promo_items.basic_gallery.content_elements.type,promo_items.basic_gallery.content_elements.url'

/** ----------------------------*
 *            TAXONOMY          *
 *------------------------------*/

export const includePrimarySection = `taxonomy.primary_section.path,taxonomy.primary_section.name`

export const includeSections = `taxonomy.sections.path,taxonomy.sections._id,taxonomy.sections.name`

export const includeTags = `taxonomy.tags.description,taxonomy.tags.slug,taxonomy.tags.text`

/** ----------------------------*
 *           CREDITS            *
 *------------------------------*/

export const includeCredits = `credits.by._id, credits.by.name,credits.by.url,credits.by.type`

export const includeCreditsImage = `credits.by.image.url`

export const includeCreditsRole = `credits.by.additional_properties.original.role`

export const includeCreditsEducation = `credits.by.additional_properties.original.education.name`

/** ----------------------------*
 *       CONTENT_ELEMENTS       *
 *------------------------------*/

export const includeContentBasic = `content_elements.content,content_elements.type,content_elements._id,content_elements.url,content_elements.subtitle,content_elements.caption,content_elements.height,content_elements.width,content_elements.level,content_elements.items`

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
  separatorBasic: `websites.${arcSite}.website_url,canonical_url,headlines.basic,${includePromoItems},${includePrimarySection}`,
  separatorStories: `headlines.basic,${includeCredits},${includePromoItems},websites.${arcSite}.website_url`,
  featuredStoryPremium: `websites.${arcSite}.website_url,headlines.basic,subheadlines.basic,content_restrictions.content_code,${includePromoItems},${includePromoItemsCaptions},${includeCredits},${includePrimarySection}`,
  featuredStoryRecentImg: `headlines.basic,websites.${arcSite}.website_url,_id,display_date,publish_date,${includePromoItems}`,
  featuredStoryRecent: `headlines.basic,websites.${arcSite}.website_url,_id,display_date,publish_date`,
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
