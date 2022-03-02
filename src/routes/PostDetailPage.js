import { convertFromRaw } from 'draft-js';
import { EditorState } from 'draft-js';
import { Editor } from 'draft-js';
import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PostNavbar from '../components/PostNavbar';
import Posts from '../components/Posts';
import { dbService } from '../lib/fbase';
import styles from '../style/PostDetailPage.module.css';
const PostDetailPage = ({ user }) => {
  const params = useParams();
  const [data, setData] = useState();
  const [editorContent, setEditorContent] = useState(EditorState.createEmpty());

  useEffect(() => {
    if (!params.clubId || !params.postId) return;
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
  }, [params]);

  return (
    <div className={styles.wrapper}>
      <PostNavbar user={user} />
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
                <div className={styles.header_info_left_user_club}>호완</div>
                <div className={styles.header_info_left_user_grade}>
                  동아리원
                </div>
              </div>
            </div>
            <div className={styles.header_info_right}>
              <div className={styles.header_info_right_view}>조회수: 178</div>
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
        {[1, 2, 3, 4, 5, 6].map((_, i) => (
          <div key={i} className={styles.comment_body}>
            <div className={styles.comment_body_info}>
              <div className={styles.comment_body_info_avatar} />
              <div className={styles.comment_body_info_name}>올블루 탐험가</div>
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
              이 상자의 가로는 700(피그마에서는 707), 높이는 60입니다. 이 상자의
              가로는 700(피그마에서는 707), 높이는 60입니다. 이 상자의 가로는
              700(피그마에서는 707), 높이는 60입니다. 이 상자의 가로는
              700(피그마에서는 707), 높이는 60입니다. 이 상자의 가로는
              700(피그마에서는 707), 높이는 60입니다. 이 상자의 가로는
              700(피그마에서는 707), 높이는 60입니다. 이 상자의 가로는
              700(피그마에서는 707), 높이는 60입니다. 이 상자의 가로는
              700(피그마에서는 707), 높이는 60입니다. 이 상자의 가로는
              700(피그마에서는 707), 높이는 60입니다. 이 상자의 가로는
              700(피그마에서는 707), 높이는 60입니다. 이 상자의 가로는
              700(피그마에서는 707), 높이는 60입니다. 이 상자의 가로는
              700(피그마에서는 707), 높이는 60입니다. 이 상자의 가로는
              700(피그마에서는 707), 높이는 60입니다. 이 상자의 가로는
              700(피그마에서는 707), 높이는 60입니다.
              <div className={styles.comment_body_date}>2022-02-20 16:20</div>
            </div>
          </div>
        ))}
        <div className={styles.comment_input}>
          <div className={styles.comment_label}>댓글 쓰기</div>
          <textarea className={styles.comment_text} />
          <div className={styles.comment_submit}>등록</div>
        </div>
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
        <Posts />
      </div>
    </div>
  );
};

export default PostDetailPage;
