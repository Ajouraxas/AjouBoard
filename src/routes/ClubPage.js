import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  startAt,
  where,
} from 'firebase/firestore';
import { dbService } from '../lib/fbase';
import React, { useEffect, useState } from 'react';
import PostList from '../components/PostList';
import PostMenu from '../components/PostMenu';
import PostNavbar from '../components/PostNavbar';
import PostSearchBar from '../components/PostSearchBar';
import Pagination from '../components/Pagination';
/**
 * component: PostNavber
 * useFor: 동아리 공지사항, 전체글, 개추 받은 글, 글쓰기
 *
 * component: PostList
 * useFor: 게시글 조회
 */

/* const ALL = 'all';
  const ANNOUNCE = 'announce';
  const POPULAR = 'popular';
 */

const ClubPage = () => {
  // 공지사항 or 전체글 or 개추 받은 글
  const [posts, setPosts] = useState([]);
  const [viewType, setViewType] = useState('all');
  const [selectPageIndex, setSelectPageIndex] = useState(1);
  const [countLimit, setCountLimit] = useState(1);
  const pageLimit = 2;
  useEffect(() => {
    const getPosts = async () => {
      // pagination
      const countLimitQ =
        viewType === 'all'
          ? query(collection(dbService, 'TEST'))
          : query(
              collection(dbService, 'TEST'),
              where('postType', '==', viewType)
            );
      const allDocs = await getDocs(countLimitQ);
      setCountLimit(parseInt(allDocs.docs.length / (pageLimit + 1) + 1));
      // 예) selectPageIndex = 2, 1 ~ 21번째까지 불러오기
      const rawPostQ =
        viewType !== 'all'
          ? query(
              collection(dbService, 'TEST'),
              where('postType', '==', viewType),
              orderBy('createAt', 'desc'),
              limit(pageLimit * (selectPageIndex - 1) + 1)
            )
          : query(
              collection(dbService, 'TEST'),
              orderBy('createAt', 'desc'),
              limit(pageLimit * (selectPageIndex - 1) + 1)
            );
      const rawDocs = await getDocs(rawPostQ);
      // 21번째 docs[20] 저장
      const lastVisible = rawDocs.docs[rawDocs.docs.length - 1];
      // 21번째 ~ 40번째 불러오기
      const postQ =
        viewType !== 'all'
          ? query(
              collection(dbService, 'TEST'),
              where('postType', '==', viewType),
              orderBy('createAt', 'desc'),
              startAt(lastVisible),
              limit(pageLimit)
            )
          : query(
              collection(dbService, 'TEST'),
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
    getPosts();
  }, [viewType, selectPageIndex]);

  const pagination = () => {
    let temp = [];
    let left = 1;
    let right = 1;
    // 1 2 3 4 5 6
    // countLimit 10 selectPageIndex 9,  3 4 5 6 7 8 9 10 11
    // countLimit 20 selectPageIndex 17, 13 14 15 16 17 18 19 20 21
    // selectPageIndex 7
    temp.push(
      <Pagination
        key={selectPageIndex}
        index={selectPageIndex}
        setSelectPageIndex={setSelectPageIndex}
      />
    );
    //selectPageIndex = 2, countLimit = 2
    for (let i = 0; i < (countLimit > 8 ? 8 : countLimit - 1); i++) {
      if (i < 4) {
        temp =
          selectPageIndex - left > 0
            ? [
                <Pagination
                  key={selectPageIndex - left}
                  index={selectPageIndex - left}
                  setSelectPageIndex={setSelectPageIndex}
                />,
                ...temp,
              ]
            : [
                ...temp,
                <Pagination
                  key={selectPageIndex + right}
                  index={selectPageIndex + right}
                  setSelectPageIndex={setSelectPageIndex}
                />,
              ];
        if (selectPageIndex - left > 0) {
          left = left - 1;
        } else {
          right = right + 1;
        }
      } else if (i >= 4) {
        temp =
          selectPageIndex + right <= countLimit
            ? [
                ...temp,
                <Pagination
                  key={selectPageIndex + right}
                  index={selectPageIndex + right}
                  setSelectPageIndex={setSelectPageIndex}
                />,
              ]
            : [
                <Pagination
                  key={selectPageIndex - left}
                  index={selectPageIndex - left}
                  setSelectPageIndex={setSelectPageIndex}
                />,
                ...temp,
              ];
        if (selectPageIndex + right <= countLimit) {
          right = right + 1;
        } else {
          left = left - 1;
        }
      }
    }
    return temp;
  };

  return (
    // Navigation Bar (홈, 동아리 목록)
    <>
      <div>
        <PostNavbar
          setViewType={setViewType}
          setSelectPageIndex={setSelectPageIndex}
        />
      </div>
      <div>
        <PostMenu />
        {posts.map((post) => (
          <PostList
            creatorName={post.creatorName}
            key={post.id}
            createAt={post.createAt}
            title={post.title}
          />
        ))}
      </div>
      <div>
        <PostSearchBar />
        {pagination()}
      </div>
    </>
  );
};

export default ClubPage;
