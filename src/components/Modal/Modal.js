import React from "react";
import PropTypes from "prop-types";
import { v4 as uuidv4 } from 'uuid';
import { Carousel } from '@trendyol-js/react-carousel';
import './Modal.scss'

function Modal({ onClose, pokemon }) {
    return (
      <div className="moadal-overlay" id="overlay" onClick={onClose}>
        <div className="modal">
              <img className="pokemon-image" alt={pokemon.name} src={pokemon.sprites.front_default}/>
              <p className='pokemon-name'>{pokemon.name}</p>
              <p className='pokemon-moves'>Moves:</p>
              <Carousel
                show={3}
                swiping={true}
                responsive={true}
                rightArrow={<button className="buttons-carusel">next</button>}
                leftArrow={<button  className="buttons-carusel">prev</button>}
                className='pokemon-moves-list'>
                  {pokemon.moves.map(item =>
                    <li className='pokemon-moves_item' key={uuidv4()}>{item.move.name}</li>
                  )}
              </Carousel>
              <p className='pokemon-stats'>Stats:</p>
              <Carousel
                show={3}
                className='pokemon-stats-list'
                responsive={true}
                rightArrow={<button className="buttons-carusel">next</button>}
                leftArrow={<button className="buttons-carusel">prev</button>}>
                  {pokemon.stats.map(item =>
                    <li className='pokemon-list_item' key={uuidv4()}>{item.base_stat}</li>
                  )}
              </Carousel>
          </div>
      </div>
    );
}

Modal.propTypes = {
    onClose: PropTypes.func.isRequired
};

export default Modal;