import React, { useEffect, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import './WinnerPage.css';
import axios from 'axios';
import trophy from './trophy2.0.png';
import returnArrow from './return.png';

const Winner = ({pokemonIndex, modalState}) => {
  const [imagePokemon, changeImagePokemon] = useState()
  useEffect(()=>{
      axios.get("https://pokeapi.co/api/v2/pokemon/"+ pokemonIndex)
        .then( response => response.data )
        .then( pokemon => {
          changeImagePokemon(pokemon.sprites.front_default)
        })
  },[])
  return (
    <div className="winner-result">
      {
        !pokemonIndex && <Redirect to="/" />
      }
      <div className="roll-in-blurred-left">
        <img className="trophy" alt="#" src={trophy} />
      </div>
      <div className="v-1">
        <div className="slide-in-blurred-top">
          <h1 className="win-result-title">victory</h1>
        </div>
        <div className="rotate-in-center">
          <img className="winner-pokemon" src={imagePokemon} alt="pokemon winner" />
        </div>
        <div className="option">
          <div className="bounce-in-bottom">
            <Link to="/">
              <img className="arrow-w" src={returnArrow} alt="returnarrow" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Winner;
