import NoPage from './components/no-page/no-page';
import HomePage from './components/home-page/home-page';
import Navbar from "./components/nav-bar/nav-bar"
import PatternMatchingPage from './components/pattern-matching/pattern-matching';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route exact path="/pattern-matching" element={<PatternMatchingPage />} />
        <Route path="*" element={<NoPage />} />

      </Routes>
    </Router>
  );
}

export default App;
