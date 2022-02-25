import React from 'react';
import style from '../style/Pagination.module.css';
const Pagination = ({
  setSelectPageIndex,
  selectPageIndex,
  countPageLimit,
}) => {
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
  );
};

export default Pagination;
