/**
 *
 * @param {string} mode desde siteProperties
 * @returns {string} taboola config
 */
// eslint-disable-next-line import/prefer-default-export
export const taboolaConfig = mode =>
  `window._taboola = window._taboola || [];_taboola.push({mode: '${mode}',container: 'taboola-below-content-thumbnails',placement: 'Below Content Thumbnails',target_type: 'mix'});`
