import React from 'react';
import style from '../style/Posts.module.css';

const Posts = ({
  posts,
  selectPageIndex,
  countPageLimit,
  setSelectPageIndex,
}) => {
  const onClickSearch = (e) => {
    e.preventDefault();
  };
  const onClick = (e) => {
    const {
      target: { id },
    } = e;
    setSelectPageIndex(Number(id));
  };
  const pagination = () => {
    let temp = [];
    let left = 1;
    let right = 1;
    // 1 2 3 4 5 6
    // countPageLimit 10 selectPageIndex 9,  3 4 5 6 7 8 9 10 11
    // countPageLimit 20 selectPageIndex 17, 13 14 15 16 17 18 19 20 21
    // selectPageIndex 7
    temp.push(paginationList(selectPageIndex));
    //selectPageIndex = 2, countPageLimit = 4
    for (let i = 0; i < (countPageLimit > 8 ? 8 : countPageLimit - 1); i++) {
      if (i < 4) {
        temp =
          selectPageIndex - left > 0
            ? [paginationList(selectPageIndex - left), ...temp]
            : [...temp, paginationList(selectPageIndex + right)];
        if (selectPageIndex - left > 0) {
          left = left + 1;
        } else {
          right = right + 1;
        }
      } else if (i >= 4) {
        temp =
          selectPageIndex + right <= countPageLimit
            ? [...temp, paginationList(selectPageIndex + right)]
            : [paginationList(selectPageIndex - left), ...temp];
        if (selectPageIndex + right <= countPageLimit) {
          right = right + 1;
        } else {
          left = left + 1;
        }
      }
    }
    return temp;
  };
  const paginationList = (id) => {
    return (
      <li
        className={
          id === selectPageIndex ? style.SelectPaginationLi : style.PaginationLi
        }
        key={id}
        id={id}
        onClick={onClick}
      >
        {id}
      </li>
    );
  };

  return (
    <>
      <div>
        <div>
          <ul className={style.MenuUl}>
            <li className={style.MenuDate}>날짜</li>
            <li className={style.MenuAuthor}>글쓴이</li>
            <li className={style.MenuTitle}>제목</li>
          </ul>
        </div>
        <ul className={style.PostUl}>
          {posts.map((post) => (
            <li className={style.PostList} key={post.createAt}>
              <span className={style.PostDate}>{post.createAt}</span>
              <span className={style.PostAuthor}>{post.creatorName}</span>
              <span className={style.PostTitle}>{post.title}</span>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <div>
          <form className={style.SearchForm}>
            <input
              className={style.SearchInput}
              type="text"
              placeholder="검색어 입력"
            />
            <button onClick={onClickSearch} className={style.SearchBtn}>
              검색
            </button>
          </form>
        </div>
        <ul className={style.PaginationUl}>
          {' '}
          <button className={style.PaginationBtn} key={'previous'}>
            이전
          </button>
          {pagination()}
          <button className={style.PaginationBtn} key={'next'}>
            다음
          </button>
        </ul>
      </div>
    </>
  );
};

export default Posts;
