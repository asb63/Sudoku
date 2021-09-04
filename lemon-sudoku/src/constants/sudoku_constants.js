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
 * Array of default candidates for an empty board. These are eliminated to find an answer for a cell.
 *  `[1, 2, 3, 4, 5, 6, 7, 8, 9]`
 */
export const CANDIDATES_DEFAULT = [1, 2, 3, 4, 5, 6, 7, 8, 9];

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

/**
 * JSON Data for empty sudoku puzzle. Each element is a cell with correct index and value: 0
 * 
 * This may be useful for contructing a table before generating a puzzle.
 */
export const MOCK_DATA = {
    r1_c1_b1:{"row":1,"col":1,"box":1,"value":0,"index":0},
    r1_c2_b1:{"row":1,"col":2,"box":1,"value":0,"index":1},
    r1_c3_b1:{"row":1,"col":3,"box":1,"value":0,"index":2},
    r1_c4_b2:{"row":1,"col":4,"box":2,"value":0,"index":3},
    r1_c5_b2:{"row":1,"col":5,"box":2,"value":0,"index":4},
    r1_c6_b2:{"row":1,"col":6,"box":2,"value":0,"index":5},
    r1_c7_b3:{"row":1,"col":7,"box":3,"value":0,"index":6},
    r1_c8_b3:{"row":1,"col":8,"box":3,"value":0,"index":7},
    r1_c9_b3:{"row":1,"col":9,"box":3,"value":0,"index":8},
    r2_c1_b1:{"row":2,"col":1,"box":1,"value":0,"index":9},
    r2_c2_b1:{"row":2,"col":2,"box":1,"value":0,"index":10},
    r2_c3_b1:{"row":2,"col":3,"box":1,"value":0,"index":11},
    r2_c4_b2:{"row":2,"col":4,"box":2,"value":0,"index":12},
    r2_c5_b2:{"row":2,"col":5,"box":2,"value":0,"index":13},
    r2_c6_b2:{"row":2,"col":6,"box":2,"value":0,"index":14},
    r2_c7_b3:{"row":2,"col":7,"box":3,"value":0,"index":15},
    r2_c8_b3:{"row":2,"col":8,"box":3,"value":0,"index":16},
    r2_c9_b3:{"row":2,"col":9,"box":3,"value":0,"index":17},
    r3_c1_b1:{"row":3,"col":1,"box":1,"value":0,"index":18},
    r3_c2_b1:{"row":3,"col":2,"box":1,"value":0,"index":19},
    r3_c3_b1:{"row":3,"col":3,"box":1,"value":0,"index":20},
    r3_c4_b2:{"row":3,"col":4,"box":2,"value":0,"index":21},
    r3_c5_b2:{"row":3,"col":5,"box":2,"value":0,"index":22},
    r3_c6_b2:{"row":3,"col":6,"box":2,"value":0,"index":23},
    r3_c7_b3:{"row":3,"col":7,"box":3,"value":0,"index":24},
    r3_c8_b3:{"row":3,"col":8,"box":3,"value":0,"index":25},
    r3_c9_b3:{"row":3,"col":9,"box":3,"value":0,"index":26},
    r4_c1_b4:{"row":4,"col":1,"box":4,"value":0,"index":27},
    r4_c2_b4:{"row":4,"col":2,"box":4,"value":0,"index":28},
    r4_c3_b4:{"row":4,"col":3,"box":4,"value":0,"index":29},
    r4_c4_b5:{"row":4,"col":4,"box":5,"value":0,"index":30},
    r4_c5_b5:{"row":4,"col":5,"box":5,"value":0,"index":31},
    r4_c6_b5:{"row":4,"col":6,"box":5,"value":0,"index":32},
    r4_c7_b6:{"row":4,"col":7,"box":6,"value":0,"index":33},
    r4_c8_b6:{"row":4,"col":8,"box":6,"value":0,"index":34},
    r4_c9_b6:{"row":4,"col":9,"box":6,"value":0,"index":35},
    r5_c1_b4:{"row":5,"col":1,"box":4,"value":0,"index":36},
    r5_c2_b4:{"row":5,"col":2,"box":4,"value":0,"index":37},
    r5_c3_b4:{"row":5,"col":3,"box":4,"value":0,"index":38},
    r5_c4_b5:{"row":5,"col":4,"box":5,"value":0,"index":39},
    r5_c5_b5:{"row":5,"col":5,"box":5,"value":0,"index":40},
    r5_c6_b5:{"row":5,"col":6,"box":5,"value":0,"index":41},
    r5_c7_b6:{"row":5,"col":7,"box":6,"value":0,"index":42},
    r5_c8_b6:{"row":5,"col":8,"box":6,"value":0,"index":43},
    r5_c9_b6:{"row":5,"col":9,"box":6,"value":0,"index":44},
    r6_c1_b4:{"row":6,"col":1,"box":4,"value":0,"index":45},
    r6_c2_b4:{"row":6,"col":2,"box":4,"value":0,"index":46},
    r6_c3_b4:{"row":6,"col":3,"box":4,"value":0,"index":47},
    r6_c4_b5:{"row":6,"col":4,"box":5,"value":0,"index":48},
    r6_c5_b5:{"row":6,"col":5,"box":5,"value":0,"index":49},
    r6_c6_b5:{"row":6,"col":6,"box":5,"value":0,"index":50},
    r6_c7_b6:{"row":6,"col":7,"box":6,"value":0,"index":51},
    r6_c8_b6:{"row":6,"col":8,"box":6,"value":0,"index":52},
    r6_c9_b6:{"row":6,"col":9,"box":6,"value":0,"index":53},
    r7_c1_b7:{"row":7,"col":1,"box":7,"value":0,"index":54},
    r7_c2_b7:{"row":7,"col":2,"box":7,"value":0,"index":55},
    r7_c3_b7:{"row":7,"col":3,"box":7,"value":0,"index":56},
    r7_c4_b8:{"row":7,"col":4,"box":8,"value":0,"index":57},
    r7_c5_b8:{"row":7,"col":5,"box":8,"value":0,"index":58},
    r7_c6_b8:{"row":7,"col":6,"box":8,"value":0,"index":59},
    r7_c7_b9:{"row":7,"col":7,"box":9,"value":0,"index":60},
    r7_c8_b9:{"row":7,"col":8,"box":9,"value":0,"index":61},
    r7_c9_b9:{"row":7,"col":9,"box":9,"value":0,"index":62},
    r8_c1_b7:{"row":8,"col":1,"box":7,"value":0,"index":63},
    r8_c2_b7:{"row":8,"col":2,"box":7,"value":0,"index":64},
    r8_c3_b7:{"row":8,"col":3,"box":7,"value":0,"index":65},
    r8_c4_b8:{"row":8,"col":4,"box":8,"value":0,"index":66},
    r8_c5_b8:{"row":8,"col":5,"box":8,"value":0,"index":67},
    r8_c6_b8:{"row":8,"col":6,"box":8,"value":0,"index":68},
    r8_c7_b9:{"row":8,"col":7,"box":9,"value":0,"index":69},
    r8_c8_b9:{"row":8,"col":8,"box":9,"value":0,"index":70},
    r8_c9_b9:{"row":8,"col":9,"box":9,"value":0,"index":71},
    r9_c1_b7:{"row":9,"col":1,"box":7,"value":0,"index":72},
    r9_c2_b7:{"row":9,"col":2,"box":7,"value":0,"index":73},
    r9_c3_b7:{"row":9,"col":3,"box":7,"value":0,"index":74},
    r9_c4_b8:{"row":9,"col":4,"box":8,"value":0,"index":75},
    r9_c5_b8:{"row":9,"col":5,"box":8,"value":0,"index":76},
    r9_c6_b8:{"row":9,"col":6,"box":8,"value":0,"index":77},
    r9_c7_b9:{"row":9,"col":7,"box":9,"value":0,"index":78},
    r9_c8_b9:{"row":9,"col":8,"box":9,"value":0,"index":79},
    r9_c9_b9:{"row":9,"col":9,"box":9,"value":0,"index":80}
}

export const MOCK_ROWS = [
    [
      {
        "row": 1,
        "col": 1,
        "box": 1,
        "value": 0,
        "index": 0
      },
      {
        "row": 1,
        "col": 2,
        "box": 1,
        "value": 0,
        "index": 1
      },
      {
        "row": 1,
        "col": 3,
        "box": 1,
        "value": 0,
        "index": 2
      },
      {
        "row": 1,
        "col": 4,
        "box": 2,
        "value": 0,
        "index": 3
      },
      {
        "row": 1,
        "col": 5,
        "box": 2,
        "value": 0,
        "index": 4
      },
      {
        "row": 1,
        "col": 6,
        "box": 2,
        "value": 0,
        "index": 5
      },
      {
        "row": 1,
        "col": 7,
        "box": 3,
        "value": 0,
        "index": 6
      },
      {
        "row": 1,
        "col": 8,
        "box": 3,
        "value": 0,
        "index": 7
      },
      {
        "row": 1,
        "col": 9,
        "box": 3,
        "value": 0,
        "index": 8
      }
    ],
    [
      {
        "row": 2,
        "col": 1,
        "box": 1,
        "value": 0,
        "index": 9
      },
      {
        "row": 2,
        "col": 2,
        "box": 1,
        "value": 0,
        "index": 10
      },
      {
        "row": 2,
        "col": 3,
        "box": 1,
        "value": 0,
        "index": 11
      },
      {
        "row": 2,
        "col": 4,
        "box": 2,
        "value": 0,
        "index": 12
      },
      {
        "row": 2,
        "col": 5,
        "box": 2,
        "value": 0,
        "index": 13
      },
      {
        "row": 2,
        "col": 6,
        "box": 2,
        "value": 0,
        "index": 14
      },
      {
        "row": 2,
        "col": 7,
        "box": 3,
        "value": 0,
        "index": 15
      },
      {
        "row": 2,
        "col": 8,
        "box": 3,
        "value": 0,
        "index": 16
      },
      {
        "row": 2,
        "col": 9,
        "box": 3,
        "value": 0,
        "index": 17
      }
    ],
    [
      {
        "row": 3,
        "col": 1,
        "box": 1,
        "value": 0,
        "index": 18
      },
      {
        "row": 3,
        "col": 2,
        "box": 1,
        "value": 0,
        "index": 19
      },
      {
        "row": 3,
        "col": 3,
        "box": 1,
        "value": 0,
        "index": 20
      },
      {
        "row": 3,
        "col": 4,
        "box": 2,
        "value": 0,
        "index": 21
      },
      {
        "row": 3,
        "col": 5,
        "box": 2,
        "value": 0,
        "index": 22
      },
      {
        "row": 3,
        "col": 6,
        "box": 2,
        "value": 0,
        "index": 23
      },
      {
        "row": 3,
        "col": 7,
        "box": 3,
        "value": 0,
        "index": 24
      },
      {
        "row": 3,
        "col": 8,
        "box": 3,
        "value": 0,
        "index": 25
      },
      {
        "row": 3,
        "col": 9,
        "box": 3,
        "value": 0,
        "index": 26
      }
    ],
    [
      {
        "row": 4,
        "col": 1,
        "box": 4,
        "value": 0,
        "index": 27
      },
      {
        "row": 4,
        "col": 2,
        "box": 4,
        "value": 0,
        "index": 28
      },
      {
        "row": 4,
        "col": 3,
        "box": 4,
        "value": 0,
        "index": 29
      },
      {
        "row": 4,
        "col": 4,
        "box": 5,
        "value": 0,
        "index": 30
      },
      {
        "row": 4,
        "col": 5,
        "box": 5,
        "value": 0,
        "index": 31
      },
      {
        "row": 4,
        "col": 6,
        "box": 5,
        "value": 0,
        "index": 32
      },
      {
        "row": 4,
        "col": 7,
        "box": 6,
        "value": 0,
        "index": 33
      },
      {
        "row": 4,
        "col": 8,
        "box": 6,
        "value": 0,
        "index": 34
      },
      {
        "row": 4,
        "col": 9,
        "box": 6,
        "value": 0,
        "index": 35
      }
    ],
    [
      {
        "row": 5,
        "col": 1,
        "box": 4,
        "value": 0,
        "index": 36
      },
      {
        "row": 5,
        "col": 2,
        "box": 4,
        "value": 0,
        "index": 37
      },
      {
        "row": 5,
        "col": 3,
        "box": 4,
        "value": 0,
        "index": 38
      },
      {
        "row": 5,
        "col": 4,
        "box": 5,
        "value": 0,
        "index": 39
      },
      {
        "row": 5,
        "col": 5,
        "box": 5,
        "value": 0,
        "index": 40
      },
      {
        "row": 5,
        "col": 6,
        "box": 5,
        "value": 0,
        "index": 41
      },
      {
        "row": 5,
        "col": 7,
        "box": 6,
        "value": 0,
        "index": 42
      },
      {
        "row": 5,
        "col": 8,
        "box": 6,
        "value": 0,
        "index": 43
      },
      {
        "row": 5,
        "col": 9,
        "box": 6,
        "value": 0,
        "index": 44
      }
    ],
    [
      {
        "row": 6,
        "col": 1,
        "box": 4,
        "value": 0,
        "index": 45
      },
      {
        "row": 6,
        "col": 2,
        "box": 4,
        "value": 0,
        "index": 46
      },
      {
        "row": 6,
        "col": 3,
        "box": 4,
        "value": 0,
        "index": 47
      },
      {
        "row": 6,
        "col": 4,
        "box": 5,
        "value": 0,
        "index": 48
      },
      {
        "row": 6,
        "col": 5,
        "box": 5,
        "value": 0,
        "index": 49
      },
      {
        "row": 6,
        "col": 6,
        "box": 5,
        "value": 0,
        "index": 50
      },
      {
        "row": 6,
        "col": 7,
        "box": 6,
        "value": 0,
        "index": 51
      },
      {
        "row": 6,
        "col": 8,
        "box": 6,
        "value": 0,
        "index": 52
      },
      {
        "row": 6,
        "col": 9,
        "box": 6,
        "value": 0,
        "index": 53
      }
    ],
    [
      {
        "row": 7,
        "col": 1,
        "box": 7,
        "value": 0,
        "index": 54
      },
      {
        "row": 7,
        "col": 2,
        "box": 7,
        "value": 0,
        "index": 55
      },
      {
        "row": 7,
        "col": 3,
        "box": 7,
        "value": 0,
        "index": 56
      },
      {
        "row": 7,
        "col": 4,
        "box": 8,
        "value": 0,
        "index": 57
      },
      {
        "row": 7,
        "col": 5,
        "box": 8,
        "value": 0,
        "index": 58
      },
      {
        "row": 7,
        "col": 6,
        "box": 8,
        "value": 0,
        "index": 59
      },
      {
        "row": 7,
        "col": 7,
        "box": 9,
        "value": 0,
        "index": 60
      },
      {
        "row": 7,
        "col": 8,
        "box": 9,
        "value": 0,
        "index": 61
      },
      {
        "row": 7,
        "col": 9,
        "box": 9,
        "value": 0,
        "index": 62
      }
    ],
    [
      {
        "row": 8,
        "col": 1,
        "box": 7,
        "value": 0,
        "index": 63
      },
      {
        "row": 8,
        "col": 2,
        "box": 7,
        "value": 0,
        "index": 64
      },
      {
        "row": 8,
        "col": 3,
        "box": 7,
        "value": 0,
        "index": 65
      },
      {
        "row": 8,
        "col": 4,
        "box": 8,
        "value": 0,
        "index": 66
      },
      {
        "row": 8,
        "col": 5,
        "box": 8,
        "value": 0,
        "index": 67
      },
      {
        "row": 8,
        "col": 6,
        "box": 8,
        "value": 0,
        "index": 68
      },
      {
        "row": 8,
        "col": 7,
        "box": 9,
        "value": 0,
        "index": 69
      },
      {
        "row": 8,
        "col": 8,
        "box": 9,
        "value": 0,
        "index": 70
      },
      {
        "row": 8,
        "col": 9,
        "box": 9,
        "value": 0,
        "index": 71
      }
    ],
    [
      {
        "row": 9,
        "col": 1,
        "box": 7,
        "value": 0,
        "index": 72
      },
      {
        "row": 9,
        "col": 2,
        "box": 7,
        "value": 0,
        "index": 73
      },
      {
        "row": 9,
        "col": 3,
        "box": 7,
        "value": 0,
        "index": 74
      },
      {
        "row": 9,
        "col": 4,
        "box": 8,
        "value": 0,
        "index": 75
      },
      {
        "row": 9,
        "col": 5,
        "box": 8,
        "value": 0,
        "index": 76
      },
      {
        "row": 9,
        "col": 6,
        "box": 8,
        "value": 0,
        "index": 77
      },
      {
        "row": 9,
        "col": 7,
        "box": 9,
        "value": 0,
        "index": 78
      },
      {
        "row": 9,
        "col": 8,
        "box": 9,
        "value": 0,
        "index": 79
      },
      {
        "row": 9,
        "col": 9,
        "box": 9,
        "value": 0,
        "index": 80
      }
    ]
  ]

//List of cell names I decided to store here while building. May be useful.
export const names = [
    "r1_c1_b1",
    "r1_c2_b1",
    "r1_c3_b1",
    "r1_c4_b2",
    "r1_c5_b2",
    "r1_c6_b2",
    "r1_c7_b3",
    "r1_c8_b3",
    "r1_c9_b3",
    "r2_c1_b1",
    "r2_c2_b1",
    "r2_c3_b1",
    "r2_c4_b2",
    "r2_c5_b2",
    "r2_c6_b2",
    "r2_c7_b3",
    "r2_c8_b3",
    "r2_c9_b3",
    "r3_c1_b1",
    "r3_c2_b1",
    "r3_c3_b1",
    "r3_c4_b2",
    "r3_c5_b2",
    "r3_c6_b2",
    "r3_c7_b3",
    "r3_c8_b3",
    "r3_c9_b3",
    "r4_c1_b4",
    "r4_c2_b4",
    "r4_c3_b4",
    "r4_c4_b5",
    "r4_c5_b5",
    "r4_c6_b5",
    "r4_c7_b6",
    "r4_c8_b6",
    "r4_c9_b6",
    "r5_c1_b4",
    "r5_c2_b4",
    "r5_c3_b4",
    "r5_c4_b5",
    "r5_c5_b5",
    "r5_c6_b5",
    "r5_c7_b6",
    "r5_c8_b6",
    "r5_c9_b6",
    "r6_c1_b4",
    "r6_c2_b4",
    "r6_c3_b4",
    "r6_c4_b5",
    "r6_c5_b5",
    "r6_c6_b5",
    "r6_c7_b6",
    "r6_c8_b6",
    "r6_c9_b6",
    "r7_c1_b7",
    "r7_c2_b7",
    "r7_c3_b7",
    "r7_c4_b8",
    "r7_c5_b8",
    "r7_c6_b8",
    "r7_c7_b9",
    "r7_c8_b9",
    "r7_c9_b9",
    "r8_c1_b7",
    "r8_c2_b7",
    "r8_c3_b7",
    "r8_c4_b8",
    "r8_c5_b8",
    "r8_c6_b8",
    "r8_c7_b9",
    "r8_c8_b9",
    "r8_c9_b9",
    "r9_c1_b7",
    "r9_c2_b7",
    "r9_c3_b7",
    "r9_c4_b8",
    "r9_c5_b8",
    "r9_c6_b8",
    "r9_c7_b9",
    "r9_c8_b9",
    "r9_c9_b9",
]

