import React from 'react';

/**
 * component: PostList
 * useFor: 게시글 조회
 */

const PostList = ({ creatorName, createAt, title }) => {
  return (
    <li>
      <span style={{ marginRight: '20px' }}>{createAt}</span>
      <span style={{ marginRight: '20px' }}>{creatorName}</span>
      <span style={{ marginRight: '20px' }}>{title}</span>
    </li>
  );
};

export default PostList;
