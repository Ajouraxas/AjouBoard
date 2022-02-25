import React from 'react';
import style from '../style/PostList.module.css';
/**
 * component: PostList
 * useFor: 게시글 조회
 */

const PostList = ({ creatorName, createAt, title }) => {
  return (
    <li className={style.PostList}>
      <span className={style.PostDate}>{createAt}</span>
      <span className={style.PostAuthor}>{creatorName}</span>
      <span className={style.PostTitle}>{title}</span>
    </li>
  );
};

export default PostList;
