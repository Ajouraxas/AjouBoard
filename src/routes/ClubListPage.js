import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { getDownloadURL, getStorage, ref } from "firebase/storage";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Spinner from "../components/Spinner";
import { dbService } from "../lib/fbase";
import style from "../style/ClubList.module.css";

/**
 * component: ClubIcon, ClubContainer
 * useFor: ClubIcon은 아이콘 한개, ClubContainer는 아이콘 전체
 */
const storage = getStorage();
const ClubListPage = () => {
  const [clubsObj, setClubsObj] = useState([]);
  const [clubsBgUrl, setClubsBgUrl] = useState([]);
  const [isInit, setIsInit] = useState(false);

  useEffect(() => {
    const getClubsObj = async () => {
      const clubQ = query(
        collection(dbService, "clubs"),
        orderBy("index", "asc"),
      );
      const docs = await getDocs(clubQ);
      const clubArray = docs.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setClubsObj(clubArray);
      const imageRef = await Promise.all(
        clubArray.map(async (obj) => {
          if (obj.is_bg) {
            try {
              const result = await getDownloadURL(
                ref(storage, obj.id + "/bg_img"),
              );
              return result;
            } catch (e) {}
          }
        }),
      );
      setClubsBgUrl(imageRef);
      setIsInit(true);
    };
    getClubsObj();
  }, []);

  const clubIcon = (clubObj, idx) => {
    const id = clubObj["id"];
    const name = clubObj["name"];
    const location = clubObj["location"];
    const tel = clubObj["tel"];
    const isBg = clubObj["is_bg"];
    let attachmentUrl = "";
    if (isBg) {
      attachmentUrl = clubsBgUrl[idx];
    }
    return (
      <Link to={`/club/${id}`} key={idx}>
        <div className={style.clubIcon}>
          <div className={style.clubIconName}>
            {isBg ? (
              <>
                <img className={style.bg} src={attachmentUrl} alt="bg" />
                <div className={`${style.clubIconSubMenuContainer}`}>
                  <div className={style.clubIconSubMenu}>
                    <span>{`${name}`}</span>
                  </div>
                </div>
              </>
            ) : (
              <div className={style.clubLink}>
                <span
                  className={style.clubLink__span}
                >{`\u00A0${name}\u00A0`}</span>
              </div>
            )}
          </div>
          <div className={style.clubIconInfo}>
            <span>동아리방 위치: {location}</span>
            <span>연락처: {tel}</span>
          </div>
        </div>
      </Link>
    );
  };
  return isInit ? (
    <>
      <div className={style.clubIconContainer}>
        <div className={style.clubIconContainerTopMenu}>
          <span className={style.clubContainerName}>동아리 목록</span>
        </div>
        <div className={style.clubIconList}>
          {clubsObj.map((clubObj, idx) => clubIcon(clubObj, idx))}
        </div>
      </div>
    </>
  ) : (
    <Spinner />
  );
};

export default ClubListPage;
