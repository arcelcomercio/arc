export interface CommetaryOptaWidget {
  data: Data
  timeout: number
  _id: string
}

export interface Data {
  Commentary: Commentary
}

export interface Commentary {
  message: Message[]
  '@attributes': CommentaryAttributes
}

export interface CommentaryAttributes {
  away_score: string
  away_team_id: string
  away_team_name: string
  competition: string
  competition_id: string
  game_date: string
  game_id: string
  home_score: string
  home_team_id: string
  home_team_name: string
  lang_id: string
  matchday: string
  season: string
  season_id: string
  sport_id: string
  sport_name: string
}

export interface Message {
  '@value': string
  '@attributes': MessageAttributes
}

export interface MessageAttributes {
  id: string
  comment: string
  last_modified: string
  last_modified_utc: string
  minute?: string
  period?: string
  second?: string
  time?: string
  timestamp: string
  type: string
  player_ref1?: string
  player_ref2?: string
}
