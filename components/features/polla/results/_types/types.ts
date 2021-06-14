export interface Contestants {
  home_contestant: string
  home_img: string
  away_contestant: string
  away_img: string
}

export interface Game {
  contestants: Contestants
  status: 'Fixture' | 'Postponed' | 'Playing' | 'Played'
  date: string
  time: string
  home_goals: number
  away_goals: number
  home_penalties_goals: number
  away_penalties_goals: number
  url_resumen: string
  stadium: string
}
