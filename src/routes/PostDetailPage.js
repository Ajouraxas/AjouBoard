import React from 'react';
import Posts from '../components/Posts';
import styles from '../style/PostDetailPage.module.css';

const PostDetailPage = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.banner}>Banner</div>
      <div className={styles.nav}>
        <ul className={styles.nav_list}>
          <li id={'announce'}>공지사항</li>
          <li id={'all'}>전체글</li>
          <li id={'popular'}>개추 받은 글</li>
        </ul>
        <button type="button" className={styles.nav_write}>
          글쓰기
        </button>
      </div>
      <div className={styles.content}>
        <div className={styles.header}>
          <div className={styles.header_title}>
            <div className={styles.header_title_text}>
              [공지사항] 18학번 이웅희 레프트 훅으로 김형건 술집에서 사람 재운거
              실화냐?
            </div>
          </div>
          <div className={styles.header_info}>
            <div className={styles.header_info_left}>
              <div className={styles.header_info_left_avatar} />
              <div className={styles.header_info_left_user}>
                <div className={styles.header_info_left_user_name}>
                  Hack-sick
                </div>
                <div className={styles.header_info_left_user_club}>호완</div>
                <div className={styles.header_info_left_user_grade}>
                  동아리원
                </div>
              </div>
            </div>
            <div className={styles.header_info_right}>
              <div className={styles.header_info_right_date}>
                2022-02-20 16:20
              </div>
              <div className={styles.header_info_right_view}>조회수: 178</div>
            </div>
          </div>
        </div>
        <div className={styles.body}>
          <div className={styles.body_main}>Body</div>
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
        {/* <div className={styles.other_body}>Body</div> */}
      </div>
    </div>
  );
};

export default PostDetailPage;
