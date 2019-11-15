/* eslint-disable react/prop-types */
/* eslint-disable linebreak-style */
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import './BattleCard.css';

class BattleCard extends Component {
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
  componentDidMount(){
    setTimeout(
      (
        ()=>
          {this.props.round === 0 & this.props.id === "1" &&
            (
              Math.floor(Math.random() * 2) === 0 ?
                this.props.doDamage(this.props.damageAtk1,"pokemon1"):
                this.props.doDamage(this.props.damageAtk2,"pokemon1")
            )
          }
      ),3500
    )
  }
  render() {
    const {
      id,
      image,
      hp,
      name,
      atk1,
      atk2,
      damageAtk1,
      damageAtk2,
      round
    } = this.props;
    const {
      type1,
      type2,
    } = this.state;
    return (
      <section className="BattleCard element-animation">
        { this.props.hp <= 0 && this.props.id === "0" && <Redirect to="/loose" /> }
        { this.props.hp <= 0 && this.props.id === "1" && <Redirect to="/win" /> }
        <div className="BattleCard__content">
          <div className="BattleCard__info">
            <span className="BattleCard__info-name">{ name }</span>
            <div>
              <p className="BattleCard__info-pv">
                {hp < 0 ? 0 : hp }
                HP
              </p>
              <div>
                {type1 && <img src={`https://raw.githubusercontent.com/WildCodeSchool/wild-fighting/images/images/${type1}.png`} className="type--image" alt={`type ${type1}`} />}
                {type2 && <img src={`https://raw.githubusercontent.com/WildCodeSchool/wild-fighting/images/images/${type2}.png`} className="type--image" alt={`type ${type2}`} />}
              </div>
            </div>
          </div>
          <img className="BattleCard__avatar" alt="Pokémon" src={image} />
          <div className="BattleCard__atks">
            <button 
              className="BattleCard__atks-panel"
              disabled={round !== parseInt(id) ? false : true}
              onClick={(e) =>
                {
                  this.props.doDamage(damageAtk1,id === "0" ? "pokemon2" : "pokemon1")
                }}
            >
              <span className="BattleCard__atks-panel-name">
                {atk1}
              </span>
              <span className="BattleCard__atks__panel-damg">
                {damageAtk1}
              </span>
            </button>
            <button 
              className="BattleCard__atks-panel"
              disabled={round !== parseInt(id) ? false : true}
              onClick={(e) =>
                {
                  this.props.doDamage(damageAtk2,id === "0" ? "pokemon2" : "pokemon1")
                }}
            >              
              <span className="BattleCard__atks-panel-name">
                {atk2}
              </span>
              <span className="BattleCard__atks__panel-damg">
                {damageAtk2}
              </span>
            </button>
          </div>
        </div>
      </section>
    );
  }
}

export default BattleCard;
