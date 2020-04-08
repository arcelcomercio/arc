import React from 'react'

const classes = {
  scoreLogo: 'score__team-logo',
  scoreImg: 'score__team-img w-full h-full object-cover',
}

const TeamFlag = ({ flag = '' }) => {
  return (
    <figure className={classes.scoreLogo}>
      <img src={flag} alt="" className={classes.scoreImg} />
    </figure>
  )
}

export default TeamFlag
