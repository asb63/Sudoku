import React, { Component } from 'react'
import SudokuBoard from '../Board/SudokuBoard'
//import InfoPanel from '../InfoPanel/InfoPanel'
import './styles.css'

export class Game extends Component {
//<InfoPanel></InfoPanel>
    render() {
        return (
        <div className="game-container">
        <SudokuBoard ></SudokuBoard>
        
        </div>
        )
    }
}

export default Game
