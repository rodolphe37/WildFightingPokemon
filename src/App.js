/* eslint-disable linebreak-style */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import './App.css';
import { Route, BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';
import BattlePage from './components/BattlePage/BattlePage';
import LoserPage from './components/Loser/LoserPage';
import WinnerPage from './components/WinnerPage/WinnerPage';
import SelectPage from './components/SelectPage/SelectPage';
import ModalPage from './components/ModalPage/ModalPage';
import Onglet from './components/Onglet/Onglet';

class App extends Component {
    constructor(props){
        super(props)
        this.state = {
            pokemonIndex1:null,
            pokemonIndex2:null,
            pokemon1:null,
            pokemon2:null,
            modalChoose:false
        }
    }
    modalState = (id) => {
      this.setState({modalChoose: !this.state.modalChoose})
      this.setState({pokemonIndex1: id})
      console.log(this.state.modalChoose)
    }
    addPokemon = ( pkIndex ) => {
        this.setState({pokemonIndex:pkIndex})
    }
    pokemonStats = (number,id,atks) => {
      this.setState({['pokemonIndex'+number]:id})
      this.setState(
        {
          ['pokemon' + number] :  {
            ...['pokemon' + number],
            atks : {
              atk1:{name:atks.atk1.name,damage:atks.atk1.damage},
              atk2:{name:atks.atk2.name,damage:atks.atk2.damage},
            }
          }
        }
      )
    }
  render () {
    const {
      pokemon1,
      pokemon2,
      pokemonIndex2,
      pokemonIndex1,
      modalChoose
    } = this.state
      return (
        <Router>
          <div className="App">
              <Onglet />
              <Switch>
                <Route exact path="/">
                  {
                    modalChoose ? 
                    <SelectPage 
                      pokemonIndex1={pokemonIndex1} 
                      pokemonIndex2={pokemonIndex2} 
                      pokemonStats={this.pokemonStats}
                      modalState={this.modalState}
                    /> 
                    : <ModalPage modalState={this.modalState} />
                  }
                  
                </Route>
                <Route path="/battle">
                {
                  pokemon1 && pokemon2
                    ? <BattlePage 
                        pokemonIndex1={pokemonIndex1} 
                        pokemonIndex2={pokemonIndex2} 
                        pokemon1Atks={pokemon1.atks} 
                        pokemon2Atks={pokemon2.atks} 
                        doDamage={this.doDamage}
                        round={1}
                        />
                    : <Redirect to="/"/>
                  }
                </Route>
                <Route path="/win">
                  <WinnerPage pokemonIndex={pokemonIndex1} modalState={this.modalState}/>
                </Route>
                <Route path="/loose">
                  <LoserPage  pokemonIndex={pokemonIndex1}  modalState={this.modalState}/>
                </Route>
                <Route path="/pokedex" component={ModalPage} />
              </Switch>
          </div>
        </Router>
      )
    }
}
export default App;
