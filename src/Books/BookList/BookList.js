import React from 'react'
import Book from './Book.js'

export default class BookList extends React.Componenet {
  render(){
    return (
	  <div>{ props.list.map( () => { return <Book/>; } ) }</div>
	);
  }
}
