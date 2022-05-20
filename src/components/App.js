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
        allPokemons: null,
        visiblePokemons: null,
        quantityPokemons: 20,
        error: null,
        loading: false,
        disabled: false,
        dataPokemon: null
    }
  
    componentDidMount() { 
      this.fetchPokemons(this.state.quantityPokemons)
    }

  componentDidUpdate(prevProps, prevState) {
      console.log(this.props.pokemons);
        const prevQuery = prevState.serchQuery;
        const nextQuery = this.state.serchQuery;

        if (prevQuery !== nextQuery) {
            this.fetchPhotos();
        }

        if (
            prevState.largeImageURL !== this.state.largeImageURL &&
            this.state.largeImageURL
        ) {
            this.setState({ disabled: true });
            window.addEventListener("keydown", this.closeModalWindow);
        }
    }

    closeModalWindow = (e) => {
        if (e.code === 'Escape' || e.target.id === 'overlay') {
            this.setState({ disabled: false, largeImageURL: null });
            window.removeEventListener("keydown", this.closeModalWindow);
        }
    }

    async fetchPokemons(count) {
        this.setState({
            loading: true
        })

      await PokemonApi.fetchPokemons(count).then((data) => {  
                this.props.getAllPokemons(data)
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

    handleFormSubmit = name => {
      console.log(name);
      const { visiblePokemons } = this.state
      const filteredVisiblePokemons = visiblePokemons.filter(item => 
        item.name.includes(name) && item
      )

      this.setState(prevState => {
        return {
          visiblePokemons: filteredVisiblePokemons
        };
    });
    }

    handlerOnePokemon = (url) => {
      PokemonApi.fetchPokemon(url)
        .then((data) => {
          console.log(data);
              this.setState({ dataPokemon: data });
          })
        .catch(error => console.log(error))
        .finally(() => this.setState({ disabled: true }))
    };

    render() {

        const { visiblePokemons, error, loading, disabled, dataPokemon } = this.state

        return (
            <>
                {error && <p message={`Whoops, something went wrong: ${error.message}`} />}
                <Searchbar onSubmit={this.handleFormSubmit} />
                {visiblePokemons && 
                    <ImageGallery pokemons={this.props.pokemons} largeImg={this.handlerOnePokemon} />
                }
                {visiblePokemons && !loading && 
                  <button className="button" type="button" onClick={this.swowMorePokemons}>Load more</button>}
                {loading && <p>Загрузка...</p>}
            {disabled && <Modal pokemon={dataPokemon} onClose={this.closeModalWindow}/>}
            </>
        )
    }
}

function mapStateToProps({pokemons}) {
	return {
		pokemons: pokemons.pokemons.results
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		getAllPokemons: Actions.GetAllPokemons,
		// closeNameDialog: StoreActions.closeNameDialog
	}, dispatch);
}

export default connect(mapStateToProps ,mapDispatchToProps)(App);