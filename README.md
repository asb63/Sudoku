# Sudoku (WIP)
Simple Sudoku web app. My first exposure to Javascript. WIP

## What is this? ##
    This is a practice-project to begin working with JavaScript.
    The end goal is a working Sudoku player/solver with a satisfying UX.
    
    This is the first major change in this project, begin iteration 2. 

## lemon-sudoku/ ##

This is the second iterion of the "lemon-sudoku" project.
The baseline/ folder contains the first iteration.

This is what I have from the baseline.

* html/css representation of a Sudoku puzzle "player" 
    * very ugly.
    * poorly structured.
    * not intuitive. 
    * it works.

* js code for sudoku logic and DOM interaction
    * Poorly structured.
    * Much redundant code.
    * Inconsistent style.
    * Does not generate puzzle.
    * Inefficient algorithms.
    * Difficult puzzles cannot be solved. 
    * Solves many puzzles.

* lemon icon
    * Beauty.
    * Perfection.
    * Found on MS Paint3D.

### Lessons/Takeaways ###

1. Need better structure to represent a puzzle.
   
   Currently there are redundant copies of the "puzzle" passed
   to the Sudoku constructor. This feels unnecessary. As I progress, 
   I notice better ways to implement nearly everything. 
   
   Since I am learning from scratch, I added code instead of fixing code.
   I think it was appropriate for now. This allowed me to work faster
   and learn some basics. I think of this path as a breadth-first intro 
   to javascript. Now I want to shift my focus to better understand
   the most important components.

   In short, fix code instead of add code. 

2. Solving sudoku is actually quite complicated.

   The algorithm implemented in the baseline only uses simple techniques.
   This is enough to solve a lot of puzzles, but to guarentee a solution 
   requires far more complexity. The main "work" to be done by the algorithm 
   is traversing arrays and comparing values. 

   When humans solve a sudoku puzzle, visual cues help us identify patterns.
   
   When computers solve a sudoku puzzle, it is inherently complex. 
   A standard puzzle has 81 cells, and each empty cell can have "candidates".
   To solve a single cell, we must correctly eliminate all but 1 candidate.
   An important elimination technique requires finding candidate pairs/triples/quads
   within a specified container. A container may be a row/column/box, there are 9 
   of each, and all have a length of 9. This means there are many opportunities for a candidate to be eliminated from a cell, but it might require looking through and comparing each candidate for each cell in the specified container multiple times. 
   
   This is the headache that caused me to reconsider my early choices.

3. Better organization will enable more efficient and readable code.
   
   The way that the Sudoku class handles a puzzle is hacky and annoying to deal with.
   The Sudoku class does nearly everything, and I am forced to iterate through arrays
   manually in most functions. Since this work grows exponentially when solving each cell,
   it would be convenient for a cell to have more info. 
   
   Here's an example of pointless redundancy. 
   The puzzle is most simply represented as a string or array-like object with 81 elements, but we need to process that array as a square matrix where N = 9. This matrix also has 9 sections or 'boxes' which are 3x3 squares. When looking for candidates and candidates of a cells neighbors within any given container (row/column/box) there is overhead in
   converting a linear index into a matrix index. There is a special conversion for 'box numbers' that utilizes a hard-coded index lookup table to find which box contains an index.
   This overhead is repeated with the exponential work done to eliminate candidates and 
   solve the puzzle. 

   If the cell was a more useful object instead of a character, we could eliminate overhead by calculating once and saving it with the cell for the whole duration.
   While i'm at it, a since the puzzle needs to be processed like a 9x9 matrix with 9 sub-sections. A container could also be its own object, with useful data about its 
   cells.


### Plan ###

At this stage I have much work to do but I am happy with the progress.
I have an ugly sudoku player/solver that is not user friendly but it DOES solve some base-case puzzles. It does not generate puzzles yet and that is important but not
needed to meet my immediate goal. For now, I will basically rewrite the code in a 
more modular way. Since I understand many pitfalls caused by my early design choices, I 
will find a stronger solution to those problems which is great because this whole project
is about learning javascript!

In my research, I learn that React might be a solid fit for this project.
* React provides great potential to improve UX. 
* It requires me to split the code into components, which I wanted to do anyway.
* Its a valuble and popular skill in the current job market.
* I hope it will help me spend less time on CSS and more time with Sudoku and Javascript


To help with organization, I'll better define my requirements.
   
Goal: A working Sudoku player/solver with a satisfying UX.
   * Must solve ALL valid puzzles.
   * Cells and containers should contain more info to reduce overhead.
   * Candidates must be displayed if a cell is not solved.
   * User must be able to mark and delete candidates for a cell manually.
