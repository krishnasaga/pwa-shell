import React from 'react'
import BookList from './BookList/BookList.js'

export default class Books extends React.Component {
  render(){
    return (
	  <div><BookList list={[1,2,3,4,5]} /></div>
	);
  }
}
