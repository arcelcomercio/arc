export interface ScoresApiResponse {
  losPartidos: Score[]
  mensaje: string
}

export interface Score {
  id: string
  grupo: string
  equipo1: string
  equipo1Bandera: string
  equipo1Goles: string
  equipo2: string
  equipo2Bandera: string
  equipo2Goles: string
  estadio: string
  ciudad: string
  fecha: string
  hora: string
  fechaHora: string
  activo: boolean
  estado: number
  puntos: number
  fase: string
  jornada: number
  show: boolean
  exists_teams: number
  timestamp: number
  resultadoFinal: string
  ec_equipo1_porcentaje: string
  ec_equipo2_porcentaje: string
  ec_empate_porcentaje: string
  ec_porcentaje_coincidencia: string
  ec_fondo_destacados_desktop: string
  ec_fondo_destacados_movil: string
  msg?: 'error' | 'success' | null
  errorMsg?: string
}

export interface Profile {
  createdOn: number
  modifiedOn: number
  deletedOn: any
  firstName: string
  lastName: string
  secondLastName: string
  displayName: string
  gender: any
  email: string
  unverifiedEmail: string
  picture: any
  birthYear: any
  birthMonth: any
  birthDay: any
  emailVerified: boolean
  contacts: Contact[]
  addresses: any
  attributes: Attribute[]
  identities: Identity[]
  legacyId: any
  status: string
  deletionRule: any
  uuid: string
}

export interface Contact {
  phone: string
  type: string
}

export interface Attribute {
  name: string
  value: string
  type: string
}

export interface Identity {
  userName: string
  passwordReset: boolean
  type: string
  lastLoginDate: number
  locked: boolean
}

export interface User {
  usuario?: UserData
}

export interface UserData {
  nombre?: string
  puesto?: number
  puntaje?: number
  ultimoPartido?: any
}
