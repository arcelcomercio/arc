import { ResizedUrls } from 'types/resizer'
import { Story } from 'types/story'

export const getPromoItemRezisedUrl = (
  story: Story | null | undefined
): ResizedUrls | undefined =>
  story?.promo_items?.basic_video?.promo_items.basic?.resized_urls ||
  story?.promo_items?.basic_jwplayer?.embed?.config?.resized_urls ||
  story?.promo_items?.basic_gallery?.promo_items.basic?.resized_urls ||
  story?.promo_items?.basic?.resized_urls
