import React, { Component } from 'react'
import * as SUDOKU from '../../constants/sudoku_constants'
import Cell from '../Cell/Cell';


export class SudokuBoard extends Component {
    
    constructor(props){
        super(props);

        this.state = {
            history: [{
                cells: Array(SUDOKU.TOTAL_CELLS).fill(null),
            }],
            moveNumber: 0,
        };
        
        this.handleChange = this.handleChange.bind(this);
        
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
            moveNumber: history.length,
        })
       
        
    }

    renderCell(idx){
        let i = idx - 1
        let r = Math.floor(i / SUDOKU.N) + 1
        let c = (i % SUDOKU.TOTAL_CELLS) + 1
        

        return(
            <Cell
                value={0}//FIX ASAP
                idx={i}
                row={r}    //generate row number
                col={c}
                box={SUDOKU.BOX_NUM[i]}
                id={`r${r}c${c}`}
                
            />
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
            
                <table className="sudoku-grid">
                    
                    <tbody>
                        {this.renderRow(1)}
                        {this.renderRow(2)}
                        {this.renderRow(3)}
                        {this.renderRow(4)}
                        {this.renderRow(5)}
                        {this.renderRow(6)}
                        {this.renderRow(7)}
                        {this.renderRow(8)}
                        {this.renderRow(9)}
                    </tbody>
                </table>
            
        )
    }
}

export default SudokuBoard
