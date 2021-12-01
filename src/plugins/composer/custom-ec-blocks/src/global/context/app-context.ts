import React from 'react'

export type PageType = 'search' | 'edit' | 'view'

export interface DataI {
  text?: string
}

interface IAppContext {
  page: PageType
  subPage: string
  contentPowerUpsList: {
    name: string
    id: string
  }[]
  data: DataI
  handleSubPageChange: (page: string) => void
  handleDataChange: (page: DataI) => void
  sendData: () => void
}

export const AppContext = React.createContext<IAppContext>({
  page: 'search',
  subPage: '',
  contentPowerUpsList: [],
  data: {},
  handleSubPageChange: () => {},
  handleDataChange: () => {},
  sendData: () => {},
})
