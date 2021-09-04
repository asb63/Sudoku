import React, { useState } from 'react'
import * as SUDOKU from '../../../constants/sudoku_constants'
import Cell from '../../Cell/Cell';
import './styles.css'


function SudokuBoard() {
    
    const [cells, setCells] = useState(SUDOKU.MOCK_DATA);
    const [moveNumber, setMoveNumber] = useState(0);
    
    return (
        <table className="sudoku-grid">
            <tbody>
                {}
            </tbody>
        </table>
    )
}

export default SudokuBoard
