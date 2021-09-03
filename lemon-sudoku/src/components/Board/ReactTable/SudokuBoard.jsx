import React, { useMemo }  from 'react'
import { useTable } from 'react-table'
import MOCK_DATA from './MOCK_DATA.JSON'
import { COLUMNS } from './columns'

import * as SUDOKU from '../../../constants/sudoku_constants'
import './styles.css'
// import Cell from '../../Cell/Cell';

export const SudokuBoard = () => {
    
    const columns = useMemo(() => COLUMNS, []);
    const data = useMemo(() => MOCK_DATA, []);


    const tableInstance = useTable({
        columns,
        data
    });

    const { 
        getTableProps, 
        getTableBodyProps, 
        headerGroups, 
        rows, 
        prepareRow,
    } = tableInstance;

    return (
        <table {...getTableProps()}>
            <thead>
                {headerGroups.map((headerGroup) => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map((column) => (
                            <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                        ))}
                    </tr>
                ))}
            </thead>
            <tbody {...getTableBodyProps()}>
                {rows.map((row) => {
                    prepareRow(row)
                    return (
                        <tr {...row.getRowProps()}>
                            {row.cells.map((cell) => {
                                return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                            })}
                            
                        </tr>
                    )
                })}
                
            </tbody>
        </table>

    )
}

export default SudokuBoard


// export class SudokuBoardGrid extends Component {
    
//     constructor(props){
//         super(props);
//         const cells_start = SUDOKU.LAYOUT_GRID;
//         cells_start.forEach((v, i, arr)=> {
//             arr[i] ={
//                 row: Math.floor(i / SUDOKU.N) + 1,
//                 col: (i % SUDOKU.N) + 1,
//                 box: SUDOKU.BOX_NUM[i],
//                 value: 0,
//                 index: i,
//             }
//         })

//         this.state = {
//             history: [{
//                 cells: cells_start,
//             }],
//             currentCells: cells_start.slice(),
//             moveNumber: 0,
//         };
        
//         this.handleChange = this.handleChange.bind(this);
//         console.log(`'Sudoku table from 'Board/Table/SudokuBoard.jsx'`);
//     };
    
    

//     handleChange(){
//         console.log(`board change`);
        
//         const history = this.state.history.slice(0, this.state.moveNumber + 1);
//         const current = history[history.length - 1];
//         const cells = current.cells.slice();
        
//         this.setState({
//             history: history.concat([{
//                 cells: cells
//             }]),
//             currentCells: cells,
//             moveNumber: history.length,
//         })
       
        
//     }

//     renderCell(curr){
//         let cell_key = `r${curr.row}c${curr.col}b${curr.box}`;
       
//         return(
//             <Cell key={cell_key} cell={curr}/>
//         );
//     }

//     renderRow(rowNumber){
//         const row_to_idx = (rowNumber, i) => parseInt((rowNumber * SUDOKU.N) + i);
//         return (
//             <tr>
//                 {this.renderCell(row_to_idx(rowNumber, 1))}
//                 {this.renderCell(row_to_idx(rowNumber, 2))}
//                 {this.renderCell(row_to_idx(rowNumber, 3))}
//                 {this.renderCell(row_to_idx(rowNumber, 4))}
//                 {this.renderCell(row_to_idx(rowNumber, 5))}
//                 {this.renderCell(row_to_idx(rowNumber, 6))}
//                 {this.renderCell(row_to_idx(rowNumber, 7))}
//                 {this.renderCell(row_to_idx(rowNumber, 8))}
//                 {this.renderCell(row_to_idx(rowNumber, 9))}
//             </tr>
            
//         );
//     }
    
//     render() {
//         return (
            
//                 <div className="sudoku-grid">
//                     {this.state.history[this.state.moveNumber].cells.map(i => this.renderCell(i))}
//                 </div>
            
//         )
//     }
// }

// export default SudokuBoard


