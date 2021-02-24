import type {
  ComponentContext,
  AppContext,
  FusionContext,
} from 'fusion:context'
/**
 * In order to use this mock you must do
 * `import Context from 'fusion:context';`
 * at the top of your unit test file, this will
 * trigger jest to mock the Content import below
 * */

interface ContextMockProps {
  children: React.FC<Partial<FusionContext>>
}

const componentContextProps: Partial<ComponentContext> = {}

const appContextProps: Partial<AppContext> = {
  outputType: 'default',
  isAdmin: false,
  contextPath: '/pf',
  arcSite: 'elcomercio'
}

const fusionContextProps: Partial<FusionContext> = {...componentContextProps, ...appContextProps}

export const useComponentContext = jest.fn(() => componentContextProps)

export const useAppContext = jest.fn(() => appContextProps)

export const useFusionContext = jest.fn(() => fusionContextProps)

export default (props: ContextMockProps) => props.children(fusionContextProps)