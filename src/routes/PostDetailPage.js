import React from "react";
import styles from "../style/PostDetailPage.module.css";

const PostDetailPage = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.banner}>Banner</div>
      <div className={styles.nav}>Nav</div>
      <div className={styles.content}>
        <div className={styles.header}>
          <div className={styles.header_title}>Title</div>
          <div className={styles.header_info}>Info</div>
        </div>
        <div className={styles.body}>
          <div className={styles.body_main}>Body</div>
          <div className={styles.updateBtn}>Update</div>
          <div className={styles.favBox}>Fav</div>
        </div>
      </div>
      <div className={styles.comment}>
        <div className={styles.comment_header}>Comment</div>
        {[1, 2, 3, 4, 5, 6].map((_, i) => (
          <div key={i} className={styles.comment_body}>
            comment_{i}
          </div>
        ))}
        <div className={styles.comment_input}>
          <div className={styles.comment_label}>Label</div>
          <div className={styles.comment_text}>Text</div>
          <div className={styles.comment_submit}>Submit</div>
        </div>
        <div className={styles.comment_pagination}>Page</div>
      </div>
      <div className={styles.other}>
        <div className={styles.other_title}>Title</div>
        <div className={styles.other_body}>Body</div>
      </div>
    </div>
  );
};

export default PostDetailPage;
