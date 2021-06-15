import { Tag } from 'types/story'

export const findTag = (data: Tag[] = [], slugTag: string): boolean =>
  data.some(({ slug }) => slug === slugTag)

export const storyTagsBbc = (data: Tag[] = [], slugTag = 'bbc'): boolean =>
  findTag(data, slugTag)

export const replacer = (str: string, p1 = '', p2 = '', p3 = ''): string => {
  const isSlash = p3.slice(p3.length - 1, p3.length)
  const psReplace = `${p3}/`

  return `href="${p1}://${p2}${isSlash !== '/' ? psReplace : p3}"`
}

export const cleanLegacyAnchor = (text: string): string =>
  text.replace(/xn--(.+)-\w+\/"/g, '$1/"').replace(/%20%20/g, '/')

export const replaceTags = (text: string): string => {
  const resultText = text.replace(
    /href="(http|ftp|https):\/\/([\w_-]+(?:(?:\.[\w_-]+)+))([\w,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])?"/g,
    replacer
  )

  return resultText
    .replace(/<h1>(.*)<\/h1>/g, '<h2>$1</h2>')
    .replace(/(\s\w)=.(.*?)/g, '$2')
    .replace(/(?:http:\/\/)+/, 'https://')
    .replace(/href=&quot;(.+)&quot;>/g, 'href="$1">')
    .replace(/http:\/\/gestion2.e3.pe\//g, 'https://cde.gestion2.e3.pe/')
    .replace(/href="(elcomercio.pe)/gm, 'href="https://$1')
    .replace(/<a/g, '<a itemprop="url"')
}
