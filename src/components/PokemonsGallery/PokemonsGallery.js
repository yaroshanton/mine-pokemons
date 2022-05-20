import React, { Component } from "react";
import PropTypes from "prop-types";
import { v4 as uuidv4 } from 'uuid';

export default class ImageGallery extends Component {
    static propTypes = {
        largeImg: PropTypes.func.isRequired,
        // images: PropTypes.array.isRequired
    };

    onClickItem = (url) => {
        this.props.largeImg(url);
    };

    render() {
        const { pokemons } = this.props;
        return (
            <ul className="image-gallery">
                {pokemons.map((pokemon) => (
                  <li key={uuidv4()}className="image-gallery_item">
                    <button onClick={() => this.onClickItem(pokemon.url)}>{pokemon.name}</button>
                  </li>
                ))}
            </ul>
        );
    }
}