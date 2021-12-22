export type ShareList = {
  facebook: string
  twitter: string
  linkedin: string
  pinterest: string
  whatsapp: string
  fbmsg: string
}

export const socialMediaUrlShareList = (
  siteUrl = '',
  postPermaLink = '',
  postTitle = '',
  siteNameRedSocial = 'Gestionpe',
  appVersion = true
): ShareList => ({
  facebook: `http://www.facebook.com/sharer.php?u=${siteUrl}${postPermaLink}`,
  twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    postTitle
  )}&url=${siteUrl}${postPermaLink}&via=${siteNameRedSocial}`,
  linkedin: `http://www.linkedin.com/shareArticle?url=${siteUrl}${postPermaLink}`,
  pinterest: `https://pinterest.com/pin/create/button/?url=${siteUrl}${postPermaLink}`,
  whatsapp: `${
    appVersion ? 'whatsapp://' : 'https://web.whatsapp.com/'
  }send?text=${siteUrl}${postPermaLink}`,
  fbmsg: `fb-messenger://share/?link=${siteUrl}${postPermaLink}`,
})

type ShareUrlsProps = {
  twitterUsername: string
  url: string
  text?: string
  appVersion?: boolean
}

export const shareUrls = ({
  twitterUsername,
  url,
  text = '',
  appVersion = true,
}: ShareUrlsProps): ShareList => ({
  facebook: `http://www.facebook.com/sharer.php?u=${url}`,
  twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    text
  )}&url=${url}&via=${twitterUsername}`,
  linkedin: `http://www.linkedin.com/shareArticle?url=${url}`,
  pinterest: `https://pinterest.com/pin/create/button/?url=${url}`,
  whatsapp: `${
    appVersion ? 'whatsapp://' : 'https://web.whatsapp.com/'
  }send?text=${encodeURIComponent(`${text} ${url}`)}`,
  fbmsg: `fb-messenger://share/?link=${url}`,
})
