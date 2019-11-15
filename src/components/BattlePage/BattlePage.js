/* eslint-disable react/prop-types */
/* eslint-disable linebreak-style */
import React, { Component } from 'react';
import BattleCard from '../BattleCard/BattleCard';
import './BattlePage.css';
import axios from 'axios';

class BattlePage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      pokemon1 : null,
      pokemon2 : null,
      round:props.round
    }
  }
  componentDidMount(){
    this.getPokemon(1, this.props.pokemonIndex1);
    this.getPokemon(2, this.props.pokemonIndex2);
  }
  getPokemon = (index,number) => {
    axios.get("https://pokeapi.co/api/v2/pokemon/"+number)
      .then( response => response.data )
      .then( pokemon => {
        this.setState({['pokemon'+index]:pokemon})
        this.setState({["pokemon"+index+"hp"]:10 * Math.floor(pokemon.stats[5].base_stat / 10)})
      })
  }
  doDamage = (damage, counter) => {
    console.log()
    this.setState(
      (prev) => (
        {
          [counter+"hp"] : prev[counter+"hp"] - damage,
        }
      )
    )
    this.state.round === 0 ? this.setState({round:1}) : this.setState({round:0})
  }
  render(){
    const {pokemon1,pokemon2,pokemon1hp,pokemon2hp,round} = this.state;
    const {pokemon1Atks,pokemon2Atks} = this.props
    return (
      <div>
        {
          pokemon1 && pokemon2 ?
          (
            <div className="BattlePage">
              <BattleCard
                key="pokemon1"
                id="0"
                moves={pokemon1.moves}
                atk1={pokemon1Atks.atk1.name}
                atk2={pokemon1Atks.atk2.name}
                damageAtk1={pokemon1Atks.atk1.damage}
                damageAtk2={pokemon1Atks.atk2.damage}
                image={pokemon1.sprites.front_default}
                name={pokemon1.name}
                type={pokemon1.types.map(x=>x.type.name)}
                hp={pokemon1hp}
                doDamage={this.doDamage}
                round={round}
              />
              <BattleCard
                key="pokemon2"
                id="1"
                moves={pokemon2.moves}
                atk1={pokemon2Atks.atk1.name}
                atk2={pokemon2Atks.atk2.name}
                damageAtk1={pokemon2Atks.atk1.damage}
                damageAtk2={pokemon2Atks.atk2.damage}
                image={pokemon2.sprites.front_default}
                name={pokemon2.name}
                type={pokemon2.types.map(x=>x.type.name)}
                hp={pokemon2hp}
                doDamage={this.doDamage}
                round={round}
              />
            </div>
          ):
          <p>Loading ...</p>
        }
        </div>
    );
  }
}

export default BattlePage;
