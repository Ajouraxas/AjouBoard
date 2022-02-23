import React from 'react';

const Pagination = ({ setSelectPageIndex, index }) => {
  const onClick = (e) => {
    const {
      target: { id },
    } = e;
    setSelectPageIndex(id);
  };
  return (
    <li onClick={onClick} id={index}>
      {index}
    </li>
  );
};

export default Pagination;
