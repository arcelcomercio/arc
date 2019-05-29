import React from 'react'
import { shallow, mount } from 'enzyme'
import ExtraordinaryStory from '../../../../components/global-components/extraordinary-story'

describe('Extraordinary Story', () => {
  const params = {
    data: {},
    multimediaOrientation: 'bottom',
    contentOrientation: 'left',
    isSection: false,
    multimediaType: 'video',
    deployment: () => {},
    contextPath: '',
    arcSite: '',
  }

  it('should render', () => {
    const wrapper = shallow(<ExtraordinaryStory {...params} />)
    expect(wrapper).toBeDefined()
  })

  it('allows us to set props', () => {
    const wrapper = mount(<ExtraordinaryStory {...params} />);
    // expect(wrapper.props().multimediaType).toEqual('baz');
    wrapper.setProps({ multimediaType: 'foo' });
    expect(wrapper.props().multimediaType).toBe('foo');
  });
})

/*
test('two plus two is four', () => {
  expect(2 + 2).toBe(4)
})
*/
