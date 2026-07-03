import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Nav from './Nav';
import Home from './Home';

function App() {
  return (
    <Router>
      <div className="App">
        <Nav />
        <Routes>
          {/* What goes here? Think about:
              - Route for "/" should show Home
              - Route for "/about" should show...what component?
              - Do you need a route for individual movies? */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
