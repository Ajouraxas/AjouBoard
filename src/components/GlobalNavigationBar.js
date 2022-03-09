import style from '../style/GlobalNavigationBar.module.css';
import { Link } from 'react-router-dom';
import { authService } from '../lib/fbase';
import { signOut } from 'firebase/auth';
import logo_ajou_1 from '../asset/img/logo_ajou_1.png';

/**
 * component: GlobalNavigationBar
 * useFor: 상단 고정 네비게이션 바
 */

const GlobalNavigationBar = ({ user }) => {
  const onLogout = async () => {
    try {
      await signOut(authService);
      console.log('로그아웃');
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
                <img className={style.gnbLogo} src={logo_ajou_1} alt="logo" />
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
