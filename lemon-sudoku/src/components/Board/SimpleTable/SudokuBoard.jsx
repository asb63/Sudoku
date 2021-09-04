import React, { Component } from 'react'
import * as SUDOKU from '../../../constants/sudoku_constants'
import Cell from '../../Cell/TableCell/Cell';
import './styles.css'


export class SudokuBoard extends Component {
    
    constructor(props){
        super(props);
        const cells_start = SUDOKU.LAYOUT_GRID;
        cells_start.forEach((v, i, arr)=> {
            arr[i] ={
                row: Math.floor(i / SUDOKU.N) + 1,
                col: (i % SUDOKU.N) + 1,
                box: SUDOKU.BOX_NUM[i],
                value: 0,
                index: i,
            }
        })

        this.state = {
            history: [{
                cells: cells_start,
            }],
            currentCells: cells_start.slice(),
            moveNumber: 0,
        };
        
        this.handleChange = this.handleChange.bind(this);
        console.log(`'Sudoku grid from 'Board/SimpleTable/SudokuBoard.jsx'`);
        
    };
    
    

    handleChange(){
        console.log(`board change`);
        
        const history = this.state.history.slice(0, this.state.moveNumber + 1);
        const current = history[history.length - 1];
        const cells = current.cells.slice();
        
        this.setState({
            history: history.concat([{
                cells: cells
            }]),
            currentCells: cells,
            moveNumber: history.length,
        })
       
        
    }

    renderCell(curr){
        let cell_key = `r${curr.row}c${curr.col}b${curr.box}`;
       
        return(
            <Cell key={cell_key} cell={curr}/>
        );
    }

    renderRow(rowNumber){
        const row_to_idx = (rowNumber, i) => parseInt((rowNumber * SUDOKU.N) + i);
        return (
            <tr>
                {this.renderCell(row_to_idx(rowNumber, 1))}
                {this.renderCell(row_to_idx(rowNumber, 2))}
                {this.renderCell(row_to_idx(rowNumber, 3))}
                {this.renderCell(row_to_idx(rowNumber, 4))}
                {this.renderCell(row_to_idx(rowNumber, 5))}
                {this.renderCell(row_to_idx(rowNumber, 6))}
                {this.renderCell(row_to_idx(rowNumber, 7))}
                {this.renderCell(row_to_idx(rowNumber, 8))}
                {this.renderCell(row_to_idx(rowNumber, 9))}
            </tr>
            
        );
    }
    
    render() {
        return (
            
                <div className="sudoku-grid">
                    {this.state.history[this.state.moveNumber].cells.map(i => this.renderCell(i))}
                </div>
            
        )
    }
}

export default SudokuBoard
