import React, { Component } from "react"
import { Form, Input, Button } from 'reactstrap'
import { apiClient } from '../../utils/apiClient'
import { toast  } from "react-toastify";

export default class MessageForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      body: '',
      formData: new FormData(),
    }
  }
  onChange = ({ target: { value: body } }) => {
    this.setState({
      body: body
    })
  }
  setFormData = () => {
    const { roomId } = this.props;
    const { body, formData } = this.state;

    formData.append('message[receiver_id]', roomId)
    formData.append('message[receiver_type]', 'Room')
    formData.append('message[sender_id]', 3)
    formData.append('message[content]', body)

    this.setState({
      formData: formData
    })
  }
  clearForm = () => {
    this.setState({
      formData: new FormData(),
      body: '',
    })
  }
  submit = event => {
    event.preventDefault();
    const { reloadMessages, roomId } = this.props;
    const { formData } = this.state;

    this.setFormData();
    return apiClient().post(`/rooms/${roomId}/messages.json`, formData)
      .then(_ => {
        this.clearForm();
        reloadMessages();
      })
      .catch(err => toast.error(err))
  }
  render(){
    const { body } = this.state;

    return (
      <Form onSubmit={this.submit} className="d-flex">
        <Input placeholder="Type your message here..." value={body} onChange={this.onChange} autoFocus/>
        <Button className="btn btn-light message-button">
          <i className="far fa-paper-plane"></i>
          Send
        </Button>
      </Form>
    )
  }
}