import React from 'react'

export default class Book extends React.Component {
  render(){
    return (
	  <h2>{ this.props.title }</h2>
	);
  }
}
