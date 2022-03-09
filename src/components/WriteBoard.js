import React, { useEffect, useState } from 'react';
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import style from '../style/writeBoard.module.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { convertFromRaw } from 'draft-js';
import { storageService } from '../lib/fbase';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import uuid from 'draft-js/lib/uuid';

const WriteBoard = ({ prevImagesId, prevTitle, prevContent, uid }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState(EditorState.createEmpty());
  const [imageId, setImageId] = useState([]);
  const { pathname } = useLocation();
  const banner = pathname.split('/');
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

  const uploadCallback = async (file) => {
    const imageUuid = uuid();
    const imageRef = ref(storageService, `user/${uid}/imgs/${imageUuid}`);
    await uploadBytes(imageRef, file);
    const imageUrl = await getDownloadURL(imageRef);
    setImageId((prev) => [...prev, imageUuid]);
    return new Promise((resolve) => {
      resolve({
        data: {
          link: imageUrl,
        },
      });
    });
  };
  useEffect(() => {
    const settingPost = () => {
      if (prevTitle && prevContent) {
        setTitle(prevTitle);
        if (prevImagesId) {
          setImageId(prevImagesId);
        }
        setContent(
          EditorState.createWithContent(convertFromRaw(JSON.parse(prevContent)))
        );
      }
    };
    settingPost();
  }, [prevTitle, prevContent, prevImagesId]);
  return (
    <>
      <div className={style.contentSize}>
        <span className={style.boardBanner}>
          {banner[3] === 'write'
            ? '게시글 작성'
            : banner[4] === 'update' && '게시글 수정하기'}
        </span>
        <textarea
          className={style.boardTitle}
          onChange={onChangeTitle}
          placeholder="제목"
          required
          maxLength={40}
          value={title}
        ></textarea>
        <Editor
          placeholder="내용"
          wrapperClassName={style.editorWrapper}
          toolbarClassName={style.toolbar}
          editorClassName={style.editor}
          editorState={content}
          onEditorStateChange={onEditorStateChange}
          toolbar={{
            options: [
              'inline',
              'fontSize',
              'colorPicker',
              'textAlign',
              'image',
            ],
            inline: {
              inDropdown: false,
              options: ['bold', 'italic', 'underline', 'strikethrough'],
            },
            fontSize: {
              options: [
                8, 9, 10, 11, 12, 14, 16, 18, 24, 30, 36, 48, 60, 72, 96,
              ],
            },
            textAlign: {
              options: ['left', 'center', 'right'],
            },
            colorPicker: {
              colors: [
                'rgb(97,189,109)',
                'rgb(26,188,156)',
                'rgb(84,172,210)',
                'rgb(44,130,201)',
                'rgb(147,101,184)',
                'rgb(71,85,119)',
                'rgb(204,204,204)',
                'rgb(65,168,95)',
                'rgb(0,168,133)',
                'rgb(61,142,185)',
                'rgb(41,105,176)',
                'rgb(85,57,130)',
                'rgb(40,50,78)',
                'rgb(0,0,0)',
                'rgb(247,218,100)',
                'rgb(251,160,38)',
                'rgb(235,107,86)',
                'rgb(226,80,65)',
                'rgb(163,143,132)',
                'rgb(239,239,239)',
                'rgb(255,255,255)',
                'rgb(250,197,28)',
                'rgb(243,121,52)',
                'rgb(209,72,65)',
                'rgb(184,49,47)',
                'rgb(124,112,107)',
                'rgb(209,213,216)',
              ],
            },
            image: {
              urlEnabled: true,
              uploadEnabled: true,
              alignmentEnabled: true,
              uploadCallback: uploadCallback,
              previewImage: true,
              inputAccept: 'image/gif,image/jpeg,image/jpg,image/png,image/svg',
              alt: { present: false, mandatory: false },
              defaultSize: {
                height: 'auto',
                width: 'auto',
              },
            },
          }}
        />
        <input
          type={'hidden'}
          value={
            content && JSON.stringify(convertToRaw(content.getCurrentContent()))
          }
        />
        <input type={'hidden'} value={imageId} />
        <div>
          <button className={style.boardBtn} type="submit">
            작성
          </button>
          <button
            className={style.boardBtn}
            type="button"
            onClick={cancelWriting}
          >
            취소
          </button>
        </div>
      </div>
    </>
  );
};

export default WriteBoard;
