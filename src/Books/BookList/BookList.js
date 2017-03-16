import React from 'react'
import Book from './Book.js'

export default class BookList extends React.Component {
  render(){
    return (
	  <div>{ this.props.list.map( () => { return <Book/>; } ) }</div>
	);
  }
}
