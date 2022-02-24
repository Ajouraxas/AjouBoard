import React from 'react';

/**
 * component: PostNavber
 * useFor: 동아리 공지사항, 전체글, 개추 받은 글, 글쓰기
 */

const PostNavbar = ({
  setViewType,
  setSelectPageIndex,
  setIsWriting,
  isWriting,
}) => {
  const onClick = (e) => {
    const {
      target: { id },
    } = e;
    setViewType(id);
    setSelectPageIndex(1);
  };
  const onWrite = () => {
    setIsWriting(true);
  };
  return (
    <>
      <ul style={{ listStyle: 'none' }}>
        <li
          style={{ marginRight: '20px', float: 'left' }}
          id={'announce'}
          onClick={onClick}
        >
          공지사항
        </li>
        <li
          style={{ marginRight: '20px', float: 'left' }}
          id={'all'}
          onClick={onClick}
        >
          전체글
        </li>
        <li
          style={{ marginRight: '20px', float: 'left' }}
          id={'popular'}
          onClick={onClick}
        >
          개추 받은 글
        </li>
      </ul>
      {isWriting ? null : <button onClick={onWrite}>글쓰기</button>}
    </>
  );
};

export default PostNavbar;
