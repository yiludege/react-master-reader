import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  state = {show: true }
  changeMake = () => {
    // this.setState({make: 'new'})
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
      </div>
    );
  }
}

export default App;
