import { addDoc, collection, query } from 'firebase/firestore';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { dbService } from '../lib/fbase';
import WriteBoard from '../components/WriteBoard';
import style from '../style/WritePage.module.css';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const WritePage = ({ user: { displayName, uid } }) => {
  const navigate = useNavigate();
  const {
    state: { clubId },
  } = useLocation();
  const onSubmit = (e) => {
    e.preventDefault();
    const title = e.target[0].value;
    const content = e.target[1].value;
    const q = query(collection(dbService, `clubs/${clubId}/posts`));
    addDoc(q, {
      uid,
      content,
      createAt: Date.now(),
      creatorName: displayName,
      postType: 'all',
      title,
    });
    navigate(-1);
  };
  return (
    <>
      <form className={style.boardWrapper} onSubmit={onSubmit}>
        <WriteBoard />
      </form>
    </>
  );
};

export default WritePage;