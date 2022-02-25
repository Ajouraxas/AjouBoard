import React from "react";
import './pageClubList.css';

const clubName = ["검도부", "고슴도치", "꽁", "녹두벌", "늘사랑",
                  "돌벗", "드롭인", "마스터피스", "맨차", "미디올로지",
                  "미유미유", "산악부", "샘터야학", "소금꽃", "소울",
                  "스파이더스", "시사문제강독회", "아가생", "아르떼", "아몽극회",
                  "아묵회", "아미", "아미콤", "유레카", "유스호스텔",
                  "이데알레", "제니스", "차오름", "클리어", "호롱불",
                  "호완", "호우회", "2.5g", "5분쉼표", "A.SA.",
                  "ABBA", "ABC", "AD-Brain", "AFC", "AJESS",
                  "AJUDO", "A-pin", "ATC", "ATOM", "BEAT",
                  "BUT", "C.OB.E", "CAPO", "CCC", "Conjurer",
                  "DoIT", "GLEE", "PTPI", "ROA", "SFC",
                  "SWeat"];
const clubNum = clubName.length;
let v="hidden";
function ClubIcon(props) {
  return(
    <div className="clubIcon">
      <div className="clubIconName">
        <span className="clubLink">{props.a}</span>
      </div>
      <div style={{
      margin: "auto",
      textAlign: "center"
      }}>
        <span className="clubIconSubMenu rightCss">동아리 공지사항</span>
        <span className="clubIconSubMenu rightCss">전체 게시물</span>
        <span className="clubIconSubMenu">인기 게시물</span>
      </div>
    </div>
  );
  }
  function ClubContainer() {
    return(
      <div style={{
        marginTop: "200px",
        display: "grid",
        margin: "auto",
        gridTemplateColumns: "repeat(5, 300px)",
        rowGap: "30px",
        width: "1500px",
        alignItems: "center",
        justifyItems: "center"
      }}>
        {clubName.map((name, idx) => <ClubIcon key={idx} a={name}/>)}
      </div>
    );
  }

export default ClubContainer;