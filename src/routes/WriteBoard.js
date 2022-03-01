import { addDoc, collection, query } from 'firebase/firestore';
import React , {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { dbService } from '../lib/fbase';
import style from '../style/writeBoard.module.css';
import MyEditor from "../components/draft"

const WriteBoard = () => {
  const navigate = useNavigate();
  const cancelWriting = (e) => {
    e.preventDefault();
    navigate(-1);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const { target } = e;
    const q = query(collection(dbService, 'TEST'));
    addDoc(q, {
      content: target[1].value,
      createAt: Date.now(),
      creatorName: '김세현',
      postType: 'all',
      title: target[0].value,
    });
    navigate(-1);
  };
  const [value, setValue] = useState('');
  return (
    <form className={style.boardForm} onSubmit={onSubmit}>
      <span className={style.boardBanner}>새로운 게시물 작성</span>
      <textarea
        className={style.boardTitle}
        name="title"
        placeholder="제목"
        required
        maxLength={40}
      ></textarea>
      <MyEditor />
      {/*<textarea
        className={style.boardContent}
        name="content"
        placeholder="내용은 2800자까"
        maxLength={2800}
        required
      ></textarea>*/}
      <div>
        <button className={style.boardBtn} type="submit">
          게시글 올리기
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
