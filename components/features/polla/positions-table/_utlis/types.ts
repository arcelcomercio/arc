export interface Team {
  name: string
  local_image: string
  played: number
  won: number
  drawn: number
  lost: number
  goals_for: number
  goals_against: number
  goaldifference: number
  points: number
}

export interface GroupData {
  name: string
  teams: Team[]
}
