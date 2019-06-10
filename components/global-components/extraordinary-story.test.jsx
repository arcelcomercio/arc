import React from 'react'
import { shallow, mount } from 'enzyme'
import { getIcon } from '../utilities/helpers'
import ExtraordinaryStory from '@components/extraordinary-story'

jest.mock('../utilities/helpers', () => ({
  getIcon: jest.fn(),
}))

describe('Extraordinary story - Component', () => {
  const params = {
    data: {
      sectionLink: '',
      section: '',
      link: '',
      title: '',
      subTitle: '',
      authorLink: '',
      author: '',
      typeMultimediaGeneral: '',
      sourceMultimedia: '',
    },
    multimediaType: 'basic_video',
    deployment: jest.fn(),
    contextPath: '',
    arcSite: '',
  }

  test('should render', () => {
    const wrapper = shallow(<ExtraordinaryStory {...params} />)
    expect(wrapper).toBeDefined()
  })

  test('should render line css by site', () => {
    params.arcSite = 'elcomercio'
    let wrapper = shallow(<ExtraordinaryStory {...params} />)
    expect(wrapper).toBeDefined()
    params.arcSite = 'depor'
    wrapper = shallow(<ExtraordinaryStory {...params} />)
    expect(wrapper).toBeDefined()
  })

  test('allows us to set props', () => {
    params.arcSite = 'elcomercio'
    const wrapper = mount(<ExtraordinaryStory {...params} />)
    wrapper.setProps({ multimediaType: 'basic_video' })
    expect(wrapper.props().multimediaType).toBe('basic_video')
  })

  describe('getIcon - function', () => {
    beforeEach(() => {
      // jest.resetModules()
      getIcon.mockReset()
    })

    test('should render icon gallery', () => {
      params.arcSite = 'elcomercio'
      getIcon.mockReturnValueOnce('G')
      const wrapper = shallow(<ExtraordinaryStory {...params} />)
      expect(wrapper).toBeDefined()
    })

    test("should don't render icon gallery", () => {
      params.arcSite = 'elcomercio'
      getIcon.mockImplementation(() => 'video')
      const wrapper = shallow(<ExtraordinaryStory {...params} />)
      expect(wrapper).toBeDefined()
    })

    test("should call one times 'getIcon()'", () => {
      params.arcSite = 'elcomercio'
      shallow(<ExtraordinaryStory {...params} />)
      expect(getIcon).toHaveBeenCalledTimes(1)
    })
  })
})
