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
          id === selectPageIndex ? style.selectPaginationLi : style.paginationLi
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
      <div className={style.postsContainer}>
        <div>
          <div>
            <ul className={style.menuUl}>
              <li className={style.menuDate}>날짜</li>
              <li className={style.menuAuthor}>글쓴이</li>
              <li className={style.menuTitle}>제목</li>
            </ul>
          </div>
          <ul className={style.postUl}>
            {posts.map((post) => {
              const date = new Date(post.createAt);
              date.setHours(date.getHours() + 9);
              return (
                <li className={style.postList} key={post.createAt}>
                  <span className={style.postDate}>{`${date
                    .toISOString()
                    .replace('T', ' ')
                    .substring(0, 16)}`}</span>
                  <span className={style.postAuthor}>{post.creatorName}</span>
                  <span className={style.postTitle}>{post.title}</span>
                </li>
              );
            })}
          </ul>
        </div>
        <div>
          <div>
            <form className={style.searchForm}>
              <input
                className={style.searchInput}
                type="text"
                placeholder="검색어 입력"
              />
              <button onClick={onClickSearch} className={style.searchBtn}>
                검색
              </button>
            </form>
          </div>
          <ul className={style.paginationUl}>
            {' '}
            <button className={style.paginationBtn} key={'previous'}>
              이전
            </button>
            {pagination()}
            <button className={style.paginationBtn} key={'next'}>
              다음
            </button>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Posts;
