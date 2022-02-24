import { addDoc, collection, query } from 'firebase/firestore';
import React from 'react';
import { dbService } from '../lib/fbase';

const WriteBoard = ({ setIsWriting }) => {
  const cancelWriting = () => {
    setIsWriting(false);
  };
  const onSubmit = (e) => {
    e.preventDefault();
    const { target } = e;
    const q = query(collection(dbService, 'TEST'));
    addDoc(q, {
      content: target[1].value,
      createAt: Date.now(),
      creatorName: '김세현',
      postType: 'announce',
      title: target[0].value,
      index: parseInt(Math.random() * 100),
    });
    setIsWriting(false);
  };
  return (
    <form onSubmit={onSubmit}>
      <textarea
        style={{ display: 'block', marginRight: '20px', clear: 'left' }}
        name="title"
        placeholder="제목"
        required
      ></textarea>
      <textarea
        style={{ display: 'block', marginRight: '20px', clear: 'left' }}
        name="content"
        placeholder="내용"
        required
      ></textarea>
      <input type="file" name="selectFile" />
      <button type="submit">글 작성</button>
      <button type="button" onClick={cancelWriting}>
        취소
      </button>
    </form>
  );
};

export default WriteBoard;
