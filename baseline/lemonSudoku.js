/**
 * @author Andrew <lemoncs.ab@gmail.com>
 */


//The Sudoku class is a tool to handle all operations required in a sudoku game.
//  static properties:
//  N is the Length/Width of the sudoku board.
//  TOTAL_CELLS is N * N
//  CONTAINER_SUM is the sum of containers [1-9]{9}
//  TOTAL_SUM is N * CONTAINER_SUM
//  GAME_STRING_REGEX validates a new game string
//  IDX_OF_BOX is an ugly list of indexes that refer to each 3x3 sub-group labeled by keys 1-9



/**
*  @class Represents a Sudoku puzzle. Provides tools to help read/write/solve sudoku puzzles 
*
*  @property {number} N                 Sudoku puzzle is an N x N matrix where N = 9.
*  @property {number} TOTAL_CELLS       Number of cells in a standard puzzle TOTAL_CELLS = 81.
*  @property {number} CONTAINER_SUM     Sum of any complete collection of 9 elements (row, col, box).
*  @property {number} TOTAL_SUM         Sum of all complete containers in a finished sudoku puzzle.
*  @property {RegExp} GAME_STRING_REGEX RegExp to validate a game string.
*/
class Sudoku{

    /**
     * Construct a Sudoku object.
     * @param {string} puzzle_string 81 digit string representing a sudoku puzzle.
     */
    constructor(puzzle_string){
        this.puzzle_string = puzzle_string;     //Puzzle string
        this.puzzle_arr = [...puzzle_string];   //array version of game string.
        this.solution_arr = [...puzzle_string]; //Array for game solution.
        this.rows = [];
        this.columns = [];
        this.boxes = [];
        this.candidates = [];                   //candidates for all cells.
        this.mistakes = {
            'row': [],
            'col': [],
            'box': []
        };
       
        this.updateContainers()
    }

    /** Static properties
    *  @property {number} N                 Sudoku puzzle is an N x N matrix where N = 9.
    *  @property {number} TOTAL_CELLS       Number of cells in a standard puzzle TOTAL_CELLS = 81.
    *  @property {number} CONTAINER_SUM     Sum of any complete collection of 9 elements (row, col, box).
    *  @property {number} TOTAL_SUM         Sum of all complete containers in a finished sudoku puzzle.
    *  @property {RegExp} GAME_STRING_REGEX RegExp to validate a game string.
    */
    static N = 9;              
    static TOTAL_CELLS = 81;
    static CONTAINER_SUM = 45;
    static TOTAL_SUM = 405;
    static GAME_STRING_REGEX = /[0-9]{81}/;
    
    /**
     * holds index numbers for all the 3x3 subgroups in the puzzle.
     */
    static IDX_OF_BOX = {
        1: [0, 1, 2, 9, 10, 11, 18, 19, 20],
        2: [3, 4, 5, 12, 13, 14, 21, 22, 23],
        3: [6, 7, 8, 15, 16, 17, 24, 25, 26],
        4: [27, 28, 29, 36, 37, 38, 45, 46, 47],
        5: [30, 31, 32, 39, 40, 41, 48, 49, 50],
        6: [33, 34, 35, 42, 43, 44, 51, 52, 53],
        7: [54, 55, 56, 63, 64, 65, 72, 73, 74],
        8: [57, 58, 59, 66, 67, 68, 75, 76, 77],
        9: [60, 61, 62, 69, 70, 71, 78, 79, 80],
    }

    /**
     * Find mistakes in the puzzle string, push them to `this.mistakes`
     * @return {boolean}    returns mistakeFound boolean
     */
    findMistakes(){
        let mistakeFound = false;
        this.rows.forEach(row => {
            if(this.hasDuplicates([...row].filter(r => !r.includes('0')))){
                this.mistakes['row'][this.rows.indexOf(row)] = [...row];
                mistakeFound = true;
            }
        })

        this.columns.forEach(col => {
            if(this.hasDuplicates([...col].filter(c => !c.includes('0')))){
                this.mistakes['col'][this.columns.indexOf(col)] = [...col];
                mistakeFound = true;
            }
        })

        this.boxes.forEach(box => {
            if(this.hasDuplicates([...box].filter(b => !b.includes('0')))){
                this.mistakes['box'][this.boxes.indexOf(box)] = [...box];
                mistakeFound = true;
            }
        })
        return mistakeFound;
    }
    
    /**
     * Container has duplicates? Only false if container is already complete.
     * @param {Array} sudokuContainer any row/col/box array
     * @return {boolean} has duplicate? T/F.
     */
    hasDuplicates(sudokuContainer){
        return new Set(sudokuContainer).size !== sudokuContainer.length;
    }

    /**
     * @param {number} rowNumber Row number [1-9].
     * @return {string} 9 character string representing the row.
    */
    getRow(rowNumber){
        if(isNaN(rowNumber) || rowNumber > Sudoku.N || rowNumber < 1){
            return
        }else{
            return this.puzzle_string.slice((Sudoku.N * (rowNumber - 1)), Sudoku.N * rowNumber);
        }
    }

    /**
     * @param {number} colNumber Column number [1-9].
     * @return {string} 9 character representing the column.
     */
    getCol(colNumber){
        if(isNaN(colNumber) || colNumber > Sudoku.N || colNumber < 1){
            return
        }else{
            let result = []
            for(let i = colNumber - 1; i < Sudoku.TOTAL_CELLS; i+=Sudoku.N){
                result.push(this.puzzle_string.charAt(i));
            }
            return result.join('');
        }
    }

    /**
     * 
     * @param {number} cellIndex Index of cell in puzzle_string.
     * @return {string} Single character value of cell at index cellIndex.
     */
    getCellByIndex(cellIndex){
        if((cellIndex < Sudoku.TOTAL_CELLS) && (cellIndex >= 0))
            return this.puzzle_string.charAt(cellIndex);
    }

    /**
     * 
     * @param {number} rowNumber Row number [1-9].
     * @param {number} colNumber Column number [1-9].
     * @return {string} value of the cell found at puzzle_string[rowNumber][colNumber].
     */
    getCell(rowNumber, colNumber){
        return this.puzzle_string.charAt((Sudoku.N * (rowNumber - 1)) + (colNumber - 1));
    }

    /**
     * 
     * @param {number} boxNumber Box number [1-9].
     * @return {string} 9 character string representing the 3x3 box at boxNumber.
     */
    getBox(boxNumber){
        if(Sudoku.IDX_OF_BOX[boxNumber] == undefined) return;

        let result = [];

        Sudoku.IDX_OF_BOX[boxNumber].forEach(cell => {result.push(this.puzzle_string[cell])})
        return result.join('');
    }

    /**
     * Aggregate all data into the proper containers.
     * No return.
     */
    updateContainers(){
        this.puzzle_string = this.puzzle_arr.join('');

        for(let i = 1; i <= Sudoku.N; i++){
            this.rows[i] = this.getRow(i);
            this.columns[i] = this.getCol(i);
            this.boxes[i] = this.getBox(i);
        }
    }


    /**
     * Takes a "completed" game_string, and a mask string, returns an "incomplete" game_string.
     * @param {string} game_string 
     * @param {string} mask 
     * @returns an "incomplete" game_string which can be used to load a new puzzle.
     */
    static maskString(game_string, mask){
        if(game_string.length !== Sudoku.TOTAL_CELLS || mask.length !== Sudoku.TOTAL_CELLS){
            console.warn('invalid argument length. game_string and mask must be 81 digit string')
        }
        let result = [...game_string];
        let msk = [...mask];
        for(let i = 0; i < Sudoku.TOTAL_CELLS; i++){
            if(msk[i] === '1' || msk[i] === 1){
                result[i] = '0';
            }
        }
            return result.join('');
    }

    /**
     * get the indices for each cell in any particular sudoku container.
     * @param {string} cont     Type of sudoku container: `'row'` `'col'` `'box'`
     * @param {number} contNum  Number of container: `[1-9]`
     * @returns {Array} an array of all cell indices in that row, col, or box 
     */
    static indexOfContainer(cont, contNum){
        if(isNaN(contNum) || contNum < 1 || contNum > 9) {
            console.warn('Sudoku.indexOfContainer(cont: string, contNum: number) received invalid contNum\ncontNum: ' + contNum);
            return;
        }

        let idx_start, idx_end;
        let results = Array(Sudoku.N);
        switch(cont){
        case 'row':
            idx_start = (Sudoku.N * (contNum - 1));
            idx_end = ((Sudoku.N * contNum));
            for(let i = idx_start; i < idx_end; i++){
                results[i - idx_start] = i;
            }
            break;
        
        case 'col':
            idx_start = contNum-1;
            idx_end = Sudoku.TOTAL_CELLS - (Sudoku.N - contNum) - 1
            let step = Sudoku.N;
            let loopIteration = 0;
            for(let i = idx_start; i <= idx_end; i += step){
                results[loopIteration] = i;
                loopIteration++;
            }
            break;

        case 'box':
            return Sudoku.IDX_OF_BOX[contNum];
            break;

        default:
            console.warn('Sudoku.indexOfContainer(cont: string, contNum: number) received invalid container\ncont:' + cont);
            return;
            break;
        }

        return results;
    }
    
    /**
     * 
     * @param {number} cellIndex index of cell to find the containing box for. 
     * @return {number} The box number that holds the cell at cellIndex.
     */
    static getBoxNumber(cellIndex){
        for(const box in Sudoku.IDX_OF_BOX){
            if(Sudoku.IDX_OF_BOX[box].includes(cellIndex))
                return box;
        }
        return;
    }

    //#Source https://www.w3resource.com/javascript-exercises/fundamental/javascript-fundamental-exercise-70.php
    /**
     * 
     * @param {Array} arr   The array to count from
     * @param {number} val  The value to look for
     * @returns {number}     The number of times val occured in arr
     */
    static countOccurrences = (arr, val) => arr.reduce((a, v) => (v === val ? a + 1 : a), 0);

    /**
     * Change a cell in the puzzle_string.
     * @param   {number} cellIndex  cell index to change.
     * @param   {string} newValue   new value for cell.
     * @returns {boolean}           `false` if move is not made. `true` if move is made.
     */
    makeMove(cellIndex, newValue){
        if(isNaN(parseInt(cellIndex))) return false;
        if(newValue === '') newValue = '0';
        

        let val = parseInt(newValue);
        let idx = parseInt(cellIndex);

        if(val < 0 || val > Sudoku.N) return false;
        if(idx < 0 || idx >= Sudoku.TOTAL_CELLS) return false;
        
        if(`${val}` === this.solution_arr[cellIndex]){
            this.candidates[cellIndex] = undefined;
        }
        //update all containers to have current values.

        this.puzzle_arr[idx] = `${val}`;
        this.updateContainers(); //after changing a cell, update all containers
        return true;
    }

    


    /**
     * Returns `true` when puzzle is solved. `False` if the puzzle has mistakes or empty cells
     * @returns {boolean}
     */
    puzzleSolved(){
        this.findMistakes(); //Scan for mistakes to populate the mistake containers with current values
        let problemsFound = false; //return the opposite. If problems not found, puzzle is solved.

        
        for(let container in this.mistakes){
            if(this.mistakes[container].length > 0){
                problemsFound = true;
            }
        }
        //filter zeros out of puzzle_arr, if remaining size is the total number of cells, no cells are empty.
        if(this.puzzle_arr.filter(outZero => !outZero.includes('0')).length != Sudoku.TOTAL_CELLS){
            problemsFound = true;
            //console.log(`missing spaces\nlength of filtered array:${this.puzzle_arr.filter(outZero => !outZero.includes('0')).length}`);
        }
        
        return !problemsFound;
    }

    /**
     * Compute the candidates for each cell.
     * Updates this.candidates when a cell is solved.
     */
    findCandidates(){
        const required = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        for(let idx = 0; idx < Sudoku.TOTAL_CELLS; idx++){
            if(parseInt(this.solution_arr[idx]) > 0)
            {
                if(this.puzzle_arr[idx] === this.solution_arr[idx]){
                    this.candidates[idx] = undefined//this.puzzle_arr[idx];
                    continue;
                }
            }

            let tempContainer = {box:[], row:[], col:[], candidates:[]};
            
            //gather all neighbors for current cell.
            tempContainer.box = [...this.getBox(Sudoku.getBoxNumber(idx))].filter(arr => !arr.includes('0'));
            tempContainer.row = [...this.getRow(Math.floor(idx / Sudoku.N) + 1)].filter(arr => !arr.includes('0'));
            tempContainer.col = [...this.getCol((idx % Sudoku.N) + 1)].filter(arr => !arr.includes('0'));
            
            //if cell.neighbors don't have a number, that number is a candidate for cell.
            for(let val in required){
                if(!tempContainer.box.includes(`${required[val]}`.trim()) 
                && !tempContainer.row.includes(`${required[val]}`.trim())
                && !tempContainer.col.includes(`${required[val]}`.trim())){
                    //if all containers are missing a value, that is a candidate.
                    //console.log(`val ${val}\nrequired[val] ${required[val]}\nbox: ${tempContainer.box} \nrow: ${tempContainer.row}\ncol ${tempContainer.col}`);
                    tempContainer.candidates.push(required[val]);
                }
            }
            this.candidates[idx] = [...tempContainer.candidates];
            if(parseInt(this.puzzle_arr[idx]) > 0){
                this.candidates[idx].push(this.puzzle_arr[idx]);
            }
        }

    }

    /**
     * find candidates by sudoku container to assist in finding singles/pairs/trio/quads
     * @param {string} cont     Type of sudoku container: `'row'` `'col'` `'box'`
     * @param {number} contNum  Number of container: `[1-9]`
     * @returns {Array} an array of all candidates in that row, col, or box 
     */
    candidatesInContainer(cont, contNum){
        //before doing any work, make sure container number is valid. Number [1-9]
        if(isNaN(contNum) || contNum < 1 || contNum > 9) {
            console.warn('Sudoku.candidatesInContainer(cont: string, contNum: number) received invalid contNum\ncontNum: ' + contNum);
            return;
        }
        let results = [];
        let idx_start, idx_end;
        switch (cont) {
            case 'row':
                idx_start = (Sudoku.N * (contNum - 1));
                idx_end = ((Sudoku.N * contNum));
                results = this.candidates.slice(idx_start, idx_end);
                break;
            
            case 'col':
                idx_start = contNum-1;
                idx_end = Sudoku.TOTAL_CELLS - (Sudoku.N - contNum) - 1
                let step = Sudoku.N;
                for(let i = idx_start; i <= idx_end; i += step){
                    results.push(this.candidates[i]);
                }
                break;

            case 'box':
                for(let cell in Sudoku.IDX_OF_BOX[contNum]){
                    results.push(this.candidates[Sudoku.IDX_OF_BOX[contNum][cell]]);
                }
                break;

            default:
                console.warn('Sudoku.candidatesInContainer(cont: string, contNum: number) received invalid container\ncont:' + cont);
                return;
                break;
        }

        return results;
    }

    findSingles(){
        this.findCandidates();
        let rowCounts = {1:[], 2:[], 3:[], 4:[], 5:[], 6:[], 7:[], 8:[], 9:[]};
        let colCounts = {1:[], 2:[], 3:[], 4:[], 5:[], 6:[], 7:[], 8:[], 9:[]};
        let boxCounts = {1:[], 2:[], 3:[], 4:[], 5:[], 6:[], 7:[], 8:[], 9:[]};
        let hiddenSingles = [];


        //The first technique is simple. Just find a cell with only one candidate.
        //This is called a 'naked single'
        for(let i = 0; i < Sudoku.TOTAL_CELLS; i++){
            if(this.candidates[i] !== undefined && this.candidates[i].length === 1){
                //if there is exactly 1 candidate, that must be the answer.
                this.solution_arr[i] = `${this.candidates[i]}`;
                console.log(`Naked Single\nCell: ${i}\nBox: ${Sudoku.getBoxNumber(i)}\nCandidate(s): ${this.candidates[i]}`)
            }
        }

        //The second technique is slightly more complicated.
        //In any collection, if a candidate appears in only one cell, it must belong there.
        //This is called a 'hidden single'
        //Count all the candidates in each container, if any candidate has count of 1, its a hidden single
        for(let contNum = 1; contNum <= Sudoku.N; contNum++){
            for(let val = 1; val <= Sudoku.N; val++){
                rowCounts[contNum].push(Sudoku.countOccurrences(this.candidatesInContainer('row', contNum).flat(), val));
                colCounts[contNum].push(Sudoku.countOccurrences(this.candidatesInContainer('col', contNum).flat(), val));
                boxCounts[contNum].push(Sudoku.countOccurrences(this.candidatesInContainer('box', contNum).flat(), val));
            }
        }


        for(let contNum = 1; contNum <= Sudoku.N; contNum++){
            for(let val = 1; val <= Sudoku.N; val++){
                if(rowCounts[contNum][val-1] === 1){
                    // console.log(`Hidden single\nRow: ${contNum}\nVal: ${val}`);
                    hiddenSingles.push([`row`, contNum, val]);
                }
                if(colCounts[contNum][val-1] === 1){
                    // console.log(`Hidden single\nCol: ${contNum}\nVal: ${val}`);
                    hiddenSingles.push([`col`, contNum, val]);
                }
                if(boxCounts[contNum][val-1] === 1){
                    // console.log(`Hidden single\nBox: ${contNum}\nVal: ${val}`);
                    hiddenSingles.push([`box`, contNum, val]);
                }
            }
        }
                
        //now we know all hidden singles at this time.
        //We need to find the matching candidate, add it to solution_arr
        hiddenSingles.forEach(hs => {
            let idx_list = Sudoku.indexOfContainer(hs[0], hs[1]);
            for(let idx in idx_list){
                if(this.candidates[idx_list[idx]] && this.candidates[idx_list[idx]].includes(hs[2])){
                    this.solution_arr[idx_list[idx]] = `${hs[2]}`;
                    console.log('handled hs: ', hs );
                }
            }
        })

        
    }

    /**
     * Looks for naked and hidden pairs in the puzzle candidates. DOES NOTHING YET
     */
    findPairs(){
        let rowCounts = {1:[], 2:[], 3:[], 4:[], 5:[], 6:[], 7:[], 8:[], 9:[]};
        let colCounts = {1:[], 2:[], 3:[], 4:[], 5:[], 6:[], 7:[], 8:[], 9:[]};
        let boxCounts = {1:[], 2:[], 3:[], 4:[], 5:[], 6:[], 7:[], 8:[], 9:[]};
        let pairs = [];
        let rowCandi = [];
        let colCandi = [];
        let boxCandi = [];


        for(let contNum = 1; contNum <= Sudoku.N; contNum++){
            
            rowCandi.push(this.candidatesInContainer('row', contNum));
            colCandi.push(this.candidatesInContainer('col', contNum));
            boxCandi.push(this.candidatesInContainer('box', contNum));
            
             
        }

        console.log('row candidates', rowCandi);
        console.log('col candidates', colCandi);
        console.log('box candidates', boxCandi);

        console.log('Pairs ' , pairs);
    }

    /**
     * This is the function responsible for solving a puzzle. Populates this.solution_arr
     * @returns {boolean}   `True/False` if solution found.
     */
    computeSolution(){
        //Multiple techniques will be necessary for most puzzles.
        //this.findCandidates();
        let isSolved = this.puzzleSolved();
        this.findSingles();
        this.findPairs();

        for(let j = 0; j < Sudoku.TOTAL_CELLS; j++){
            if(this.candidates[j] !== undefined) return false;
        }
        if(this.solution_arr.length === Sudoku.TOTAL_CELLS){
            
            if(this.mistakes.rows && this.mistakes.rows.flat().length > 0) return false;
        }

        if(this.puzzle_arr === this.solution_arr){
            isSolved = true;
        }
        return isSolved;
    }


}

/*
 * START OF PROGRAM
 * DECLARATIONS
 */
const sample_game = '103604709020090010700000006204030908000000000500907001600050002000070000900802005';
const DEBUG_SOLUTION = '183624759426795813795318426274531968319286547568947231637459182852173694941862375';
const cellInput = document.querySelectorAll('[data-cell-input]');   //<input> tag within <td>
const cellTD = document.querySelectorAll('[data-cell]');            //<td> tag within <table>
const answerButtons = document.querySelectorAll('[data-answer-button]'); //<button> within sudoku-frame
const sudokuGrid = document.querySelector('[data-sudoku-grid]');    //<table> tag
const sudokuCellsTD = document.getElementsByClassName('cell');      
const sudokuCellsInput = document.getElementsByTagName('input');
let sudoku_game = [];   //array of {number} to represent a sudoku puzzle 
let game_string;        //sudoku puzzle as string in pattern [0-9]{81}

const HELP_MSG = `HELP \n 'H' - Help\n 'R' - Reset \n 'S' - Look for solution. \n 'N' - New game (from string) \n 'G' - Show current game string\n 'D' - Deselect all cells\n 'C' - Cheat :) `
localStorage.setItem('sample_game', sample_game);

/*
 * LOAD GAME FROM LOCAL
 */

if(localStorage.getItem('new_game')){
    console.log('Found New Game')
    game_string = localStorage.getItem('new_game');
}
else{
    game_string = localStorage.getItem('sample_game');
}

sudoku_game = [...game_string];
let gameObj = new Sudoku(game_string);

//Write the game to the DOM
for(let i = 0; i < Sudoku.TOTAL_CELLS; i++){

    //make given input readonly, and add given to classList
    if(parseInt(sudoku_game[i]) > 0){
        cellInput.item(i).setAttribute('readonly', true);
        cellInput.item(i).parentElement.classList.add('given');
    }
    //Place value into correct cell <input>, '0' from game string is an empty cell
    cellInput.item(i).setAttribute('value', `${parseInt(sudoku_game[i]) > 0 ? sudoku_game[i] : ''}`);
}

gameObj.computeSolution();

/**
 * ADD EVENT LISTENERS
 */

//Handle keyboard input
document.body.addEventListener('keyup', checkKey);


//make cells 'clickable' and log the click. Delete logging when done
cellTD.forEach(cell => {
    cell.addEventListener('click', () => {
        console.log(`Clicked        : ${cell.id}`,
                    `\nValue          : ${cell.firstElementChild.value}`,
                    `\nCandidate      : ${gameObj.candidates[idToIndex(cell.id)]}`,
                    `\nidToIndex(${cell.id}): ${idToIndex(cell.id)}`,
                    `\nBox            : ${Sudoku.getBoxNumber(idToIndex(cell.id))}`,);
        //if the cell was already given, just highlight the others with that value. if not, show neighbors.
        cell.classList.contains('given') 
        ? selectAllWithValue(cellTD, cell.firstElementChild.value) 
        : selectCellNeighbors(cellTD, cell.id);
    })
})

//make buttons do something on click. 
answerButtons.forEach(button => {
    button.addEventListener('click', () =>{
        selectAllWithValue(cellTD, button.innerHTML); //select all cells with same value as button
    })
})

//provide input validation on cells. 
cellInput.forEach(cell => {
    cell.addEventListener('input', () =>{
        if(cell.checkValidity()){
            cell.classList.remove('wrong');
        }else{
            cell.classList.add('wrong');
        }
        
        if(gameObj.makeMove(idToIndex(cell.parentElement.getAttribute('id')), cell.value)){
            console.log(`Made a move`);
        }else{
            console.log(`Failed to make move`);
            cell.classList.add('wrong');
        }
        
        if(cell.value === ''){
            cell.classList.remove('wrong')
        }

        if(gameObj.findMistakes()){
            cell.classList.add('wrong');
        }else{
            cell.classList.remove('wrong');
        }
        if(gameObj){
            gameObj.findCandidates();
        }
    })
})






/**
* FUNCTION DEFINITIONS
*/

/**
 * Input handler for the html body
 * @param {KeyboardEvent} event_key Keyboard event 
 */
function checkKey(event_key){  
    if(event_key.code.startsWith('Numpad') || event_key.code.startsWith('Digit')){
        let numString = event_key.code.slice(-1); 
        
        if(!isNaN(parseInt(numString))){
            selectAllWithValue(cellTD, numString);
            return; 
        }
    }
    if(event_key.code.startsWith('Key')){
        let letter = event_key.code.slice(-1);
        switch (letter) {
            case 'H':
                alert(HELP_MSG);
                return;
        
            case 'G':
                alert(gameObj.puzzle_string);
                return;
            
            case 'C':
                localStorage.setItem('new_game', gameObj.solution_arr.join('').match(Sudoku.GAME_STRING_REGEX));
                window.location.reload()
                return;

            case 'N':
                newGame();
                return;

            case 'D':
                deselectAll(cellTD);
                return; 

            case 'R':
               // alert('RESET NOT IMPLEMENTED');
                if(localStorage.getItem('new_game_og')){
                    localStorage.setItem('new_game', localStorage.getItem('new_game_og'));

                    window.location.reload();
                }
                else{
                    localStorage.clear()
                    window.location.reload();
                }
                
                return;

            case 'S':
                if(gameObj.computeSolution()){
                    alert(`Found a solution.`);
                }
                return;

            default:
                //console.warn(`Unhandled 'Key' ${this.letter}`);
                return;
        }
    }
    
    //console.warn(`Unhandled key.code: ${event_key.code}`);
}

/**
 * remove the 'sel' css class from all cells.
 * @param {NodeListOf<Element>} cells td tags from DOM.
 */
const deselectAll = (cells) => {
    cells.forEach(cell => {
        while(cell.classList.contains('sel')) //while loop to ensure duplicates dont stick.
            cell.classList.remove('sel');
    });
}


/**
 * select all of a cell's neighbors (rows column box).
 * @param {NodeListOf<Element>} cells       td tags from DOM.
 * @param {string}              idString    id for the target cell.
 * @calls selectCellBox()
 */
const selectCellNeighbors = (cells, idString) =>{
    deselectAll(cells);
    this.boxNum = Sudoku.getBoxNumber(idToIndex(idString));
    this.rowNum = idString.slice(0,2);
    this.colNum = idString.slice(2);
    cells.forEach(cell =>{
        if(cell.id.startsWith(this.rowNum) || cell.id.endsWith(this.colNum)){
            cell.classList.add('sel');
        }
    })

    selectCellBox(cells, this.boxNum);
}

/**
 * select all of a cell's neighbors (rows column box)
 * @param {NodeListOf<Element>} cells       td tags from DOM.
 * @param {number}              boxNum      3x3 box number to select. 
 *
 */
const selectCellBox = (cells, boxNum) => {
    this.boxNum = boxNum;
    cells.forEach(cell => {
        if(this.boxNum == Sudoku.getBoxNumber(idToIndex(cell.id))){
            cell.classList.add('sel');
        }
    })
}

/**
 * select all cells which match the value from `valueString`
 * @param {NodeListOf<Element>} cells       td tags from DOM.
 * @param {string}              valueString A single numeric character `[1-9]`.
 *
 */
const selectAllWithValue = (cells, valueString) => {
    deselectAll(cells);
    if(parseInt(valueString) >= 1 && parseInt(valueString) <= 9){
        cells.forEach(cell =>{
            if(cell.firstElementChild.value == valueString){
                cell.classList.add('sel');
            }
        })
    }
}

/**
 * Converts from string format `'r[1-9]c[1-9]'` to index `[N*i + j]`.
 * @param   {string} idString   id attribute from td element.
 * @returns {number}            index number `[0 - 80]`
 */
const idToIndex = (idString) => {
    if(idString.length != 4) return;    //return if idString is incorrect format. 

    //convert human-readable index to true index
    this.rowNum = parseInt(idString.slice(1,2)) - 1;
    this.colNum = parseInt(idString.slice(3)) - 1;
    return (Sudoku.N * this.rowNum + this.colNum); 
}

/**
 * Converts from index format `[N*i + j]` to string `'r[1-9]c[1-9]'`.
 * @param   {number}    idx    cell index number `[0-80]`.
 * @returns {string}           string matching `'r[1-9]c[1-9]'` format
 */
const indexToID = (idx) => {
    this.idx = parseInt(idx);
    
    if(this.idx < 0 || this.idx >= Sudoku.TOTAL_CELLS) return;
    
    this.colNum = (this.idx % Sudoku.N) + 1;
    this.rowNum = Math.floor(i / Sudoku.N) + 1;

    return `r${this.rowNum}c${this.colNum}`;
}

/**
 * prompts user for new game string and validates against the regex provided by Class Sudoku
 * Starts new game if valid
 */
const newGame = () => {
    let newGameString = prompt(`Enter new game string`);
    
    //prevent TypeError if user closes prompt with 'Escape'
    if(newGameString === null) return;  

    if(newGameString.length > Sudoku.TOTAL_CELLS){
        alert(`Game string too long`);
        return;
    }
    if(newGameString.length < Sudoku.TOTAL_CELLS){
        alert(`Game string too short\nTip '0' is used to represent an empty cell`);
        return;
    }
    if(newGameString.match(Sudoku.GAME_STRING_REGEX) != null)
    {
        localStorage.setItem('new_game', newGameString);
        localStorage.setItem('new_game_og', newGameString);
        window.location.reload();
        
    }
    else{
        alert(`Invalid game string.\nMust be 81 characters [0-9] with no spaces`);
    }

    return;
}

const loadGame = (validGameString) => {
    for(let i = 0; i < Sudoku.TOTAL_CELLS; i++){
        if(parseInt(validGameString.charAt(i)) > 0){
            cellInput.item(i).setAttribute('readonly', true);
            cellInput.item(i).parentElement.classList.add('given');
            cellInput.item(i).setAttribute('value', `${validGameString.charAt(i)}`);
        }
    }
}