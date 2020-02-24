import React from 'react'
import GolListItem from './gol-list-item'

const classes = {
  gol: 'score__gol-wrapper flex justify-between pt-10 pb-10',
  golImg: 'score__gol-img w-full h-full object-cover',
}

const GolListTeams = ({ homeTeamGolList = [], awayTeamGolList = [] }) => {
  return (
    <div className={classes.gol}>
      <>
        <GolListItem homeTeam goalList={homeTeamGolList} />

        {/* <img src="" alt="" className={classes.golImg} />
        <img src="" alt="" className={classes.golImg} /> */}

        <GolListItem homeTeam={false} goalList={awayTeamGolList} />
      </>
    </div>
  )
}

export default GolListTeams
