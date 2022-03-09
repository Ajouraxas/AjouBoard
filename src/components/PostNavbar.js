import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import style from '../style/PostNavbar.module.css';
import { doc, getDoc } from 'firebase/firestore';
import { dbService } from '../lib/fbase';
import symbol_ajou from '../asset/img/symbol_ajou.jpg';
/**
 * component: PostNavber
 * useFor: 동아리 공지사항, 전체글, 개추 받은 글, 글쓰기
 */
const PostNavbar = ({ user }) => {
  const [clubName, setClubName] = useState('');
  const [viewType, setViewType] = useState('all');
  const { clubId } = useParams();
  const { search } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const getClubName = async () => {
      const clubData = await getDoc(doc(dbService, 'clubs', clubId));
      setClubName(clubData.data().name);
    };
    getClubName();
    const viewTypeQ = search.split('=');
    if (viewTypeQ[0] === '?view') {
      setViewType(viewTypeQ[1]);
    }
  }, [viewType, clubId, search]);
  const onClick = (e) => {
    const {
      target: { id },
    } = e;
    setViewType(id);
    navigate(`/club/${clubId}?view=${id}`);
  };
  const onWrite = (e) => {
    e.preventDefault();
    navigate(`/club/${clubId}/write`, { state: { clubId, user } });
  };
  return (
    <>
      <div className={style.topBanner}>
        <span className={style.boardLogo}>AJOUBOARD</span>
        <span className={style.clubName}>{clubName}</span>
        <img className={style.bannerImg} src={symbol_ajou} alt="clubImg"></img>
      </div>
      <ul className={style.navUl}>
        <li
          className={`${style.navLi} ${
            viewType === 'announce' ? style.navSelect : ''
          }`}
          id={'announce'}
          onClick={onClick}
        >
          공지사항
        </li>
        <li
          className={`${style.navLi} ${
            viewType === 'all' ? style.navSelect : ''
          }`}
          id={'all'}
          onClick={onClick}
        >
          전체 글
        </li>
        <li
          className={`${style.navLiLast} ${
            viewType === 'popular' ? style.navSelect : ''
          }`}
          id={'popular'}
          onClick={onClick}
        >
          인기 글
        </li>
        {user === null ? null : (
          <button className={style.navBtn} onClick={onWrite}>
            글쓰기
          </button>
        )}
      </ul>
    </>
  );
};

export default PostNavbar;
