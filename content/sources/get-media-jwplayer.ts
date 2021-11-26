export type GetMediaJWPlayerQuery = {
  mediaId: string
  playerId: string
  title: string
  imagen: string
}

const params = [
  {
    name: 'playerId',
    displayName: 'playerId',
    type: 'string',
  },
  {
    name: 'mediaId',
    displayName: 'mediaId',
    type: 'string',
  },
  {
    name: 'title',
    displayName: 'title',
    type: 'string',
  },
  {
    name: 'imagen',
    displayName: 'imagen',
    type: 'string',
  },
]

const fetch = (key: GetMediaJWPlayerQuery): GetMediaJWPlayerQuery => {
  const { playerId, mediaId, imagen, title } = key
  return {
    playerId,
    title,
    mediaId,
    imagen,
  }
}

export default {
  fetch,
  ttl: 1,
  params,
}
