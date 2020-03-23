// TODO: Agregar parámetro para que soporte links variables por marca, así cmo el twitter de la marca
export const socialMediaUrlShareList = (
  siteUrl,
  postPermaLink,
  postTitle,
  siteNameRedSocial = 'Gestionpe'
) => {
  return {
    facebook: `http://www.facebook.com/sharer.php?u=${siteUrl}${postPermaLink}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      postTitle
    )}&url=${siteUrl}${postPermaLink}&via=${siteNameRedSocial}`,
    linkedin: `http://www.linkedin.com/shareArticle?url=${siteUrl}${postPermaLink}`,
    pinterest: `https://pinterest.com/pin/create/button/?url=${siteUrl}${postPermaLink}`,
    whatsapp: `whatsapp://send?text=${siteUrl}${postPermaLink}`,
    fbmsg: `fb-messenger://share/?link=${siteUrl}${postPermaLink}`,
  }
}

export const socialMediaUrlShareListBlog = (
  siteUrl,
  postPermaLink,
  postTitle,
  siteNameRedSocial = 'Gestionpe'
) => {
  return {
    facebook: `http://www.facebook.com/sharer.php?u=${siteUrl}blog/${postPermaLink}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      postTitle
    )}&url=${siteUrl}blog/${postPermaLink}&via=${siteNameRedSocial}`,
    linkedin: `http://www.linkedin.com/shareArticle?url=${siteUrl}blog/${postPermaLink}`,
    pinterest: `https://pinterest.com/pin/create/button/?url=${siteUrl}blog/${postPermaLink}`,
    whatsapp: `whatsapp://send?text=${siteUrl}blog/${postPermaLink}`,
    fbmsg: `fb-messenger://share/?link=${siteUrl}blog/${postPermaLink}`,
  }
}
