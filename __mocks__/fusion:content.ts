import type { UseContentConfig } from 'fusion:content'

import type { AnyObject } from '../types/utils'
/**
 * In order to use this mock you must do
 * `import Content from 'fusion:content';`
 * at the top of your unit test file, this will
 * trigger jest to mock the Content import below
 * */

export const useContent = jest.fn(
  <Query = AnyObject>(config: UseContentConfig<Query>): AnyObject => ({})
)
