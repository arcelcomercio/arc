import React from 'react'
import GolListItem from './gol-list-item'

const classes = {
  gol:
    'score__gol-wrapper flex justify-between pt-5 pb-5 border-t-1 border-solid',
  golImg: 'score__gol-img w-full h-full object-cover',
}

const GolListTeams = ({ homeTeamGolList = [], awayTeamGolList = [] }) => {
  return (
    <div className={classes.gol}>
      <GolListItem goalList={homeTeamGolList} homeTeam />
      <GolListItem goalList={awayTeamGolList} homeTeam={false} />
    </div>
  )
}

export default GolListTeams
