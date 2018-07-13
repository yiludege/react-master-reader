import React, { Component } from 'react';
import PropTypes from 'prop-types';

class A extends Component {
  static propTypes = {
    one: PropTypes.string,
    two: PropTypes.object
  }
  state = {
    owe:'子元素State.owe'
  }

  static getDerivedStateFromProps(props, state) {
    debugger;
  }


  componentDidMount() {
    debugger;
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    debugger;
    console.log(
      "子元素getSnapshotBeforeUpdate: props 和 prevPros：",
      this.props == prevProps ? "相等" : "不等"
    );
  }
  
  shouldComponentUpdate(nextProps, nextState) {
    debugger;
    console.log(
      "子元素shouldComponentUpdate: props 和 prevPros：",
      this.props == nextProps ? "相等" : "不等"
    );
    return true;
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    debugger;
    console.log(
      "子元素componentDidUpdate: props 和 prevPros：",
      this.props == prevProps ? "相等" : "不等"
    );
  }

  handleChange = (e) => {
    this.setState(prevState => ({owe: prevState.owe + '1'}))
    e.stopPropagation()
  }
  render() { 
    debugger
    return (
      <div className="A">
        <div onClick={this.handleChange}>{this.state.owe}</div>
        <div>{this.props.one}</div>
        <div>{this.props.two.key}</div>
      </div>
    )
  }
}
 
export default A;