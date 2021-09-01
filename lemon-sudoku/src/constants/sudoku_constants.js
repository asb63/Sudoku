/** Sudoku constants for use with src/components/
* {number} N                 Sudoku puzzle is an N x N matrix where N = 9.
* {number} TOTAL_CELLS       Number of cells in a standard puzzle TOTAL_CELLS = 81.
* {RegExp} GAME_STRING_REGEX RegExp to validate a game string.
* {object} IDX_OF_BOX        holds index for 3x3 box subgroups. `IDX_OF_BOX[1-9] returns a {number} array  `
*/

/**
 * Sudoku puzzle is a square matrix where `N = 9`. 
 */
export const N = 9;      

/**
 * Number of cells in a standard puzzle `81`     
 */
export const TOTAL_CELLS = 81;

/**
 * RegExp to validate a game string.
 */
export const GAME_STRING_REGEX = /[0-9]{81}/;

/**
 * holds index for 3x3 box subgroups. `IDX_OF_BOX[1-9] returns a {number} array`  
 */
export const IDX_OF_BOX = {
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
 * easy positional lookup for box number. 
 * BOX_NUM[cell_index] returns the box number for that cell_index
 */
export const BOX_NUM = [1, 1, 1, 2, 2, 2, 3, 3, 3,
                        1, 1, 1, 2, 2, 2, 3, 3, 3,
                        1, 1, 1, 2, 2, 2, 3, 3, 3,
                        4, 4, 4, 5, 5, 5, 6, 6, 6,
                        4, 4, 4, 5, 5, 5, 6, 6, 6,
                        4, 4, 4, 5, 5, 5, 6, 6, 6,
                        7, 7, 7, 8, 8, 8, 9, 9, 9,
                        7, 7, 7, 8, 8, 8, 9, 9, 9,
                        7, 7, 7, 8, 8, 8, 9, 9, 9]


export const LAYOUT_GRID = [0 , 1, 2, 3, 4, 5, 6, 7, 8,
                            9 ,10,11,12,13,14,15,16,17,
                            18,19,20,21,22,23,24,25,26,
                            27,28,29,30,31,32,33,34,35,
                            36,37,38,39,40,41,42,43,44,
                            45,46,47,48,49,50,51,52,53,
                            54,55,56,57,58,59,60,61,62,
                            63,64,65,66,67,68,69,70,71,
                            72,73,74,75,76,77,78,79,80]

// export const cell_info = (idx) = {
//     row: Math.floor(idx / Sudoku.N) + 1,
//     col: (idx % Sudoku.N) + 1,
//     box: BOX_NUM[idx],
// }