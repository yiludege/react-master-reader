import React, { Component } from 'react'
import Child from './updateChild'
class update extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: 'father'
    }
  }
  static getDerivedStateFromProps(props, state) {
    debugger
  }
  handleClick = () => {
    this.setState(preState => ({ name: preState.name + '1' }))
  }
  render() {
    return (
      <div onClick={this.handleClick}>
        {this.state.name}
        <Child />
      </div>
    )
  }
}

export default update
