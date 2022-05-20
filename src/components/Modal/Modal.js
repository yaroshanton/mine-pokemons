import React from "react";
import PropTypes from "prop-types";
import { v4 as uuidv4 } from 'uuid';

function Modal({ onClose, pokemon }) {
    return (
        <div className="moadal-overlay" id="overlay" onClick={onClose}>
          <div className="modal">
                <img src={pokemon.sprites.front_default}/>
                <p>Name: {pokemon.name}</p>
                <p>Moves:</p>
                 <ul>
                  {pokemon.moves.slice(0, 5).map(item =>
                   <li key={uuidv4()}>{item.move.name}</li>
                  )}
                  </ul>
                  <p>Stats:</p>
                  <ul>
                  {pokemon.stats.slice(0, 5).map(item =>
                   <li key={uuidv4()}>{item.base_stat}</li>
                  )}
                  </ul>
               
            </div>
        </div>
    );
}

Modal.propTypes = {
    onClose: PropTypes.func.isRequired
};

export default Modal;