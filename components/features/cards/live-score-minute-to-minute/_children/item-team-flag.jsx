import React from 'react'

const classes = {
  scoreLogo: 'score__team-logo',
  scoreImg: 'score__team-img w-full h-full object-cover',
}

const TeamFlag = () => {
  return (
    <figure className={classes.scoreLogo}>
      <img src="" alt="" className={classes.scoreImg} />
    </figure>
  )
}

export default TeamFlag
