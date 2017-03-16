import React from 'react'

export default class Book extends React.Component {
  render(){
    return (
	  <div className="mdl-card">
  <div className="mdl-card__title">
    <h2 className="mdl-card__title-text"> { this.props.title } </h2>
  </div>
  <div className="mdl-card__media">
    <img src="https://images-na.ssl-images-amazon.com/images/I/41TINACY3hL._UY250_.jpg" width="220" height="140" border="0" alt=""  />
  </div>
  <div className="mdl-card__supporting-text">
    This text might describe the photo and provide further information, such as where and
    when it was taken.
  </div>
  <div className="mdl-card__actions">
    <a href="(URL or function)">Related Action</a>
  </div>
</div>
	);
  }
}
