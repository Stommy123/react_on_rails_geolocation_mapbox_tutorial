import React, { Component } from 'react';

class PlaceForm extends Component {
  state = {
    name: String(),
    street: String(),
    city: String(),
    state: String()
  }

  handleChange = field => e => this.setState({ [field]: e.target.value })

  handleSubmit = e => {
    e.preventDefault()
    const { name, street, city, state } = this.state
    const { createPlace } = this.props
    createPlace({ name, street, city, state })
    this.setState({
      name: String(),
      street: String(),
      city: String(),
      state: String()
    })
  }

  render() {
    const { name, street, city, state } = this.state;
    return (
      <form id='place-form' onSubmit={this.handleSubmit}>
        <h3>Create a new place!</h3>
        <input
          type='text'
          value={name}
          placeholder='Please input a name'
          onChange={this.handleChange('name')}
          label='Name'
        />
        <input
          type='text'
          value={street}
          placeholder='Please input a street'
          onChange={this.handleChange('street')}
          label='Street'
        />
        <input
          type='text'
          value={city}
          placeholder='Please input a city'
          onChange={this.handleChange('city')}
          label='City'
        />
        <input
          type='text'
          value={state}
          placeholder='Please input a state'
          onChange={this.handleChange('state')}
          label='State'
        />
        <input
          type='submit'
          value='Create'
        />
      </form>
    )
  }
}

export default PlaceForm;
