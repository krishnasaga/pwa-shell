import React from 'react'
import BookList from './BookList/BookList.js'

export default class Books extends React.Component {
  render(){
    return (
	  <div><BookList list={[
	   { title: 'One' },
	   { title: 'Two' },
	   { title: 'Three' },
	   { title: 'Four' },
	   { title: 'Five' }
	  ]} /></div>
	);
  }
}
