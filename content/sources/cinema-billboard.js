import { resizerSecret } from 'fusion:environment'
import getProperties from 'fusion:properties'
import { createUrlResizer } from '@arc-core-components/content-source_content-api-v4'

const resolve = () => {
  return `http://archivo.elcomercio.pe/html/cartelera/all/all.json`
}

const transform = (data, key) => {
  const { estrenos = [] } = data || {}
  const { poster: { filepath } = {} } = estrenos[0] || {}
  const { format = '' } = key || {}

  const website = key['arc-site']

  const { resizerUrl } = getProperties(website)

  if (data) {
    const auxData = data

    const resizedUrls = createUrlResizer(resizerSecret, resizerUrl, {
      presets: { portrait_lg: { width: 307, height: 400 } },
    })({
      url: filepath,
    })

    auxData.estrenos[0].poster.resized_urls = resizedUrls

    if (format === 'single') {
      const { peliculas, cines = [], estrenos: auxEstrenos = [] } = auxData

      const moviesList = Object.values(peliculas).map(
        ({ mid, title, url }) => ({ mid, title, url })
      )
      const cinemasList = cines.map(({ cid, nombre, url }) => ({
        cid,
        nombre,
        url,
      }))

      const {
        poster: {
          sizes: { poster = '' } = {},
          resized_urls: { portrait_lg: portraitLg } = {},
        } = {},
        name,
        url,
        body,
      } = auxEstrenos[0] || {}

      const premiereData = {
        title: name,
        img: portraitLg || poster,
        url,
        alt: body,
      }

      return {
        premiereData,
        billboardData: { moviesList, cinemasList },
      }
    }

    return auxData
  }
  return data
}

export default {
  resolve,
  transform,
  params: {
    website: 'text',
    movie: 'text',
    cinema: 'text',
    genre: 'text',
    format: 'text',
  },
}
