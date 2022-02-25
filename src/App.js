import { HashRouter as Router, Routes, Route } from "react-router-dom";
import ClubPage from "./routes/ClubPage";
import Home from "./routes/Home";
import LoginPage from "./routes/LoginPage";
import RegisterPage from "./routes/RegisterPage";

/**
 * ClubPage 접속 : http://localhost:3000/#/club/123
 * Home 접속 : http://localhost:3000/#/
 */

function App() {
  return (
    <Router>
      <Routes>
        <Route path={"/"} element={<Home />}></Route>
        <Route path={"/login"} element={<LoginPage />}></Route>
        <Route path={"/register"} element={<RegisterPage />}></Route>
        <Route path={"/club/:clubId"} element={<ClubPage />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
