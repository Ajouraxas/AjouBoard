import { doc, getDoc } from 'firebase/firestore';
import { dbService } from '../lib/fbase';
import React, { useEffect } from 'react';
import PostNavbar from '../components/PostNavbar';
import Posts from '../components/Posts';
import { useNavigate, useParams } from 'react-router-dom';
import style from '../style/ClubPage.module.css';
/**
 * component: PostNavber
 * useFor: 동아리 공지사항, 전체글, 개추 받은 글, 글쓰기
 *
 * component: PostList
 * useFor: 게시글 조회
 */

/* const ALL = 'all';
  const ANNOUNCE = 'announce';
  const POPULAR = 'popular';
 */

const ClubPage = ({ user }) => {
  // 공지사항 or 전체글 or 개추 받은 글
  const { clubId } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    const isCorrectAccess = async () => {
      const isCorrectAccess = await getDoc(doc(dbService, 'clubs', clubId));
      if (isCorrectAccess.data() === undefined) {
        return navigate('/clublist');
      }
    };
    isCorrectAccess();
  }, [clubId, navigate]);

  return (
    // Navigation Bar (홈, 동아리 목록)
    <>
      <div className={style.clubPageWrapper}>
        <PostNavbar user={user} />
        <Posts />
      </div>
    </>
  );
};

export default ClubPage;
