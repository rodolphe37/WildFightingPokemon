import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import cross from './croixtest.png';
import './LoserPage.css';
import Row from './return.png';
import PokeFinal from './pokefinal.png';

function LoserPage({pokemonIndex,modalState}) {
  return (
    <div className="loser-block--page">
      {
        !pokemonIndex && <Redirect to="/" />
      }
      <div className="loser-structure--page">
        <div className="element-animation2">
          <img className="cross" src={cross} alt="lose"/>
        </div>
        <div className="element-animation">
          <h2 className="loser--title">You loose</h2>
        </div>
        <div className="bounce-in-bottom ">
          <Link path to="/">
            <img className="row" src={Row} alt="lose"/>
          </Link>
        </div>
        <img className="pokeball--fond" src={PokeFinal} alt="pokeball_fond-Png"/>
      </div>
    </div>
  );
}

export default LoserPage;
