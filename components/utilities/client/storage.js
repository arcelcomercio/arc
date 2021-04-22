/**
 * Verifica si es posible usar el almacenamiento
 * del navegador
 * @param {'localStorage'|'sessionStorage'} type
 * @returns {boolean}
 */
// eslint-disable-next-line import/prefer-default-export
export const isStorageAvailable = type => {
  try {
    const storage = window[type]
    const x = '__storage_test__'
    storage.setItem(x, x)
    storage.removeItem(x)
    return true
  } catch (e) {
    return false
  }
}
