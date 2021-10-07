import { ContentElement, Story } from 'types/story'

export const getOptaWidgetsFromStory = (data?: Story): ContentElement[] =>
  data?.content_elements?.filter(
    ({ type, content }) =>
      type === 'raw_html' &&
      content.includes('opta-widget') &&
      content.includes('widget="commentary"')
  ) || []
