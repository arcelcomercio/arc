import PropTypes from 'prop-types'

const LayoutAmpNavbar = () => {
  return ''
}

LayoutAmpNavbar.propTypes = {
  customFields: PropTypes.shape({
    selectDesing: PropTypes.oneOf(['standard']).tag({
      name: 'Modelo de barra de navegación',
      labels: {
        standard: 'Barra de navegación estándar',
        somos: 'Barra de navegación somos',
      },
      defaultValue: 'standard',
    }),
  }),
}

LayoutAmpNavbar.label = 'Barra de Navegación AMP'

export default LayoutAmpNavbar
