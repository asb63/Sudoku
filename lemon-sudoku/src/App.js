import logo from './logo.svg';
import './App.css';
import Game from './components/Game/Game';
import { useState } from 'react'

function App() {

  //allows logo to be hidden on click
  const [logoHidden, setLogoHidden] = useState(false);


  return (
    <div className="App">
      <header className="App-header">
        {logoHidden ? (
            console.log('logo is hidden')
          ) : (
            <img src={logo} className="App-logo" alt="logo" onClick={() => setLogoHidden(true)}/>
          )}
      </header>
      
      <Game className="Game"></Game>

    </div>
  );
}

export default App;
