import React, {Component} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSync } from '@fortawesome/free-solid-svg-icons'
import './App.css';

class Square extends React.Component {

  render() {
    let idnum = "id" + this.props.id;

    return (
      <button className="square" id={idnum}>
        {this.props.value}
      </button>
    );
  }
}

export class Board extends Component {
  
  constructor(props) {
      super(props);
      this.state = {
          cell: Array(81).fill(null),
          loading: true,
      }
  }

  renderSquare(i, id) {
    return <span key={id}><Square value={i} id={id} /></span>;
  }

  createLine(i) {
    let row = [];

    for (let j = 0; j < 9; j++) {

        row.push(this.renderSquare(this.state.cell[(i * 9) + j] + 1, (i * 9) + j));
    }

    return row
  }

  reload() {

    window.location.reload();
  }

  //
  // Request a sudoku array to the server.
  //
  componentDidMount() {
    fetch('/sudoku/board')
    .then(res => res.json())
    .then((data) => {
      this.setState({ cell: data, loading: false })
    })
    .catch(console.log)
  }

  render() {
    const { loading } = this.state;

    if (loading) {
      return (<div><FontAwesomeIcon icon={faSync} size="10x" spin /></div>)
    } 
    else {
      return (
        <div>
          <div className="board-row">
            {this.createLine(0)}
          </div>
          <div className="board-row">
            {this.createLine(1)}
          </div>
          <div className="board-row">
            {this.createLine(2)}
          </div>
          <div className="board-row">
            {this.createLine(3)}
          </div>
          <div className="board-row">
            {this.createLine(4)}
          </div>
          <div className="board-row">
            {this.createLine(5)}
          </div>
          <div className="board-row">
            {this.createLine(6)}
          </div>
          <div className="board-row">
            {this.createLine(7)}
          </div>
          <div className="board-row">
            {this.createLine(8)}
          </div>
          <br />
            <button onClick={this.reload}>Reload</button>&nbsp;
        </div>

      )
    }
  }
}

class App extends Component {

  render() {
    return (
        <div className="game">
          <div className="game-board">
            <Board />
          </div>
          <div className="game-info">
            <div>{/* status */}</div>
            <ol>{/* TODO */}</ol>
          </div>
        </div>
    );
  }
}

export default App;