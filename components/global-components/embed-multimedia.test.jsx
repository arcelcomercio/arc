import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import EmbedMultimedia from '@components/embed-multimedia'


describe('Test EmbedMultimedia', () => {
  it('test renderizado videoYoutube', () => {
    const props = {
      type: 'youtube',
      source: 'https://www.youtube.com',
      deployment: () => {},
      contextPath: 'contextPath',
      website: 'elcomercio',
      title: 'Titulo',
    }
    const wrapper = shallow(<EmbedMultimedia {...props} />)

    expect(wrapper).toBeDefined()
    // expect(wrapper.find('iframe')).toBeDefined()
  })
  it('test iframe valor del src generado', () => {
    const props = {
      type: 'youtube',
      source: 'QNLARJrxVa4',
      deployment: () => {},
      contextPath: 'contextPath',
      website: 'elcomercio',
      title: 'Titulo',
    }
    const wrapper = shallow(<EmbedMultimedia {...props} />)
    const src = wrapper.find('iframe').prop('src')

    expect(src).toBe('https://www.youtube.com/embed/QNLARJrxVa4')
  })
})
describe('Test EmbedMultimedia - videoGoldfish', () => {
  it('test render videoGoldfish', () => {
    const props = {
      type: 'youtube',
      source: 'https://www.youtube.com',
      deployment: () => {},
      contextPath: 'contextPath',
      title: 'Titulo',
    }
    const wrapper = shallow(<EmbedMultimedia {...props} />)

    expect(wrapper).toBeDefined()
  })

  it('Test Render goldfish prop id', () => {
    const props = {
      type: 'goldfish',
      source: 'multimediaSource',
      deployment: () => {},
      contextPath: 'contextPath',
      title: 'Titulo',
    }
    const wrapper = shallow(<EmbedMultimedia {...props} />)
    const src = wrapper.find('div').prop('id')

    expect(src).toBe('powa-multimediaSource')
  })
  it('Test Render goldfish prop data-env', () => {
    const props = {
      type: 'goldfish',
      source: 'multimediaSource',
      deployment: () => {},
      contextPath: 'contextPath',
      website: 'elcomercio',
      title: 'Titulo',
    }
    const wrapper = shallow(<EmbedMultimedia {...props} />)
    const src = wrapper.find('div').prop('data-env')

    expect(src).toBe('sandbox')
  })
})

describe('Test EmbedMultimedia - image', () => {
  it('Test Render image', () => {
    const props = {
      type: 'image',
      source: 'multimediaSource',
      deployment: () => {},
      contextPath: 'contextPath',
      website: 'elcomercio',
    }
    const wrapper = shallow(<EmbedMultimedia {...props} />)
    expect(wrapper).toBeDefined()
  })
  it('Test Render image prop src', () => {
    const props = {
      type: 'image',
      source: '',
      deployment: (val) => val,
      contextPath: 'contextPath',
      website: 'elcomercio'
    }

    const urlimg = 'contextPath/resources/dist/elcomercio/images/default-md.png'

    const wrapper = shallow(<EmbedMultimedia {...props} />)
    const src = wrapper.find('img').prop('src')
    
    
    expect(src).toBe(urlimg)
  })
  
})
