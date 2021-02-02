export const ACTION_NEXT_QUESTION = 'trivia_next_question'
export const ACTION_START = 'trivia_start'
export const ACTION_RESTART = 'trivia_restart'
export const ACTION_ANSWER = 'trivia_answer'

/**
 *
 * @param {string} type
 * @param {object} payload
 * @param {string} payload.url
 * @param {number[]} payload.question
 */
export const getActionPayload = (type, payload) => {
  const data = {}
  switch (type) {
    case ACTION_START:
      data.event = ACTION_START
      data.url = payload.url
      break
    case ACTION_ANSWER:
      data.event = ACTION_ANSWER
      data.answer = payload.answer
      data.question = payload.question
      data.url = payload.url
      break
    case ACTION_NEXT_QUESTION:
      data.event = ACTION_NEXT_QUESTION
      data.url = payload.url
      data.question = payload.question
      break
    case ACTION_RESTART:
      data.event = ACTION_RESTART
      data.url = payload.url
      break
    default:
      throw new Error(
        `Wrong action, it should be one of: ${ACTION_START}, ${ACTION_ANSWER}, ${ACTION_NEXT_QUESTION}, ${ACTION_RESTART}`
      )
  }

  return data
}
