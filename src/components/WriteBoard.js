import React, { useState } from 'react';
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import style from '../style/WriteBoard.module.css';
import { useNavigate } from 'react-router-dom';

const WriteBoard = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState(EditorState.createEmpty());
  const navigate = useNavigate();
  const onEditorStateChange = (state) => {
    setContent(state);
  };
  const cancelWriting = (e) => {
    e.preventDefault();
    navigate(-1);
  };
  const onChangeTitle = (e) => {
    const {
      target: { value },
    } = e;
    setTitle(value);
  };
  return (
    <>
      <span className={style.boardBanner}>새로운 게시물 작성</span>
      <textarea
        className={style.boardTitle}
        onChange={onChangeTitle}
        placeholder="제목"
        required
        maxLength={40}
        value={title}
      ></textarea>
      <Editor
        placeholder="ㅎㅇ"
        wrapperClassName={style.editorWrapper}
        toolbarClassName={style.toolbar}
        editorClassName={style.editor}
        editorState={content}
        onEditorStateChange={onEditorStateChange}
        toolbar={{
          options: [
            'inline',
            'blockType',
            'list',
            'textAlign',
            'link',
            'history',
          ],
          inline: {
            inDropdown: false,
            options: [
              'bold',
              'italic',
              'underline',
              'strikethrough',
              'monospace',
            ],
          },
          blockType: {
            inDropdown: true,
            options: [
              'Normal',
              'H1',
              'H2',
              'H3',
              'H4',
              'H5',
              'H6',
              'Blockquote',
            ],
          },
          list: { inDropdown: true },
          textAlign: { inDropdown: false },
          link: { inDropdown: false },
          history: { inDropdown: false },
        }}
      />
      <input
        type={'hidden'}
        value={
          content && JSON.stringify(convertToRaw(content.getCurrentContent()))
        }
      />
      <div>
        <button className={style.boardBtn} type="submit">
          게시글 올리기
        </button>
        <button
          className={style.boardBtn}
          type="button"
          onClick={cancelWriting}
        >
          취소
        </button>
      </div>
    </>
  );
};

export default WriteBoard;
