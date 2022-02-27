import { addDoc, collection, query } from 'firebase/firestore';
import React from 'react';
import { dbService } from '../lib/fbase';
import style from '../style/WriteBoard.module.css';

const WriteBoard = ({ setIsWriting, setSelectPageIndex }) => {
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
    setSelectPageIndex(1);
  };

  return (
    <form className={style.boardForm} onSubmit={onSubmit}>
      <textarea
        className={style.boardTitle}
        name="title"
        placeholder="제목"
        required
      ></textarea>
      <textarea
        className={style.boardContent}
        name="content"
        placeholder="내용"
        required
      ></textarea>
      <div className={style.boardFileDiv}>
        <label className={style.boardFile} htmlFor="selectFile">
          Attach
        </label>
        <input type="file" id="selectFile" />
      </div>
      <div className={style.boardBtnDiv}>
        <button className={style.boardBtn} type="submit">
          작성
        </button>
        <button
          className={style.boardBtn}
          type="button"
          onClick={cancelWriting}
        >
          취소
        </button>
      </div>
    </form>
  );
};

export default WriteBoard;