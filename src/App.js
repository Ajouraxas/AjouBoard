import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from 'react-router-dom';
import ClubListPage from './routes/ClubListPage';
import ClubPage from './routes/ClubPage';
import Home from './routes/Home';
import LoginPage from './routes/LoginPage';
import RegisterPage from './routes/RegisterPage';
import GlobalNavigationBar from './components/GlobalNavigationBar';
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { authService } from './lib/fbase';
import PostDetailPage from './routes/PostDetailPage';
import WritePage from './routes/WritePage';
import UpdatePage from './routes/UpdatePage';
import ResetPasswordPage from './routes/ResetPasswordPage';
import ManagePage from './routes/ManagePage';
/**
 * ClubPage 접속 : http://localhost:3000/#/club/123
 * Home 접속 : http://localhost:3000/#/
 */

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

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
        <ScrollToTop />
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
          <Route
            path={'/resetpassword'}
            element={<ResetPasswordPage />}
          ></Route>
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
            element={
              user ? <WritePage user={user} /> : <Navigate to={'/login'} />
            }
          ></Route>
          <Route
            path={'/club/:clubId/:postId/update'}
            element={
              user ? <UpdatePage user={user} /> : <Navigate to={'/login'} />
            }
          ></Route>
          <Route
            path={'club/:clubId/management'}
            element={
              user ? <ManagePage user={user} /> : <Navigate to={'/login'} />
            }
          ></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
