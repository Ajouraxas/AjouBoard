import "../style/GlobalNavigationBar.css";
import logo_ajouboard from "../asset/img/logo_ajouboard.jpg";

/**
 * component: GlobalNavigationBar
 * useFor: 상단 고정 네비게이션 바
 */

const GlobalNavigationBar = () => {
  return (
    <div className="gnb">
      <ul className="gnbList">
        <li>
          <img className="gnbLogo" src={logo_ajouboard}/>
        </li>
        <li>
          <span className="gnbLink gnbTitle">AJOUBOARD</span>
        </li>
        <li>
          <span className="gnbLink">HOME</span>
        </li>
        <li>
          <span className="gnbLink">CLUB LIST</span>
        </li>
        <li>
          <span className="gnbLink gnbLogin">LOGIN</span>
        </li>
      </ul>
    </div>
  );
};

export default GlobalNavigationBar;