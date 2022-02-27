import { Link } from "react-router-dom";
import style from "../style/ClubList.module.css";

/**
 * component: ClubIcon, ClubContainer
 * useFor: ClubIcon은 아이콘 한개, ClubContainer는 아이콘 전체
 */
const clubName = [
  "검도부",
  "고슴도치",
  "꽁",
  "녹두벌",
  "늘사랑",
  "돌벗",
  "드롭인",
  "마스터피스",
  "맨차",
  "미디올로지",
  "미유미유",
  "산악부",
  "샘터야학",
  "소금꽃",
  "소울",
  "스파이더스",
  "시사문제강독회",
  "아가생",
  "아르떼",
  "아몽극회",
  "아묵회",
  "아미",
  "아미콤",
  "유레카",
  "유스호스텔",
  "이데알레",
  "제니스",
  "차오름",
  "클리어",
  "호롱불",
  "호완",
  "호우회",
  "2.5g",
  "5분쉼표",
  "A.SA.",
  "ABBA",
  "ABC",
  "AD-Brain",
  "AFC",
  "AJESS",
  "AJUDO",
  "A-pin",
  "ATC",
  "ATOM",
  "BEAT",
  "BUT",
  "C.OB.E",
  "CAPO",
  "CCC",
  "Conjurer",
  "DoIT",
  "GLEE",
  "PTPI",
  "ROA",
  "SFC",
  "SWeat",
];

const ClubListPage = () => {
  const clubIcon = (name, idx) => {
    return (
      <Link to={`/club/123`} key={idx}>
        <div className={style.clubIcon}>
          <div className={style.clubIconName}>
            <div
              className={`${style.clubIconSubMenuContainer} ${style.clubIconHover}`}
            >
              <div className={style.clubIconSubMenu}>
                <span className={style.rightCss}>동아리 공지사항</span>
                <span className={style.rightCss}>전체글</span>
                <span>인기글</span>
              </div>
            </div>
            <span className={style.clubLink}>{name}</span>
          </div>
          <div className={style.clubIconInfo}>
            <span>a</span>
          </div>
        </div>
      </Link>
    );
  };
  return (
    <>
      <div className={style.clubIconContainer}>
        <div className={style.clubIconContainerTopMenu}>
          <span className={style.clubContainerName}>동아리 목록</span>
        </div>
        <div className={style.clubIconList}>
          {clubName.map((name, idx) => clubIcon(name, idx))}
        </div>
      </div>
    </>
  );
};

export default ClubListPage;
