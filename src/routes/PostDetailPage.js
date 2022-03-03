import { convertFromRaw } from 'draft-js';
import { EditorState } from 'draft-js';
import { Editor } from 'draft-js';
import {
  addDoc,
  collection,
  doc,
  getDoc,
  onSnapshot,
  orderBy,
  query,
  where,
} from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PostNavbar from '../components/PostNavbar';
import Posts from '../components/Posts';
import { dbService } from '../lib/fbase';
import styles from '../style/PostDetailPage.module.css';
const PostDetailPage = ({ user }) => {
  const params = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState();
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState('');
  const [editorContent, setEditorContent] = useState(EditorState.createEmpty());

  useEffect(() => {
    if (!params.clubId || !params.postId) return;
    setIsLoading(true);
    getDoc(doc(dbService, 'clubs', params.clubId, 'posts', params.postId))
      .then((res) => {
        if (!res.exists()) throw new Error('not-found');
        return res.data();
      })
      .then((res) => {
        setEditorContent(
          EditorState.createWithContent(convertFromRaw(JSON.parse(res.content)))
        );
        const date = new Date(res.createAt);
        date.setHours(date.getHours() + 9);
        const stringDate = date
          .toISOString()
          .replace('T', ' ')
          .substring(0, 16)
          .toString();
        return {
          ...res,
          createAt: stringDate,
        };
      })
      .then((res) => setData(res));
    const unsubscribe = onSnapshot(
      query(
        collection(dbService, 'comments'),
        orderBy('createAt', 'asc'),
        where('post', '==', params.postId)
      ),
      (querySnapshot) => {
        const update = querySnapshot.docs.map((doc) => {
          const date = new Date(doc.data().createAt);
          date.setHours(date.getHours() + 9);
          const stringDate = date
            .toISOString()
            .replace('T', ' ')
            .substring(0, 16)
            .toString();
          return {
            id: doc.id,
            ...doc.data(),
            createAt: stringDate,
          };
        });
        setComments(update);
      }
    );
    setIsLoading(false);
    return () => {
      unsubscribe();
    };
  }, [params]);

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setComment(value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    (async () => {
      await addDoc(collection(dbService, 'comments'), {
        author: user.displayName,
        uid: user.uid,
        comment,
        createAt: Date.now(),
        post: params.postId,
      });
    })();
    setComment('');
  };

  return (
    <div className={styles.wrapper}>
      <PostNavbar user={user} />
      {isLoading ? (
        'Loading...'
      ) : (
        <>
          {' '}
          <div className={styles.content}>
            <div className={styles.header}>
              <div className={styles.header_title}>
                <div className={styles.header_title_text}>{data?.title}</div>
              </div>
              <div className={styles.header_info}>
                <div className={styles.header_info_left}>
                  <div className={styles.header_info_left_avatar} />
                  <div className={styles.header_info_left_user}>
                    <div className={styles.header_info_left_user_name}>
                      {data?.creatorName}
                    </div>
                    <div className={styles.header_info_left_user_club}>
                      호완
                    </div>
                    <div className={styles.header_info_left_user_grade}>
                      동아리원
                    </div>
                  </div>
                </div>
                <div className={styles.header_info_right}>
                  <div className={styles.header_info_right_view}>
                    조회수: 178
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.body}>
              <div className={styles.body_main}>
                {data && <Editor readOnly={true} editorState={editorContent} />}
              </div>
              <div className={styles.updateBtn}>게시글 수정</div>
              <div className={styles.favBox}>
                <button type="button" className={styles.favBox_up}></button>
                <span className={styles.favBox_number}>↑74 ↓1</span>
                <button type="button" className={styles.favBox_down}></button>
              </div>
            </div>
          </div>
          <div className={styles.comment}>
            <div className={styles.comment_header}>댓글</div>
            {comments?.map((comment) => (
              <div key={comment.id} className={styles.comment_body}>
                <div className={styles.comment_body_info}>
                  <div className={styles.comment_body_info_avatar} />
                  <div className={styles.comment_body_info_name}>
                    {comment.author}
                  </div>
                  <div className={styles.comment_body_info_userInfo}>
                    <div className={styles.comment_body_info_userInfo_club}>
                      호완
                    </div>
                    <div className={styles.comment_body_info_userInfo_grade}>
                      동아리원
                    </div>
                  </div>
                </div>
                <div className={styles.comment_body_text}>
                  {comment.comment}
                </div>
                <div className={styles.comment_body_date}>
                  {comment.createAt}
                </div>
              </div>
            ))}
            <form onSubmit={onSubmit} className={styles.comment_input}>
              <div className={styles.comment_label}>댓글 쓰기</div>
              <textarea
                onChange={onChange}
                value={comment}
                className={styles.comment_text}
              />
              <button className={styles.comment_submit}>등록</button>
            </form>
            <div className={styles.comment_pagination}>
              <button className={styles.comment_pagination_btn}>◁</button>
              {[1, 2, 3].map((_, i) => (
                <span key={i} className={styles.comment_pagination_number}>
                  {_}
                </span>
              ))}
              <button className={styles.comment_pagination_btn}>▷</button>
            </div>
          </div>
          <div className={styles.other}>
            <div className={styles.other_title}>다른 게시글 보기</div>
            <Posts selectPostId={params.postId} />
          </div>
        </>
      )}
    </div>
  );
};

export default PostDetailPage;
