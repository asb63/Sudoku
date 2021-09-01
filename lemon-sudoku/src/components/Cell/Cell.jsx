import React, { useState } from 'react'
import * as SUDOKU from '../../constants/sudoku_constants'

function Cell(cell) {
    
    const [candidates, setCandidates] = useState(SUDOKU.CANDIDATES_DEFAULT);
    const [value, setValue] = useState(cell.value);
    const [valid, setValid] = useState(cell.valid);

    
    function handleChange(v) {
        setValue(v);
    }

    return (
        <td 
            className="cell"
            idx={cell.idx}
            row={cell.row}
            col={cell.col}
            box={cell.box}
            id={cell.id}
        >
            <input 
                    size="1" 
                    maxLength="1" 
                    defaultValue={cell.value}
                    onChange={handleChange}
                    //onClick={handleClick}
                >
                </input> 
        </td>

    )
}

export default Cell


    /*handleClick(){
        console.log(`Clicked cell: ${this.props}`)
    }

    handleChange(event){
        console.log(`Cell ${this.props.idx} change ${event.target.value}`);

        this.setState({
            value: event.target.value,
            valid: true,
        })
    }*/

