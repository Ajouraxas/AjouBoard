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
    <form className={style.BoardForm} onSubmit={onSubmit}>
      <textarea
        className={style.BoardTitle}
        name="title"
        placeholder="제목"
        required
      ></textarea>
      <textarea
        className={style.BoardContent}
        name="content"
        placeholder="내용"
        required
      ></textarea>
      <div className={style.BoardFileDiv}>
        <label className={style.BoardFile} htmlFor="selectFile">
          Attach
        </label>
        <input type="file" id="selectFile" />
      </div>
      <div className={style.BoardBtnDiv}>
        <button className={style.BoardBtn} type="submit">
          작성
        </button>
        <button
          className={style.BoardBtn}
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
