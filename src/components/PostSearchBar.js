import React from 'react';

const PostSearchBar = () => {
  const onSubmit = (e) => {
    e.preventDefault();
    console.log(e.target[0].value);
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input type="text" placeholder="검색어 입력" />
        <button>검색</button>
      </form>
    </div>
  );
};

export default PostSearchBar;
