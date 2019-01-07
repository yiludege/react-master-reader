import React, { Component } from 'react';
import GrandSon from './updateGrandSon'
class child extends Component {
  constructor(props) {
    super(props);
    this.state = { name: 'child' }
  }
  render() { 
    return ( <div>{this.state.name}<GrandSon/></div> );
  }
}
 
export default child;