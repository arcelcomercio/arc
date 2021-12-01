import { useEffect } from 'react'
import { Main } from '../global/components/main'
import { initPowerUp, sendMessage } from '../global/utils/init'

function App() {
  return (
    <div className="App">
      <Main page="search" />
    </div>
  )
}

export default App
