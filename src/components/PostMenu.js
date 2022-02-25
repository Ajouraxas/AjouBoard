import React from 'react';
import style from '../style/PostMenu.module.css';
const PostMenu = () => {
  return (
    <div>
      <ul className={style.MenuUl}>
        <li className={style.MenuDate}>날짜</li>
        <li className={style.MenuAuthor}>글쓴이</li>
        <li className={style.MenuTitle}>제목</li>
      </ul>
    </div>
  );
};

export default PostMenu;
