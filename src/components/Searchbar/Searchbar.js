import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from "redux";
import * as Actions from '../../redux/pokemons/actions'
import './Searchbar.scss'

 class Searchbar extends Component {
    state = {
        inputValue: '',
    }

    handleChange = e => {
        this.setState({
            inputValue: e.target.value,
        })
      
      this.props.onChange(e.target.value)
    }

    render() {
        return (
            <header className="searchbar">
                <form className="search-form">
                    <input
                        className="search-form_input"
                        type="text"
                        autoComplete="off"
                        placeholder="Type pokemon name"
                        value={this.state.inputValue}
                        onChange={this.handleChange}
                  /> 
                </form>
            </header>
        )
    }
 }

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    onChange: Actions.changeFilter
	}, dispatch);
}

export default connect(null, mapDispatchToProps)(Searchbar);