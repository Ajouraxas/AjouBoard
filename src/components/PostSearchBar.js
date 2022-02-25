import React from 'react';
import style from '../style/PostSearchBar.module.css';

const PostSearchBar = () => {
  const onSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div>
      <form className={style.SearchForm} onSubmit={onSubmit}>
        <input
          className={style.SearchInput}
          type="text"
          placeholder="검색어 입력"
        />
        <button className={style.SearchBtn}>검색</button>
      </form>
    </div>
  );
};

export default PostSearchBar;
