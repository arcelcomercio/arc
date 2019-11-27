import styled, { css } from 'styled-components'

const Panel = styled.div`
  ${({
    theme,
    maxWidth,
    direction,
    elevation = 1,
    margin,
    valing,
    event,
    type,
  }) => css`
    display: flex;
    align-items: center;
    ${maxWidth &&
      css`
        max-width: ${maxWidth};
      `}
    ${direction &&
      css`
        align-items: flex-start;
        flex-direction: direction || column;
      `}
    flex: 1;
    margin: ${margin || 'initial'};
    ${valing &&
      css`
        justify-content: center;
      `};
    ${() => {
      switch (type) {
        case 'content':
          return css`
            padding: 30px 0;
            max-width: 740px;
            ${theme.breakpoints.down('md')} {
              max-width: 700px;
            }
          `
        case 'summary':
          return css`
            max-width: 360px;
            align-items: flex-start;
            box-shadow: ${theme.shadows[elevation]};
            border-radius: 5px;
            background-color: #fff;
            ${theme.breakpoints.down('md')} {
              max-width: 300px;
            }
            ${theme.breakpoints.down('xs')} {
              max-width: calc(100% - 40px);
              align-items: center;
            }
          `
        case 'card-price':
          return css`
            max-width: 265px;
            ${event &&
              css`
                width: 300px;
                margin: 0 auto;
                ${theme.breakpoints.down('xs')} {
                  min-width: 100%;
                }
              `}
            ${theme.breakpoints.down('xs')} {
              max-width: 100%;
              height: 100%;
              margin-bottom: 40px;
            }
            &:last-child {
              margin-bottom: 0px;
            }
          `
        default:
          return css``
      }
    }};
  `}
`
export { Panel }
