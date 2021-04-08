import React from 'react'

const classes = {
  container: 'option-congresal',
  option: 'option-congresal__option',
}
export default ({
  candidate = 'Por candidatos',
  valla = 'Valla Electoral (%)',
}) => {
  const [OptionValla, setValla] = React.useState(true)
  const [OptionCandidate, setCandidate] = React.useState(false)

  const handleAnswerValla = () => {
    setValla(true)
    setCandidate(false)
  }
  const handleAnswerCandidate = () => {
    setValla(false)
    setCandidate(true)
  }

  return (
    <div className={classes.container}>
      <button
        type="button"
        onClick={handleAnswerValla}
        className={`${classes.option} ${OptionValla ? 'active' : ''}`}>
        {valla}
      </button>
      <button
        type="button"
        onClick={handleAnswerCandidate}
        className={`${classes.option} ${OptionCandidate ? 'active' : ''}`}>
        {candidate}
      </button>
    </div>
  )
}
