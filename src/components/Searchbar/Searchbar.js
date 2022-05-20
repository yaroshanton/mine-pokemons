import React, { Component } from 'react'

export default class Searchbar extends Component {
    state = {
        inputValue: '',
    }

    handleChange = e => {
        this.setState({
            inputValue: e.target.value,
        })
      
      this.props.onSubmit(e.target.value)
    }

    handleSubmit = e => {
        e.preventDefault();

        this.props.onSubmit(this.state.inputValue)
        this.setState({
            inputValue: ''
        })
    }

    render() {
        return (
            <header className="searchbar">
                <form className="search-form" onSubmit={this.handleSubmit}>
                    <input
                        className="search-form_input"
                        type="text"
                        autoComplete="off"
                        placeholder="Type pokemon name"
                        value={this.state.inputValue}
                        onChange={this.handleChange}
                  />
                  <button type="submit" className="search-form_button">
                            <span className="search-form-button_label">Search</span>
                        </button>
                </form>
            </header>
        )
    }
}