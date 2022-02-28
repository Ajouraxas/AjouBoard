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
import PostNavbar from '../components/PostNavbar';
import Posts from '../components/Posts';
import { useParams } from 'react-router-dom';

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
  const pageLimit = 20;
  const { clubId } = useParams();
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

    getPosts();
    getCountPageLimit();
  }, [viewType, selectPageIndex]);

  return (
    // Navigation Bar (홈, 동아리 목록)
    <>
      <div>
        <PostNavbar
          viewType={viewType}
          setViewType={setViewType}
          setSelectPageIndex={setSelectPageIndex}
          clubId={clubId}
        />
      </div>

      <Posts
        posts={posts}
        selectPageIndex={selectPageIndex}
        countPageLimit={countPageLimit}
        setSelectPageIndex={setSelectPageIndex}
      />
    </>
  );
};

export default ClubPage;
