import type { AppContext } from 'types/fusion'

import getProperties from './fusion:properties'
/**
 * Global mock for a fusion:feature-props when you
 * need to test site properties.
 *
 * In order to use this mock you must do
 * `import FeatureProps from 'fusion:feature-props';`
 * at the top of your unit test file, this will
 * trigger jest to mock the Feature Props import below
 * */

const FeatureProps: Partial<AppContext> = {
  globalContent: { type: 'story' },
  contextPath: '/pf',
  siteProperties: getProperties('elcomercio'),
}

export default FeatureProps
