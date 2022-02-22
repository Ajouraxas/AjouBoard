import React from 'react';

/**
 * component: PostNavber
 * useFor: 동아리 공지사항, 전체글, 개추 받은 글, 글쓰기
 */

const PostNavbar = () => {
  return (
    <>
      <ul>
        <li>동아리 공지사항</li>
        <li>전체글</li>
        <li>개추 받은 글</li>
      </ul>
      <button>글쓰기</button>
    </>
  );
};

export default PostNavbar;
