import React, { Component } from 'react';
import PokemonCard from '../PokemonCard/PokemonCard';
import axios from 'axios';
import './PokeList.css';

class PokemonList extends Component {
  state = {
    pokemons: []
  };

  async componentDidMount() {
    const res = await axios.get('https://pokeapi.co/api/v2/pokemon/?offset=0&limit=104');
    this.setState({ pokemons: res.data['results'] });
    console.log(res.data['results'] )
  }

  render() {
    
    return (
      <div className="PokeList">
        {this.state.pokemons.length > 0
          ? this.state.pokemons.map(pokemon => (
              <PokemonCard
                key={pokemon.name}
                name={pokemon.name}
                url={pokemon.url}
                modalState={this.props.modalState}
              />
            ))
          : <h5>Getting Pokemon...</h5>
        }
      </div>
    );
  }
}

export default PokemonList;
