export const ACTION_NEXT_QUESTION = 'trivia_next_question'
export const ACTION_START = 'trivia_start'
export const ACTION_RESTART = 'trivia_restart'

export const action = (type, payload) => {
  const data = {}
  switch (type) {
    case ACTION_START:
      data.event = ACTION_START
      data.url = payload.url
      break
    case ACTION_NEXT_QUESTION:
      data.event = ACTION_NEXT_QUESTION
      break
    case ACTION_RESTART:
      break
    default:
      throw new Error(
        `Wrong action, it should be one of: ${ACTION_START}, ${ACTION_NEXT_QUESTION}, ${ACTION_RESTART}`
      )
  }

  return data
}
