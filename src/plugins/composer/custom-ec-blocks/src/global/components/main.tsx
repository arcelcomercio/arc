import { useEffect, useState } from 'react'
import { AppContext, DataI, PageType } from '../context/app-context'
import { initPowerUp, sendMessage } from '../utils/init'
import { Navbar } from './common/navbar'
import { PowerUpsList } from './common/power-ups-list'
import { Intertitle } from './power-ups/intertitle'
import { RelatedLinks } from './power-ups/related-links'

export const Main: React.FC<{ page: PageType }> = ({ page }) => {
  const [subPage, setSubPage] = useState('home')
  const [data, setData] = useState<DataI>({})

  const handleSubPageChange = (newSubPage: string) => {
    setSubPage(newSubPage)
  }

  const handleDataChange = (data: DataI) => {
    setData(data)
  }

  const sendData = () => {
    sendMessage('data', {
      id: 'no-fetch',
      url: '/',
      config: {
        block: subPage,
        data,
      },
    })
  }

  const contentPowerUpsList = [
    {
      name: 'Enlaces relacionados',
      id: 'related-links',
      component: <RelatedLinks />,
    },
    {
      name: 'Intertítulo',
      id: 'intertitle',
      component: <Intertitle />,
    },
  ]

  useEffect(() => {
    const initData = initPowerUp()
    setSubPage(initData?.config?.block || 'home')
    setData(initData?.config?.data)
  }, [])

  return (
    <AppContext.Provider
      value={{
        page,
        subPage,
        handleSubPageChange,
        contentPowerUpsList: contentPowerUpsList.map(({ name, id }) => ({
          name,
          id,
        })),
        sendData,
        data,
        handleDataChange,
      }}>
      {page !== 'view' && <Navbar />}
      {subPage === 'home' ? (
        <PowerUpsList />
      ) : (
        contentPowerUpsList.find((p) => p.id === subPage)?.component || null
      )}
    </AppContext.Provider>
  )
}
