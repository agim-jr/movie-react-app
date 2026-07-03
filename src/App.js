import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Nav from './Nav';
import Home from './Home';
import MovieDetails from './MovieDetails';
import Footer from './Footer';
import './Navbar.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/find-movie" element={<Home />} />
          <Route path="/contact" element={<Home />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
          <Route path="/footer" element={<Footer />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
