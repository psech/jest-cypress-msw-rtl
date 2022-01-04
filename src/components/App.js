import './App.css';
import Pizza from './Pizza';
import Toggle from './Toggle';
import Todos from './Todos';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React!
        </a>
      </header>
      <Pizza ingredients={['bacon', 'ham']} />
      <Toggle />
      <Todos />
    </div>
  );
}

export default App;
