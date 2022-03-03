import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  startAt,
  where,
} from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { dbService } from '../lib/fbase';
import style from '../style/Posts.module.css';

const Posts = ({ selectPostId }) => {
  const [posts, setPosts] = useState([]);
  const [countPageLimit, setCountPageLimit] = useState(1);
  const [selectPageIndex, setSelectPageIndex] = useState(1);
  const navigate = useNavigate();
  const { clubId } = useParams();
  const { search } = useLocation();
  const pageLimit = 20;
  useEffect(() => {
    const getPosts = async () => {
      // 예) selectPageIndex = 2, 1 ~ 21번째까지 불러오기
      const rawPostQ =
        viewType === 'all' || !viewType
          ? query(
              collection(dbService, `clubs/${clubId}/posts`),
              orderBy('createAt', 'desc'),
              limit(pageLimit * (selectPageIndex - 1) + 1)
            )
          : query(
              collection(dbService, `clubs/${clubId}/posts`),
              where('postType', '==', viewType),
              orderBy('createAt', 'desc'),
              limit(pageLimit * (selectPageIndex - 1) + 1)
            );
      const rawDocs = await getDocs(rawPostQ);
      if (!rawDocs.docs.length) {
        setPosts([]);
        return;
      }
      // 21번째 docs[20] 저장
      const lastVisible = rawDocs.docs[rawDocs.docs.length - 1];
      // 21번째 ~ 40번째 불러오기
      const postQ =
        viewType === 'all' || !viewType
          ? query(
              collection(dbService, `clubs/${clubId}/posts`),
              orderBy('createAt', 'desc'),
              startAt(lastVisible),
              limit(pageLimit)
            )
          : query(
              collection(dbService, `clubs/${clubId}/posts`),
              where('postType', '==', viewType),
              orderBy('createAt', 'desc'),
              startAt(lastVisible),
              limit(pageLimit)
            );
      const docs = await getDocs(postQ);
      const postArray = docs.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPosts(postArray);
    };

    const getCountPageLimit = async () => {
      // pagination
      const countPageLimitQ =
        viewType === 'all' || !viewType
          ? query(collection(dbService, `clubs/${clubId}/posts`))
          : query(
              collection(dbService, `clubs/${clubId}/posts`),
              where('postType', '==', viewType)
            );
      const allDocs = await getDocs(countPageLimitQ);
      setCountPageLimit(parseInt(Math.ceil(allDocs.docs.length / pageLimit)));
    };

    const getViewType = () => {
      const viewTypeQ = search.split('=');
      if (viewTypeQ[0] === '?view') {
        return viewTypeQ[1];
      }
    };
    const viewType = getViewType();
    getPosts();
    getCountPageLimit();
  }, [selectPageIndex, clubId, search, navigate]);

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
  const onClickPrevious = () => {
    setSelectPageIndex((prev) => prev - 9);
  };
  const onClickNext = () => {
    setSelectPageIndex((prev) => prev + 9);
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
            {posts?.map((post) => {
              const date = new Date(post.createAt);
              date.setHours(date.getHours() + 9);
              return (
                <li
                  className={`${style.postList} ${
                    selectPostId === post.id && style.selectPost
                  }`}
                  key={post.createAt}
                >
                  <span className={style.postDate}>{`${date
                    .toISOString()
                    .replace('T', ' ')
                    .substring(0, 16)}`}</span>
                  <span className={style.postAuthor}>{post.creatorName}</span>
                  <Link to={`/club/${clubId}/${post.id}`}>
                    <span className={style.postTitle}>{post.title}</span>
                  </Link>
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
            {selectPageIndex - 9 > 0 && (
              <button
                onClick={onClickPrevious}
                className={style.paginationBtn}
                key={'previous'}
              >
                이전
              </button>
            )}
            {pagination()}
            {selectPageIndex + 9 <= countPageLimit && (
              <button
                onClick={onClickNext}
                className={style.paginationBtn}
                key={'next'}
              >
                다음
              </button>
            )}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Posts;
