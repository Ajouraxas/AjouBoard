import React from 'react';

/**
 * component: PostList
 * useFor: 게시글 조회
 */

const PostList = ({ creatorName, createAt, title }) => {
  return (
    <div>
      <li>
        <span>{createAt}</span>
        <span>{creatorName}</span>
        <span>{title}</span>
      </li>
    </div>
  );
};

export default PostList;
