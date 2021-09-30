import { Story } from 'types/story'

export const isStoryHasOpta = (data?: Story): boolean => {
  if (
    data?.content_elements?.some(
      ({ type, content }) =>
        type === 'raw_html' && content.includes('opta-widget')
    )
  ) {
    return true
  }
  return false
}
