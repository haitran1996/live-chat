import React from "react"
import { toast } from 'react-toastify';
import { apiClient } from '../utils/apiClient'
import { Form, Button, Input } from 'reactstrap'

import Message from './messages/Message';
import MessageForm from './messages/MessageForm';

export default class Room extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      messages: [],
    }
  }
  componentDidMount(){
    this.fetchMessages();
  }
  fetchMessages = () => {
    const { id } = this.props;
    apiClient().get(`/rooms/${id}/messages.json`)
      .then((response) => {
        this.setState({
          messages: response.data
        })
      })
      .catch((err) => toast.error(err));
  }
  onChangeBody = ({ target: { value: body } }) => {
    this.setState({
      body: body
    })
  }
  render(){
    const { name, id } = this.props;
    const { messages } = this.state;

    return (
      <div className="room-container">
        <div className="room-header col-md">
          <div className="room-name">{name}</div>
        </div>
        <div className="room-body">
          {
            messages.map(message => {
              return <Message message={message} />
            })
          }
        </div>
        <div className="room-footer">
          <MessageForm roomId={id} reloadMessages={this.fetchMessages} />
        </div>
      </div>
    )
  }
}