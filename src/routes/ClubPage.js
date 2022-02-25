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
import WriteBoard from '../components/WriteBoard';
import postStyle from '../style/PostList.module.css';
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
  const [countPageLimit, setCountPageLimit] = useState(1);
  const [isWriting, setIsWriting] = useState(false);
  const pageLimit = 20;

  useEffect(() => {
    const getPosts = async () => {
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
      if (!rawDocs.docs.length) {
        setPosts([]);
        return;
      }
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

    const getCountPageLimit = async () => {
      // pagination
      const countPageLimitQ =
        viewType === 'all'
          ? query(collection(dbService, 'TEST'))
          : query(
              collection(dbService, 'TEST'),
              where('postType', '==', viewType)
            );
      const allDocs = await getDocs(countPageLimitQ);
      setCountPageLimit(parseInt(Math.ceil(allDocs.docs.length / pageLimit)));
    };
    if (!isWriting) {
      getPosts();
      getCountPageLimit();
    }
  }, [viewType, selectPageIndex, isWriting]);

  return (
    // Navigation Bar (홈, 동아리 목록)
    <>
      <div>
        <PostNavbar
          viewType={viewType}
          setViewType={setViewType}
          setSelectPageIndex={setSelectPageIndex}
          setIsWriting={setIsWriting}
          isWriting={isWriting}
        />
      </div>
      {isWriting ? (
        <WriteBoard
          setSelectPageIndex={setSelectPageIndex}
          setIsWriting={setIsWriting}
        />
      ) : (
        <>
          <div>
            <PostMenu />
            <ul className={postStyle.PostUl}>
              {posts.map((post) => (
                <PostList
                  creatorName={post.creatorName}
                  key={post.index}
                  createAt={post.createAt}
                  title={post.title}
                />
              ))}
            </ul>
          </div>
          <div>
            <PostSearchBar />
            <Pagination
              countPageLimit={countPageLimit}
              setSelectPageIndex={setSelectPageIndex}
              selectPageIndex={selectPageIndex}
            />
          </div>
        </>
      )}
    </>
  );
};

export default ClubPage;
