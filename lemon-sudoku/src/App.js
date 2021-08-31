import logo from './logo.svg';
import './App.css';
import Sudoku_board from './components/sudoku_board';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Sudoku_board></Sudoku_board>
        <p>
          Sudoku.
        </p>       
      </header>
    </div>
  );
}

export default App;
