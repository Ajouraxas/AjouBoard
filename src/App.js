import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import ClubPage from './routes/ClubPage';
import Home from './routes/Home';

/**
 * ClubPage 접속 : http://localhost:3000/#/club/123
 * Home 접속 : http://localhost:3000/#/
 */

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path={'/'} element={<Home />}></Route>
        <Route exact path={'/club/:clubId'} element={<ClubPage />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
