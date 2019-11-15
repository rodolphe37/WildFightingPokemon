import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import classnames from 'classnames';
import spinner from './spinner.gif';
import './PokemonCard.css';

const Sprite = styled.img`
  width: 5em;
  height: 5em;
  display: none;
`;

const Card = styled.div`
  opacity: 0.95;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  &:hover {
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  }
  -moz-user-select: none;
  -website-user-select: none;
  -ms-user-select: none;
  user-select: none;
  -o-user-select: none;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: black;
  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
  }
`;


class PokemonCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      imageLoading: true,
      tooManyRequests: false,
    };
  }

  render() {
    const { imageLoading, tooManyRequests } = this.state;
    const { url, name } = this.props;
    const splitUrl = url.split('/');
    const pokemonIndex = splitUrl[splitUrl.length - 2];

    return (
      <div className="dashboard">
        <StyledLink to="/" onClick={()=>this.props.modalState(pokemonIndex)}>
          <Card className="card">
            <h5 className="card-header">{pokemonIndex}</h5>
            {imageLoading && (
              <img
                src={spinner}
                className=" image-loading"
                alt="top-rounded-card"
              />
            )}
            <Sprite
              src={`https://github.com/PokeAPI/sprites/blob/master/sprites/pokemon/${pokemonIndex}.png?raw=true`}
              onLoad={() => this.setState({ imageLoading: false })}
              onError={() => this.setState({ tooManyRequests: true })}
              className={classnames('card-img-top', {
                'sprite-too-many-requests': tooManyRequests,
                'sprite-image-ready': !imageLoading,
              })}
            />
            {tooManyRequests && (
              <h6 className="mx-auto">
                <span className="badge">
                  Too Many Requests
                </span>
              </h6>
            )}
            <div className="card-body">
              <h6 className="card-title">
                {name
                  .toLowerCase()
                  .split(' ')
                  .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
                  .join(' ')}
              </h6>
            </div>
          </Card>
        </StyledLink>
      </div>
    );
  }
}

export default PokemonCard;
