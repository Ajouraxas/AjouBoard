import { addDoc, collection, query } from 'firebase/firestore';
import React , {useState} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { dbService } from '../lib/fbase';
import style from '../style/writeBoard.module.css';
import MyEditor from "../components/draft"

const WriteBoard = ({ user: { displayName, uid } }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();
  const {
    state: { clubId },
  } = useLocation();
  const cancelWriting = (e) => {
    e.preventDefault();
    navigate(-1);
  };
  const onChangeTitle = (e) => {
    const {
      target: { value },
    } = e;
    setTitle(value);
  };
  const onChangeContent = (e) => {
    const {
      target: { value },
    } = e;
    setContent(value);
  };
  const onSubmit = (e) => {
    e.preventDefault();
    const q = query(collection(dbService, `clubs/${clubId}/posts`));
    addDoc(q, {
      uid,
      content,
      createAt: Date.now(),
      creatorName: displayName,
      postType: 'all',
      title: title,
    });
    navigate(-1);
  };
  const [value, setValue] = useState('');
  return (
    <form className={style.boardForm} onSubmit={onSubmit}>
      <span className={style.boardBanner}>새로운 게시물 작성</span>
      <textarea
        className={style.boardTitle}
        onChange={onChangeTitle}
        placeholder="제목"
        required
        maxLength={40}
        value={title}
      ></textarea>
      <MyEditor />
      {/*<textarea
        className={style.boardContent}
        onChange={onChangeContent}
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