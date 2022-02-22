import React from 'react';
import PostList from '../components/PostList';
import PostMenu from '../components/PostMenu';
import PostNavbar from '../components/PostNavbar';
/**
 * component: PostNavber
 * useFor: 동아리 공지사항, 전체글, 개추 받은 글, 글쓰기
 *
 * component: PostList
 * useFor: 게시글 조회
 */

const ClubPage = () => {
  // 공지사항 or 전체글 or 개추 받은 글

  return (
    // Navigation Bar (홈, 동아리 목록)
    <>
      <div>
        <PostNavbar />
      </div>
      <div>
        <PostMenu />
        <PostList />
      </div>
    </>
  );
};

export default ClubPage;
