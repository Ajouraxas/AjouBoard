import { doc, getDoc, updateDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import WriteBoard from '../components/WriteBoard';
import { dbService } from '../lib/fbase';

import style from '../style/UpdatePage.module.css';
const UpdatePage = ({ user }) => {
  const [title, setTitle] = useState();
  const [content, setContent] = useState();
  const navigate = useNavigate();
  const { clubId, postId } = useParams();
  useEffect(() => {
    const getData = async () => {
      const dataDoc = await getDoc(
        doc(dbService, `clubs/${clubId}/posts`, postId)
      );
      const data = dataDoc.data();
      if (data === undefined || data.uid !== user.uid) {
        return navigate(`/club/${clubId}`);
      }
      setTitle(data.title);
      setContent(data.content);
    };
    getData();
  }, [navigate, postId, clubId, user]);
  const onSubmit = async (e) => {
    e.preventDefault();
    await updateDoc(doc(dbService, `clubs/${clubId}/posts`, postId), {
      title: e.target[0].value,
      content: e.target[1].value,
    });
    navigate(-1);
  };
  return (
    <>
      <form className={style.boardWrapper} onSubmit={onSubmit}>
        <WriteBoard prevTitle={title} prevContent={content} uid={user.uid} />
      </form>
    </>
  );
};

export default UpdatePage;
