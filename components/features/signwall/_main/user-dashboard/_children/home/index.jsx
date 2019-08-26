import React, { Component } from 'react'
import { ModalConsumer } from '../../../signwall/context'
import Profile from './profile'
import Subscripcions from './subs'

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      //   <ModalConsumer>
      //     {val => (
      <>
        <Profile />
        <Subscripcions />
      </>
      //     )}
      //   </ModalConsumer>
    )
  }
}
export default Home
