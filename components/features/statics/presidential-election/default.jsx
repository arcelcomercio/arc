import PropTypes from 'prop-types'
import * as React from 'react'

import PresidentialElectionFirst from './_main/first-election'
import PresidentialElectionSecond from './_main/second-election'

const PresidentialElection = (props) => {
  const { customFields } = props
  const { template } = customFields || {}

  return template === 'second' ? (
    <PresidentialElectionSecond customFields={customFields} />
  ) : (
    <PresidentialElectionFirst customFields={customFields} />
  )
}

PresidentialElection.label = 'Elecciones presidenciales y congresales'

PresidentialElection.propTypes = {
  customFields: PropTypes.shape({
    template: PropTypes.oneOf(['first', 'second']).tag({
      labels: {
        first: 'Primera Vuelta',
        second: 'Segunda Vuelta',
      },
      defaultValue: 'first',
    }),
    urlFirstElection: PropTypes.string.tag({
      name: 'Url del especial de Primera Vuelta',
      group: 'Segunda Vuelta',
    }),
    urlSecondElection: PropTypes.string.tag({
      name: 'Url del especial de Segunda Vuelta',
      group: 'Primera Vuelta',
    }),
    partidosJson: PropTypes.string.tag({
      name: 'Url del JSON de partidos políticos',
    }),
    presidencial: PropTypes.string.tag({
      name: 'Url del JSON para resultados presidenciales',
      group: 'Primera Vuelta',
    }),
    congresal: PropTypes.string.tag({
      name: 'Url del JSON para resultados congresales',
      group: 'Primera Vuelta',
    }),
    'parlamento-andino': PropTypes.string.tag({
      name: 'Url del JSON para resultados del parlamento andino',
      group: 'Primera Vuelta',
    }),
    secondElectionJson: PropTypes.string.tag({
      name: 'Url del JSON para resultados de segunda vuelta',
      group: 'Segunda Vuelta',
    }),
  }),
}

export default PresidentialElection
