import React, { Component } from 'react';
// import logo from './logo.svg';
import A from './a.js'
import './App.css';

class App extends Component {
  state = {show: true }
  changeMake = () => {
    // this.setState({make: 'new'})
    debugger
    this.setState((prevState)=>({show: !prevState.show}))
  }
  // componentWillMount(){
  //   debugger
  // }
  // componentDidMount(){
  //   debugger
  // }
  // componentWillUpdate(){
  //   debugger
  // }
  // componentDidUpdate(){
  //   debugger
  // }
  render() {
    return (
      <div className="App" onClick={this.changeMake}>
      why
        {/* <div>A</div><div>B</div>
        <div>C</div><div>D</div>
        <div>{this.state.make}</div> */}
        {this.state.show && <div>hello</div>}
        {!this.state.show && <div>haha</div>}
        <A />
      </div>
    );
  }
}

export default App;
