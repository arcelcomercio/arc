
import styled from 'styled-components'
import {devices} from '../../../_dependencies/devices'



const Form = Component => {
    return styled(Component)`
    display:flex;
    width: 60%;
    padding: 4em;
    flex-direction: column;

    @media (${devices.mobile}) {
        width: 100%;
        padding: 2.5em;
    }   
    `
  }

const FormTitle = styled.h2`
    margin-bottom: 2em;
    width: 100%;
`

const ContentForm = styled.div`
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: row;
    @media (${devices.tablet}) {
        flex-direction:column;
    }    
`

const ContentLeft = styled.div`
    width: 50%;
    height: auto;
    @media (${devices.mobile}) {
        width: 100%;
    }
    @media (${devices.tablet}) {
        width: 100%;
    }       
`

const ContentRight = styled.div`
    width: 50%;
    height: auto;
    @media (${devices.mobile}) {
        width: 100%;
    }
    @media (${devices.tablet}) {
        width: 100%;
    }       
`

const WrapField = styled.div`
  min-width: 250px;
  max-width: 250px;
  @media (${devices.mobile}) {
    width: 100%;
    max-width: 100%;
  }
`

export{
    Form,
    FormTitle,
    ContentForm,
    ContentLeft,
    ContentRight,
    WrapField
}








