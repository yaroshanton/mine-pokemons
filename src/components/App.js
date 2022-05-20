import React, { Component } from 'react'
import PokemonApi from '../services/PokemonApi'
import Searchbar from './Searchbar/Searchbar'
import ImageGallery from './PokemonsGallery/PokemonsGallery'
import Modal from './Modal/Modal'
import './styles.scss'

export default class App extends Component {
    state = {
        allPokemons: null,
        visiblePokemons: null,
        counterPokemons: 10,
        error: null,
        loading: false,
        disabled: false,
        dataPokemon: null
    }
  
    componentDidMount() { 
      this.fetchPokemons()
    }

    componentDidUpdate(prevProps, prevState) {
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

    async fetchPokemons() {
        this.setState({
            loading: true
        })

      await PokemonApi.fetchPokemons().then((data) => {
                this.setState(prevState => {
                    return {
                      allPokemons: data.results,
                    };
                });
                this.swowMorePokemons()
            })
          .catch(error => console.log(error))
          .finally(() => this.setState({ loading: false }))
    }
  
    swowMorePokemons = () => {
      const { allPokemons, counterPokemons } = this.state

      const visiblePokemons = allPokemons.slice(0, counterPokemons + 10);
      this.setState(prevState => {
        return {
          visiblePokemons: visiblePokemons,
          counterPokemons: prevState.counterPokemons + 10
        };
    });
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
                    <ImageGallery pokemons={visiblePokemons} largeImg={this.handlerOnePokemon} />
                }
                {visiblePokemons && !loading && 
                  <button className="button" type="button" onClick={this.swowMorePokemons}>Load more</button>}
                {loading && <p>Загрузка...</p>}
            {disabled && <Modal pokemon={dataPokemon} onClose={this.closeModalWindow}/>}
            </>
        )
    }
}