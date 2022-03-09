import { addDoc, collection, getDocs, query, where } from 'firebase/firestore';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { dbService } from '../lib/fbase';
import WriteBoard from '../components/WriteBoard';
import style from '../style/WritePage.module.css';
import { Helmet } from 'react-helmet-async';

const WritePage = ({ user: { uid } }) => {
  const navigate = useNavigate();
  const {
    state: { clubId },
  } = useLocation();
  const onSubmit = async (e) => {
    e.preventDefault();
    const title = e.target[0].value;
    const content = e.target[1].value;
    const imageId = e.target[2].value;
    const userData = await getDocs(
      query(collection(dbService, 'users'), where('id', '==', uid))
    );
    const q = query(collection(dbService, `clubs/${clubId}/posts`));
    await addDoc(q, {
      uid,
      content,
      createAt: Date.now(),
      creatorName: userData.docs[0].data().nickName,
      postType: 'all',
      title,
      plusRecommendCount: 0,
      minusRecommendCount: 0,
      recommendUser: [],
      views: 0,
      imageId,
    });
    navigate(`/club/${clubId}`);
  };
  return (
    <>
      <Helmet>
        <title>글쓰기</title>
      </Helmet>
      <form className={style.boardWrapper} onSubmit={onSubmit}>
        <WriteBoard uid={uid} />
      </form>
    </>
  );
};

export default WritePage;
