import "../style/HomeContent.css";
import anc1 from "../asset/img/anc1.jpg";
import anc2 from "../asset/img/anc2.jpg";

/**
 * component: HomeContent
 * useFor: 홈페이지 컨텐츠
 */

const HomeContent = () => {
  return (
    <div>
      <div className="content">
        <div className="contentText">HOME</div>
        <div className="contentText">
          <div className="contentImg" src={anc1}>
            <span>Look into Random Club</span>
          </div>
        </div>
        <div className="contentText">Announcement</div>
      </div>
      <div className="announcement">
        <ul className="announcementList">
          <li className="announcementObject">
            <img className="announcementImg" src={anc1}/>
            <img className="announcementImg" src={anc2}/>
          </li>
          </ul>
      </div>
    </div>
    );
};

export default HomeContent;