import React, { Component } from "react";
import PropTypes from "prop-types";
import { v4 as uuidv4 } from 'uuid';
import './PokemonsGallery.scss'

export default class ImageGallery extends Component {
    static propTypes = {
        openDetails: PropTypes.func.isRequired,
    };

    onClickItem = (url) => {
        this.props.openDetails(url);
    };

    render() {
      const { pokemons } = this.props;
        return (
            <ul className="pokemons-gallery">
                {pokemons.map((pokemon) => (
                  <li key={uuidv4()} className="pokemons-gallery_item">
                    <div onClick={() => this.onClickItem(pokemon.url)}>{pokemon.name}</div>
                  </li>
                ))}
            </ul>
        );
    }
}