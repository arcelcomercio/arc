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
  siteNameRedSocial = 'Gestionpe'
): ShareList => ({
  facebook: `http://www.facebook.com/sharer.php?u=${siteUrl}${postPermaLink}`,
  twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    postTitle
  )}&url=${siteUrl}${postPermaLink}&via=${siteNameRedSocial}`,
  linkedin: `http://www.linkedin.com/shareArticle?url=${siteUrl}${postPermaLink}`,
  pinterest: `https://pinterest.com/pin/create/button/?url=${siteUrl}${postPermaLink}`,
  whatsapp: `whatsapp://send?text=${siteUrl}${postPermaLink}`,
  fbmsg: `fb-messenger://share/?link=${siteUrl}${postPermaLink}`,
})
