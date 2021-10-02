import React, { Component } from "react"

export default class Message extends React.Component {
  constructor(props) {
    super(props)
  }
  isOwner = _ => { return true }
  render(){
    const { message } = this.props;
    const classFlex = this.isOwner() ? 'flex-row-reverse' : 'flex-row'

    return (
      <div className={`d-flex ${classFlex}`}>
        <div className="message-container">
          <div className="message-body">
            {message.content}
          </div>
          <div className="message-infomations">
            <div className="sender">{message.sender}</div>
            <div className="time">{message.time_ago_in_words}</div>
          </div>
        </div>
      </div>
    )
  }
}
