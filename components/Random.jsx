import React from 'react';

class Random extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: {
        id: 0,
        height: 0,
        weight: 0,
        moves: [],
        abilities: [],
        species: {
          name: ''
        }
      },
      loading: false,
      ids: Array.from({length: 151}, (_, i) => i + 1),
      total: 0
    }
  }


  _selectRandomPokemon = () => {
    
    this.setState({
      ...this.state,
      loading: true
    })

    let selected = this.state.ids[Math.floor(Math.random() * this.state.ids.length)];

    let random = fetch(`https://pokeapi.co/api/v2/pokemon/${selected}`)
      .then(res => res.json())
      .then((r) => {
        this.setState({
          selected: r,
          total: this.state.total + 1,
          loading: false
        })
      });

  }

  componentdidMount() {
    this._selectRandomPokemon;
  }

  render() {
    let moves = []
    if (this.state.selected.moves) {
      moves = this.state.selected.moves.map((move) => {
        return <li key={move.move.name}>{move.move.name}</li>
      })
    }

    let abilities = []
    if (this.state.selected.abilities) {
      abilities = this.state.selected.abilities.map((ability) => {
        return <li key={ability.ability.name}>{ability.ability.name}</li>
      })
    }
    return (
      <>
        <h1>Random Pokemon ({this.state.total} Discovered)</h1>
        <button onClick={this._selectRandomPokemon}>{this.state.loading ? 'Loading' : 'Find New Pokemon'}</button>
        <h2>{this.state.selected.species.name}</h2>
        <h3>Metadata</h3>
        <ul>
          <li>ID: {this.state.selected.id}</li>
          <li>Height: {this.state.selected.height}</li>
          <li>Weight: {this.state.selected.weight}</li>
        </ul>
        <h3>Moves</h3>
        <ul>
          {moves}
        </ul>
        <h3>Abilities</h3>
        <ul>
          {abilities}
        </ul>
      </>
    )
  }
}

export default Random;