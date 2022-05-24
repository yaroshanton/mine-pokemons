import React, { Component } from 'react'
import { connect } from 'react-redux';
import {bindActionCreators} from "redux";
import * as Actions from '../redux/pokemons/actions';
import PokemonApi from '../services/PokemonApi'
import Searchbar from './Searchbar/Searchbar'
import ImageGallery from './PokemonsGallery/PokemonsGallery'
import Modal from './Modal/Modal'
import './styles.scss'

class App extends Component {
    state = {
        dataPokemon: null,
        queryName: null,
        quantityPokemons: 20,
        loading: false,
        showModal: false,
        error: null,
    }
  
    componentDidMount() { 
      this.fetchPokemons(this.state.quantityPokemons)
    }

  componentDidUpdate() {
        if (this.state.dataPokemon) {
            window.addEventListener("keydown", this.closeModalWindow);
        }
    }

  closeModalWindow = (e) => {
        if (e.code === 'Escape' || e.target.id === 'overlay') {
            this.setState({ showModal: false, dataPokemon: null });
            window.removeEventListener("keydown", this.closeModalWindow);
        }
    }

    fetchPokemons(count) {
        this.setState({
            loading: true
        })

      PokemonApi.fetchPokemons(count).then((data) => {  
        this.props.getAllPokemons(data.results);
      })
      .catch(error => console.log(error))
      .finally(() => this.setState({ loading: false }))
    }
  
  swowMorePokemons = () => {
    this.setState(prevState => {
      return {
        quantityPokemons: prevState.quantityPokemons + 20
      };
    });
      this.fetchPokemons(this.state.quantityPokemons)
    }

    handlerOnePokemon = (url) => {
      PokemonApi.fetchPokemon(url)
        .then((data) => {
          this.setState({
            dataPokemon: data,
            showModal: true
          });
        })
        .catch(error => console.log(error))
    };

    render() {
      const { pokemons } = this.props
        const { error, loading, showModal, dataPokemon } = this.state

        return (
            <>
              {error && <p>`Whoops, something went wrong: ${error.message}`</p>}
              <Searchbar/>
              {pokemons.length > 0 && 
                  <ImageGallery pokemons={pokemons} openDetails={this.handlerOnePokemon} />}
              {pokemons.length > 0 &&
                <button className="button-load" type="button" onClick={this.swowMorePokemons}>Load more</button>}
              {showModal && <Modal pokemon={dataPokemon} onClose={this.closeModalWindow}/>}
              {loading && <p className='loader'>Loading...</p>}
              {!loading && pokemons.length === 0 && <p className='loader'>No pokemon found</p>}
            </>
        )
    }
}

const getVisibleContacts = (pokemons, filter) => {
    const normalizedFilter = filter.toLocaleLowerCase();
    return pokemons.filter(({ name }) => name.toLocaleLowerCase().includes(normalizedFilter))

}

function mapStateToProps(state) {
  const { pokemons, filter } = state;
  const visibleContacts = getVisibleContacts(pokemons, filter)

	return {
		pokemons: visibleContacts
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		getAllPokemons: Actions.GetAllPokemons,
	}, dispatch);
}

export default connect(mapStateToProps ,mapDispatchToProps)(App);