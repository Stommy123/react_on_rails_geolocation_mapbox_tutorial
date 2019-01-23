import React, { Component } from 'react';

class PlaceForm extends Component {
  state = {
    name: String(),
    street: String(),
    city: String(),
    state: String()
  }
  handleNameChange = e => {
    let { name } = this.state
    name = event.target.value
    this.setState({ name })
  }
  handleStreetChange = e => {
    let { street } = this.state
    street = event.target.value
    this.setState({ street })
  }
  handleCityChange = e => {
    let { city } = this.state
    city = event.target.value
    this.setState({ city })
  }
  handleStateChange = e => {
    let { state } = this.state
    state = event.target.value
    this.setState({ state })
  }
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
          onChange={this.handleNameChange}
          label='Name'
        />
        <input
          type='text'
          value={street}
          placeholder='Please input a street'
          onChange={this.handleStreetChange}
          label='Street'
        />
        <input
          type='text'
          value={city}
          placeholder='Please input a city'
          onChange={this.handleCityChange}
          label='City'
        />
        <input
          type='text'
          value={state}
          placeholder='Please input a state'
          onChange={this.handleStateChange}
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
