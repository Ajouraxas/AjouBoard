import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import ClubListPage from './routes/ClubListPage';
import ClubPage from './routes/ClubPage';
import Home from './routes/Home';
import LoginPage from './routes/LoginPage';
import RegisterPage from './routes/RegisterPage';
import GlobalNavigationBar from './components/GlobalNavigationBar';
import WriteBoard from './routes/WriteBoard';
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { authService } from './lib/fbase';
import PostDetailPage from './routes/PostDetailPage';
/**
 * ClubPage 접속 : http://localhost:3000/#/club/123
 * Home 접속 : http://localhost:3000/#/
 */

function App() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(authService, (user) => {
      if (user) {
        setUser({
          displayName: user.displayName,
          uid: user.uid,
        });
      } else {
        setUser(null);
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);
  return (
    <>
      <Router>
        <GlobalNavigationBar user={user} />
        <Routes>
          <Route path={'*'} element={<Navigate replace to={'/'} />}></Route>
          <Route path={'/'} element={<Home />}></Route>
          <Route
            path={'/login'}
            element={
              user ? (
                <Navigate replace to={'/'} />
              ) : (
                <LoginPage setUser={setUser} />
              )
            }
          ></Route>
          <Route path={'/register'} element={<RegisterPage />}></Route>
          <Route path={'/clublist'} element={<ClubListPage />}></Route>
          <Route
            path={'/club/:clubId'}
            element={<ClubPage user={user} />}
          ></Route>
          <Route
            path={'/club/:clubId/:postId'}
            element={<PostDetailPage user={user} />}
          ></Route>
          <Route
            path={'/club/:clubId/write'}
            element={<WriteBoard user={user} />}
          ></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
