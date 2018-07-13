import React, { Component } from "react";
// import logo from './logo.svg';
import Child from "./child.js";
import "./App.css";

class App extends Component {
  
  state = { show: true, one: "父元素one", two: { key: "父元素two" } };

  changeMake = () => {
    debugger;
    this.setState(prevState => ({ show: !prevState.show }));
  };

  static getDerivedStateFromProps(props, state) {
    debugger;
  }

  componentDidMount() {
    console.log('父元素getSnapshotBeforeUpdate: props 和 prevPros：')
    debugger;
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    debugger;
    console.log(
      "父元素getSnapshotBeforeUpdate: props 和 prevPros：",
      this.props == prevProps ? "相等" : "不等"
    );
  }

  shouldComponentUpdate(nextProps, nextState) {
    debugger;
    console.log(
      "父元素shouldComponentUpdate: props 和 prevPros：",
      this.props == nextProps ? "相等" : "不等"
    );
    return true;
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    debugger;
    console.log(
      "父元素componentDidUpdate: props 和 prevPros：",
      this.props == prevProps ? "相等" : "不等"
    );
  }
  render() {
    debugger
    return (
      <div className="App" onClick={this.changeMake}>
        <Child one={this.state.one} two={this.state.two} />
        why
        {/* <div>A</div><div>B</div>
        <div>C</div><div>D</div>
        <div>{this.state.make}</div> */}
        {this.state.show && <div>hello</div>}
        {!this.state.show && <div>haha</div>}
      </div>
    );
  }
}

export default App;
