import * as React from 'react'
import StaticsCovidInfectedAverage from './infected-average'
import StaticsCovidInfectedList from './infected-list'



const StaticsCovidInfected = ({path}) => {
  const params = path.split('/')
  if(params[0] === ""){
    params[0] = "lima"
  }

  let distSlug = null
  if(typeof(params[1]) !== "undefined" && params[1] !== ""){
    distSlug = params[1]
  }

  return (
    distSlug ? (
      <StaticsCovidInfectedAverage region={params[0]} distrito={distSlug} />
    ) : (
      <StaticsCovidInfectedList region={params[0]} />
    )
  )
}

export default StaticsCovidInfected
