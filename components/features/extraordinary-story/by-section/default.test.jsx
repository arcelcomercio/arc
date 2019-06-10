import React from 'react'
import { shallow, mount } from 'enzyme'
import ExtraordinaryStory from '@components/extraordinary-story'

describe('Suma - Feature', () => {
  beforeEach(() => {
    // code
    global.data = { five: 5 }
  })

  afterEach(() => {
    // code
    global.data = {}
  })
  
  test('La suma debe ser siete', () => {
    expect(2 + global.data.five).toBe(7)
  })
})
