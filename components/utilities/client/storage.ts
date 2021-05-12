type Storage = 'localStorage' | 'sessionStorage'

/**
 * Verifica si es posible usar el almacenamiento
 * del navegador
 * @param type storage que se quiere validar.
 */
export const isStorageAvailable = (type: Storage): boolean => {
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
