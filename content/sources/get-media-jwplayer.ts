export type GetMediaJWPlayerQuery = {
  mediaId: string
  playerId: string
  imgen: string
  title: string
}

const params = [
  {
    name: 'mediaId',
    displayName: 'mediaId',
    type: 'string',
  },
  {
    name: 'playerId',
    displayName: 'playerId',
    type: 'string',
  },
  {
    name: 'imgen',
    displayName: 'imagen',
    type: 'string',
  },
  {
    name: 'title',
    displayName: 'title',
    type: 'string',
  },
]

const fetch = (key: GetMediaJWPlayerQuery): GetMediaJWPlayerQuery => {
  const { mediaId, playerId, imgen, title } = key
  return {
    playerId,
    mediaId,
    imgen,
    title,
  }
}

export default {
  fetch,
  ttl: 1,
  params,
}
