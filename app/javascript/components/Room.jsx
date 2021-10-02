import React from "react"
import { toast } from 'react-toastify';
import { apiClient } from '../utils/apiClient'
import { Form, Button, Input } from 'reactstrap'

import Message from './messages/Message';
import MessageForm from './messages/MessageForm';

const NUMBER_OF_LIMIT_SHOW_ASSIGNMENTS = 3;

export default class Room extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      messages: [],
      assignments: [],
    }
  }
  componentDidMount(){
    this.fetchMessages();
    this.fetchAssignments();
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
  fetchAssignments = () => {
    const { id } = this.props;
    apiClient().get(`/rooms/${id}/users.json`)
      .then(({ data: assignments }) => {
        this.setState({
          assignments: assignments
        });
      })
      .catch((err) => toast.error(err));
  }
  onChangeBody = ({ target: { value: body } }) => {
    this.setState({
      body: body
    })
  }
  assignmentNames = () => {
    const { assignments } = this.state;

    if (assignments.length > NUMBER_OF_LIMIT_SHOW_ASSIGNMENTS) {
      return `${assignments.slice(0, NUMBER_OF_LIMIT_SHOW_ASSIGNMENTS - 1).map(assignment => assignment.email).join(',')} and ${assignments.length - NUMBER_OF_LIMIT_SHOW_ASSIGNMENTS} others`
    }

    return assignments.map(assignment => assignment.email).join(', ')
  }
  render(){
    const { name, id, current_user: currentUser } = this.props;
    const { messages } = this.state;

    return (
      <div className="room-container">
        <div className="room-header col-md py-4">
          <div className="room-name py-2">{name}</div>
          <div className="assignments">
            {this.assignmentNames()}
          </div>
        </div>
        <div className="room-body">
          {
            messages.map(message => {
              return <Message message={message} currentUser={currentUser}/>
            })
          }
        </div>
        <div className="room-footer">
          <MessageForm roomId={id} reloadMessages={this.fetchMessages}/>
        </div>
      </div>
    )
  }
}