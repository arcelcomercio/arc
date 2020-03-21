import React from 'react'
import PropTypes from 'prop-types'

import ResultItem from './result-item'

const classes = {
  results: 'c-survey-result',
}

const CardsSurveyChildResult = ({ choices = [] }) => {
  const totalVotes = choices.reduce(
    (prev, current) => prev + (current.votes || 0),
    0
  )

  const getHighestValue = (array = []) => {
    return array.map(item => item.votes).sort((a, b) => b - a)[0]
  }

  const highestValue = getHighestValue(choices)
  return (
    <ul className={classes.results}>
      {choices.map(({ option, votes }) => {
        const params = {
          highestValue,
          totalVotes,
          option,
          votes,
        }
        return <ResultItem {...params} />
      })}
    </ul>
  )
}

CardsSurveyChildResult.propTypes = {
  choices: PropTypes.arrayOf(
    PropTypes.shape({
      option: PropTypes.string,
      votes: PropTypes.number,
    })
  ),
}

export default React.memo(CardsSurveyChildResult, (prevProps, nextProps) => {
  const { choices } = prevProps
  const { choices: nextChoices } = nextProps
  let memo = true
  choices.forEach((choice, i) => {
    const { option, votes } = choice
    const { option: nextOption, votes: nextVotes } = nextChoices[i]
    if (option !== nextOption && votes !== nextVotes) memo = false
  })

  return memo
})
