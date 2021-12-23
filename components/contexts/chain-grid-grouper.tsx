import { createContext } from 'react'

interface ChainGridGrouperContextType {
  type: '1x1-triple' | '1x1-double' | '2x1' | '3x1' | '3xauto' | undefined
  position?: number
}

const ChainGridGrouperContext = createContext<ChainGridGrouperContextType>({
  type: undefined,
  position: undefined,
})

export default ChainGridGrouperContext
