import React, { Component } from 'react';

class PlaceForm extends Component {
  state = {
    name: String(),
    street: String(),
    city: String(),
    state: String(),
    image: String(),
  }

  handleInputChange = field => e => this.setState({ [field]: e.target.value })

  handleImageChange = event => {
    const image = event.target.files[0]
    this.setState({ image })
  }

  handleSubmit = e => {
    e.preventDefault()
    const { name, street, city, state, image } = this.state
    const { createPlace } = this.props
    createPlace({ name, street, city, state, image })
    this.setState({
      name: String(),
      street: String(),
      city: String(),
      state: String(),
      image: String(),
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
          onChange={this.handleInputChange('name')}
          label='Name'
        />
        <input
          type='text'
          value={street}
          placeholder='Please input a street'
          onChange={this.handleInputChange('street')}
          label='Street'
        />
        <input
          type='text'
          value={city}
          placeholder='Please input a city'
          onChange={this.handleInputChange('city')}
          label='City'
        />
        <input
          type='text'
          value={state}
          placeholder='Please input a state'
          onChange={this.handleInputChange('state')}
          label='State'
        />
        <input
          placeholder='Please upload an image'
          name= 'image'
          type='file'
          onChange={this.handleImageChange}
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
