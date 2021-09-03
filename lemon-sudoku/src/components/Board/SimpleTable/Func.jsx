import React, { useState } from 'react'
import * as SUDOKU from '../../../constants/sudoku_constants'
import Cell from '../../Cell/Cell';
import './styles.css'

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
function SudokuBoard() {
    
    
    
    
    return (
        <div>
            
        </div>
    )
}

export default SudokuBoard
