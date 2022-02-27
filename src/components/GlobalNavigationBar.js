import style from "../style/GlobalNavigationBar.module.css";
import logo_ajouboard from "../asset/img/logo_ajouboard.jpg";
import { Link } from "react-router-dom";
import { authService } from "../lib/fbase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useEffect, useState } from "react";

/**
 * component: GlobalNavigationBar
 * useFor: 상단 고정 네비게이션 바
 */

const GlobalNavigationBar = () => {
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

  const onLogout = async () => {
    try {
      await signOut(authService);
      console.log("로그아웃");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className={style.gnbContainer}>
        <div className={style.gnb}>
          <ul className={style.gnbList}>
            <div className={style.nav}>
              <li>
                <img
                  className={style.gnbLogo}
                  src={logo_ajouboard}
                  alt="logo"
                />
              </li>
              <li>
                <span className={`${style.gnbLink} ${style.gnbTitle}`}>
                  AJOUBOARD
                </span>
              </li>
              <li>
                <Link to={{ pathname: `/` }}>
                  <span className={style.gnbLink}>HOME</span>
                </Link>
              </li>
              <li>
                <Link to={{ pathname: `/clublist` }}>
                  <span className={style.gnbLink}>CLUB LIST</span>
                </Link>
              </li>
            </div>
            <li>
              {user ? (
                <div className={style.logoutBox}>
                  <span className={style.displayName}>
                    {user.displayName} 님
                  </span>
                  <span
                    onClick={onLogout}
                    className={`${style.gnbLink} ${style.gnbLogin}`}
                  >
                    LOGOUT
                  </span>
                </div>
              ) : (
                <Link to={{ pathname: `/login` }}>
                  <span className={`${style.gnbLink} ${style.gnbLogin}`}>
                    LOGIN
                  </span>
                </Link>
              )}
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default GlobalNavigationBar;
