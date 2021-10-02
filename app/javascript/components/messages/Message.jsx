import React, { Component } from "react"

export default class Message extends React.Component {
  constructor(props) {
    super(props)
  }
  isOwner = _ => {
    const { currentUser, message } = this.props;

    return currentUser && currentUser.id === message.sender_id;
  }
  senderName = _ => {
    const { message } = this.props;

    return message && message.sender.email.split(/[@\.]/)[0]
  }
  render(){
    const { message } = this.props;
    const classFlex = this.isOwner() ? 'flex-row-reverse' : 'flex-row';
    const ownMessageClass = this.isOwner() ? 'mine' : 'theirs';

    return (
      <div className={`d-flex ${classFlex}`}>
        <div className="message-container">
          <div className="message-information">
            <div className="sender">{this.senderName()}</div>
          </div>
          <div className={`message-body message ${ownMessageClass}`}>
            {message.content}
          </div>
          <div className="message-information">
            <div className="time">{message.time_ago_in_words}</div>
          </div>
        </div>
      </div>
    )
  }
}
