import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';
import { dbService } from '../lib/fbase';
import React, { useEffect, useState } from 'react';
import PostList from '../components/PostList';
import PostMenu from '../components/PostMenu';
import PostNavbar from '../components/PostNavbar';
import PostSearchBar from '../components/PostSearchBar';
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

  useEffect(() => {
    const getPosts = async () => {
      const q =
        viewType !== 'all'
          ? query(
              collection(dbService, 'TEST'),
              where('postType', '==', viewType),
              orderBy('createAt', 'desc')
            )
          : query(collection(dbService, 'TEST'), orderBy('createAt', 'desc'));
      const docs = await getDocs(q);
      const postArray = docs.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPosts(postArray);
    };
    getPosts();
  }, [viewType]);
  return (
    // Navigation Bar (홈, 동아리 목록)
    <>
      <div>
        <PostNavbar setViewType={setViewType} />
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
      </div>
    </>
  );
};

export default ClubPage;
