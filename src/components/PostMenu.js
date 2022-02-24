import React from 'react';

const PostMenu = () => {
  return (
    <div>
      <ul style={{ listStyle: 'none' }}>
        <li style={{ marginRight: '20px', float: 'left' }}>날짜</li>
        <li style={{ marginRight: '20px', float: 'left' }}>글쓴이</li>
        <li style={{ marginRight: '20px' }}>제목</li>
      </ul>
    </div>
  );
};

export default PostMenu;
