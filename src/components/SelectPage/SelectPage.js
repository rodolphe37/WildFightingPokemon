/* eslint-disable linebreak-style */
import React,{Component} from 'react';
import { Link } from 'react-router-dom';
import CardSelect from '../SelectCard/SelectCard';
import './SelectPage.css'
import axios from 'axios'


class SelectPage extends Component {
  constructor(props){
    super(props)
    this.state = {
      pokemon1 : null,
      pokemon1Atks:{
        atk1:null,
        atk2:null,
      },
      pokemon2 : null,
      pokemon2Atks:{
        atk1:null,
        atk2:null,
      },
    }
  }
  componentDidMount(){
    this.getPokemon(1, this.props.pokemonIndex1);
    this.getPokemon(2, Math.floor(Math.random() * (104)) + 1);
  }
  damage(id,name){
    const {stats} = this.state[name]
    const hp = stats[4].base_stat
    return (10 * Math.ceil(
      (id * ((
        stats[0].base_stat
        + stats[1].base_stat
        + stats[2].base_stat
        + stats[3].base_stat
      ) / 5)
      ) / hp / 10,
    ))
  }
  getPokemon = (index,number) => {
    axios.get("https://pokeapi.co/api/v2/pokemon/"+number)
      .then( response => response.data )
      .then( pokemon => {
        this.setState({['pokemon'+index]:pokemon})
        const atk1 = Math.floor(Math.random() * (pokemon.moves.length - 1)) + 1
        const atk2 = Math.floor(Math.random() * (pokemon.moves.length - 1)) + 1
        this.setState({['pokemon'+index+['Atks']]:{atk1,atk2}})
        this.props.pokemonStats(index,number,
          {
            atk1:
              {
                name:pokemon.moves[atk1].move.name,
                damage:this.damage(atk1,`pokemon${index}`),
              },
            atk2:
              {
                name:pokemon.moves[atk2].move.name,
                damage:this.damage(atk2,`pokemon${index}`),
              },
          }
        )
      })
  }

  render(){
    const {pokemon1Atks, pokemon2Atks, pokemon1,pokemon2} = this.state;
    return (
      <div>
        {
          pokemon1 && pokemon2 && pokemon1Atks && pokemon2Atks ?
          (
            <div className="SelectPage">
              <CardSelect 
                id="0"
                moves={pokemon1.moves} 
                atk1={pokemon1Atks.atk1}
                atk2={pokemon1Atks.atk2}
                damageAtk1={this.damage(pokemon1Atks.atk1,"pokemon1")}
                damageAtk2={this.damage(pokemon1Atks.atk2,"pokemon1")}
                image={pokemon1.sprites.front_default} 
                name={pokemon1.name} 
                type={pokemon1.types.map(x=>x.type.name)} 
                hp={pokemon1.stats[5].base_stat} 
              />
              <i className="fas fa-undo-alt" onClick={()=>this.props.modalState(null)}></i>
              <Link to='/battle' className="SelectPage__VS"><button className="SelectPage__VS-button">V S</button></Link>
              <CardSelect 
                id="1" 
                stats={pokemon2.stats} 
                moves={pokemon2.moves} 
                atk1={pokemon2Atks.atk1}
                damageAtk1={this.damage(pokemon2Atks.atk1,"pokemon2")}
                damageAtk2={this.damage(pokemon2Atks.atk2,"pokemon2")}
                atk2={pokemon2Atks.atk2}
                image={pokemon2.sprites.front_default} 
                name={pokemon2.name} 
                type={pokemon2.types.map(x=>x.type.name)} 
                hp={pokemon2.stats[5].base_stat} 
              />
            </div>
          ):
          <p>Loading ...</p>
        }
        </div>
    );
  }
}

export default SelectPage;
