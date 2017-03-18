import React from 'react'

export default class Book extends React.Component {
  render(){
    return (
    <div className="mdl-grid">
    <div className="mdl-cell mdl-cell--12-col">
<div className="demo-card-event mdl-card mdl-shadow--2dp">
  <div className="mdl-card__title mdl-card--expand">
    <h4>
      Featured event:<br/>
      May 24, 2016<br/>
      7-11pm
    </h4>
  </div>
  <div className="mdl-card__actions mdl-card--border">
    <a className="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect">
      Add to Calendar
    </a>
    <div className="mdl-layout-spacer"></div>
    <i className="material-icons">event</i>
  </div>
</div>
</div>
</div>
	);
  }
}
