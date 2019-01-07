import React, { Component } from 'react';

class grandSon extends Component {
  constructor(props) {
    super(props);
    this.state = { name: 'grandson' }
  }
  render() { 
    return ( <div>{this.state.name}</div> );
  }
}
 
export default grandSon;