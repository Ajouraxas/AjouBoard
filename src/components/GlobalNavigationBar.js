import style from '../style/GlobalNavigationBar.module.css';
import logo_ajouboard from '../asset/img/logo_ajouboard.jpg';
import { Link } from 'react-router-dom';

/**
 * component: GlobalNavigationBar
 * useFor: 상단 고정 네비게이션 바
 */

const GlobalNavigationBar = () => {
  return (
    <>
      <div className={style.gnbContainer}>
        <div className={style.gnb}>
          <ul className={style.gnbList}>
            <li>
              <img className={style.gnbLogo} src={logo_ajouboard} />
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
            <li>
              <Link to={{ pathname: `/login` }}>
                <span className={`${style.gnbLink} ${style.gnbLogin}`}>
                  LOGIN
                </span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default GlobalNavigationBar;
