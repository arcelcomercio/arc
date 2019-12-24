/** ----------------------------*
 *          PROMO ITEMS         *
 *------------------------------*/

export const includePromoItems = `promo_items.basic.type,promo_items.basic.url,promo_items.basic.resized_urls,promo_items.basic_video.promo_items.basic.url,promo_items.basic_video.promo_items.basic.resized_urls,promo_items.basic_gallery.promo_items.basic.url,promo_items.basic_gallery.promo_items.basic.resized_urls,promo_items.youtube_id.content`

export const includePromoItemsCaptions = `promo_items.basic.subtitle,promo_items.basic.caption,promo_items.basic_video.promo_items.basic.subtitle,promo_items.basic_video.promo_items.basic.caption,promo_items.basic_gallery.promo_items.basic.subtitle,promo_items.basic_gallery.promo_items.basic.caption`

export const includePromoVideoAds = `promo_items.basic_video._id,promo_items.basic_video.embed_html,promo_items.basic_video.additional_properties.advertising.playAds,promo_items.basic_video.additional_properties.advertising.playVideoAds`

/** ----------------------------*
 *            TAXONOMY          *
 *------------------------------*/

export const includePrimarySection = `taxonomy.primary_section.path,taxonomy.primary_section.name`

export const includeSections = `taxonomy.sections.path,taxonomy.sections._id,taxonomy.sections.name`

export const includeTags = `taxonomy.tags.description,taxonomy.tags.slug,taxonomy.tags.text`

/** ----------------------------*
 *           CREDITS            *
 *------------------------------*/

export const includeCredits = `credits.by.name,credits.by.url,credits.by.type`

export const includeCreditsImage = `credits.by.image.url`

export const includeCreditsRole = `credits.by.additional_properties.original.role`

export const includeCreditsEducation = `credits.by.additional_properties.original.education.name`
