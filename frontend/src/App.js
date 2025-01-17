import NoPage from './components/no-page/no-page';
import HomePage from './components/home-page/home-page';
import PatternMatchingPage from './components/pattern-matching/pattern-matching';
import { BrowserRouter as Routes, Route } from 'react-router-dom'

function App() {
  return (
    <Routes>
      <Route exact path="/" element={<HomePage />} />
      <Route exact path="/pattern-matching" element={<PatternMatchingPage />} />
      <Route path="*" element={<NoPage />} />

    </Routes>
  );
}

export default App;
