import style from "../style/GlobalNavigationBar.module.css";
import logo_ajouboard from "../asset/img/logo_ajouboard.jpg";

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
              <img className={style.gnbLogo} src={logo_ajouboard}/>
            </li>
            <li>
              <span className={`${style.gnbLink} ${style.gnbTitle}`}>AJOUBOARD</span>
            </li>
            <li>
              <span className={style.gnbLink}>HOME</span>
            </li>
            <li>
              <span className={style.gnbLink}>CLUB LIST</span>
            </li>
            <li>
              <span className={`${style.gnbLink} ${style.gnbLogin}`}>LOGIN</span>
            </li>
          </ul>
        </div>
      </div>
    </>
    
    
  );
};

export default GlobalNavigationBar;