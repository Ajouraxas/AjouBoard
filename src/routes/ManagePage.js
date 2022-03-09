import {
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate, useParams } from "react-router-dom";
import { dbService } from "../lib/fbase";
import style from "../style/ManagePage.module.css";

const ManagePage = ({ user }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [email, setEmail] = useState("");

  const navigate = useNavigate();
  const { clubId } = useParams();

  useEffect(() => {
    const adminCheck = async () => {
      const userData = await getDocs(
        query(collection(dbService, "users"), where("id", "==", user.uid)),
      );
      const clubPosition = userData.docs[0].data().clubPosition;
      if (clubPosition[0] === clubId && clubPosition[1] === "admin") {
        setIsAdmin(true);
      } else {
        navigate("/");
      }
    };
    if (user) {
      adminCheck();
    }
  }, [user, isAdmin, clubId, navigate]);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateDoc(doc(dbService, `users/${e.target[0].value}`), {
        clubPosition: [clubId, "member"],
      });
      window.alert("등록에 성공하였습니다.");
    } catch (error) {
      window.alert("등록에 실패하였습니다.");
    }
    setEmail("");
  };
  const onChange = (e) => {
    setEmail(e.target.value);
  };
  return (
    <>
      <Helmet>
        <title>관리자 패널</title>
      </Helmet>
      <div className={style.wrapper}>
        <span className={style.addMemberText}>동아리원 등록</span>
        <form className={style.searchForm} onSubmit={onSubmit}>
          <input
            className={style.searchInput}
            value={email}
            onChange={onChange}
            placeholder="이메일"
            type={"search"}
          ></input>
          <input
            className={style.searchBtn}
            value={"등록"}
            type={"submit"}
          ></input>
        </form>
      </div>
    </>
  );
};

export default ManagePage;
