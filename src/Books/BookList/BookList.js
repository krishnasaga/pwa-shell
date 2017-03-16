import React from 'react'
import Book from './Book.js'

export default class BookList extends React.Component {
  render(){
    return (
	  <div>{ this.props.list.map(  ( book , index ) => { return <Book title={ book.title } key={ index } />; } ) }</div>
	);
  }
}
