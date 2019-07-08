import styled from 'styled-components'

const Summary = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1;
  width: 100%;
`

const Footer = styled.div`
  max-height: 176px;
  box-sizing: border-box;
  background-color: #222222;
  flex: 1;
  color: #fff;
  padding: 30px 25px;
`

const Title = styled.div`
  padding: 30px;
  text-align: center;
  line-height: 26px;
`

const Wrap = styled.div`
  padding: 0 30px;
`

const Expand = styled.div`
  display: flex;
  flex: 1;
  justify-content: space-between;
  line-height: 20px;
`

export { Expand, Wrap, Title, Footer, Summary }

/* 

.__footer.__details{
    line-height: 26px;
}

.__ul{
    padding-left: 1rem;
}

.__ul.__offer{
    margin: 0 0 40px 0
}

.__content .__details{
    text-align: center;
    color: #818181;

    margin-top: 8px;
}

*/
