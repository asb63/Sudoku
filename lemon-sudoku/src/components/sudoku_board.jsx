import React, { Component } from 'react'
import * as SUDOKU from '../constants/sudoku_constants'


//Constants declared in /src/constants
// const SUDOKU = {
//     N: 9,
//     TOTAL_CELLS: 81,
//     GAME_STRING_REGEX: /[0-9]{81}/,
//     IDX_OF_BOX: {
//         1: [0, 1, 2, 9, 10, 11, 18, 19, 20],
//         2: [3, 4, 5, 12, 13, 14, 21, 22, 23],
//         3: [6, 7, 8, 15, 16, 17, 24, 25, 26],
//         4: [27, 28, 29, 36, 37, 38, 45, 46, 47],
//         5: [30, 31, 32, 39, 40, 41, 48, 49, 50],
//         6: [33, 34, 35, 42, 43, 44, 51, 52, 53],
//         7: [54, 55, 56, 63, 64, 65, 72, 73, 74],
//         8: [57, 58, 59, 66, 67, 68, 75, 76, 77],
//         9: [60, 61, 62, 69, 70, 71, 78, 79, 80],
//     },
//     BOX_NUM:   [1, 1, 1, 2, 2, 2, 3, 3, 3,
//                 1, 1, 1, 2, 2, 2, 3, 3, 3,
//                 1, 1, 1, 2, 2, 2, 3, 3, 3,
//                 4, 4, 4, 5, 5, 5, 6, 6, 6,
//                 4, 4, 4, 5, 5, 5, 6, 6, 6,
//                 4, 4, 4, 5, 5, 5, 6, 6, 6,
//                 7, 7, 7, 8, 8, 8, 9, 9, 9,
//                 7, 7, 7, 8, 8, 8, 9, 9, 9,
//                 7, 7, 7, 8, 8, 8, 9, 9, 9]

// };

// const cell_data = (idx) => ({
//     idx: idx,
//     row: Math.floor(idx / SUDOKU.N) + 1,
//     col: (idx % SUDOKU.N) + 1,
//     box: SUDOKU.BOX_NUM[idx],
//     id: `r${row}c${col}`
// })

function Cell(props){
    return (
        <button 
            className="cell" 
            idx={props.idx}
            row={props.row}
            col={props.col}
            box={props.box}
            id={props.id}
        >
            
                {props.value}
        </button>
    );
}

export class Sudoku_board extends Component {
    

    renderCell(idx){
        let r = Math.floor(idx / SUDOKU.N) + 1
        let c = (idx % SUDOKU.TOTAL_CELLS) + 1
        
        return(
            <Cell
                value={idx}//FIX ASAP
                idx={idx}
                row={r}    //generate row number
                col={c}
                box={SUDOKU.BOX_NUM[idx]}
                id={`r${r}c${c}`}
            />
        );
    }

    renderRow(rowNumber){
        const row_to_idx = (rowNumber, i) => parseInt((rowNumber) * i);
        return (
            <div className="row" id={rowNumber}>
                {this.renderCell(row_to_idx(rowNumber, 1))}
                {this.renderCell(row_to_idx(rowNumber, 2))}
                {this.renderCell(row_to_idx(rowNumber, 3))}
                {this.renderCell(row_to_idx(rowNumber, 4))}
                {this.renderCell(row_to_idx(rowNumber, 5))}
                {this.renderCell(row_to_idx(rowNumber, 6))}
                {this.renderCell(row_to_idx(rowNumber, 7))}
                {this.renderCell(row_to_idx(rowNumber, 8))}
                {this.renderCell(row_to_idx(rowNumber, 9))}
            </div>
        );
    }
    
    render() {
        return (
            <div className="sudoku-grid">
                {this.renderRow(1)}
                {this.renderRow(2)}
                {this.renderRow(3)}
                {this.renderRow(4)}
                {this.renderRow(5)}
                {this.renderRow(6)}
                {this.renderRow(7)}
                {this.renderRow(8)}
                {this.renderRow(9)}
            </div>
        )
    }
}

export default Sudoku_board
