import style from "../style/HomeContent.module.css";
import anc1 from "../asset/img/anc1.jpg";
import anc2 from "../asset/img/anc2.jpg";
import { Helmet } from "react-helmet-async";

const Home = () => {
  return (
    <>
      <Helmet>
        <title>AJOUBOARD</title>
      </Helmet>
      <div className={style.container}>
        <div className={style.content}>
          <div className={style.contentText}>HOME</div>
          <div className={style.contentText}>
            <div className={style.contentImg}>
              <span>Look into Random Club</span>
            </div>
          </div>
          <div className={style.contentText}>Announcement</div>
        </div>
        <div className={style.announcement}>
          <ul className={style.announcementList}>
            <li className={style.announcementObject}>
              <img
                className={style.announcementImg}
                src={anc1}
                alt="annoucementImg"
              />
              <img
                className={style.announcementImg}
                src={anc2}
                alt="annoucementImg"
              />
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Home;
