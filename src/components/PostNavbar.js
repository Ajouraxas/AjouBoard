import React from 'react';
import style from '../style/PostNavbar.module.css';

/**
 * component: PostNavber
 * useFor: 동아리 공지사항, 전체글, 개추 받은 글, 글쓰기
 */

const PostNavbar = ({
  viewType,
  setViewType,
  setSelectPageIndex,
  setIsWriting,
  isWriting,
}) => {
  const onClick = (e) => {
    const {
      target: { id },
    } = e;
    setViewType(id);
    setSelectPageIndex(1);
  };
  const onWrite = () => {
    setIsWriting(true);
  };
  return (
    <>
      <div className={style.topBanner}>

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
          전체글
        </li>
        <li
          className={`${style.navLiLast} ${
            viewType === 'popular' ? style.navSelect : ''
          }`}
          id={'popular'}
          onClick={onClick}
        >
          개추 받은 글
        </li>
        {isWriting ? null : (
          <button className={style.navBtn} onClick={onWrite}>
            글쓰기
          </button>
        )}
      </ul>
    </>
  );
};

export default PostNavbar;