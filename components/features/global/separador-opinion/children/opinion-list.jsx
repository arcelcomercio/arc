import React, { Fragment } from 'react'
import OpinionItem from './opinion-item'

// class ListOpinion extends Component {
//   constructor(props) {
//     super(props)
//     this.state = {
//       data: [],
//     }
//   }
//   render() {
//     const { data } = this.state

//     return (
//       <Fragment>
//         {data.map(alias => {
//           return <OpinionItem key={alias._id} data={alias} />
//         })}
//       </Fragment>
//     )
//   }
// }

class ListOpinion extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: this.props.data,
    }
  }

  render() {
    return <p>lista</p>
  }
}

export default ListOpinion
