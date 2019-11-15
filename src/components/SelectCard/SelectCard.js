/* eslint-disable linebreak-style */
import React, { Component } from 'react';
import './SelectCard.css';

class SelectCard extends Component {
  constructor(props) {
    super(props);
    const [type1, type2] = props.type.map((x) => {
      switch (x) {
        case 'ground':
        case 'rock':
          return 'fighting';
        case 'ice':
          return 'water';
        case 'grass':
        case 'bug':
          return 'plant';
        case 'poison':
          return 'psychic';
        case 'electric':
          return 'electrik';
        default:
          return x;
      }
    });
    this.state = {
      type1,
      type2,
    };
  }

  render() {
    const {
      image,
      hp,
      name,
      moves,
      atk1,
      atk2,
      damageAtk1,
      damageAtk2,
    } = this.props;
    const {
      type1,
      type2,
    } = this.state;
    return (
      <section className="SelectCard element-animation1">
        <div className="SelectCard__content">
          <div className="SelectCard__info">
            <span className="SelectCard__info-name">{ name }</span>
            <div>
              <p className="SelectCard__info-pv">
                {10 * Math.floor(hp / 10) < 30 ? 30 : 10 * Math.floor(hp / 10)}
                HP
              </p>
              <div>
                {type1 && <img src={`https://raw.githubusercontent.com/WildCodeSchool/wild-fighting/images/images/${type1}.png`} className="type--image" alt={`type ${type1}`} />}
                {type2 && <img src={`https://raw.githubusercontent.com/WildCodeSchool/wild-fighting/images/images/${type2}.png`} className="type--image" alt={`type ${type2}`} />}
              </div>
            </div>
          </div>
          <img className="SelectCard__avatar" alt="Pokémon" src={image} />
          <div className="SelectCard__atks">
            <div className="SelectCard__atks-panel">
              <span className="SelectCard__atks-panel-name">
                {moves[atk1] && moves[atk1].move.name}
              </span>
              <span className="SelectCard__atks__panel-damg">
                {damageAtk1}
              </span>
            </div>
            <div className="SelectCard__atks-panel">
              <span className="SelectCard__atks-panel-name">
                {moves[atk2] && moves[atk2].move.name}
              </span>
              <span className="SelectCard__atks__panel-damg">
                {damageAtk2}
              </span>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default SelectCard;
