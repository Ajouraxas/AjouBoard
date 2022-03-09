import { convertFromRaw } from 'draft-js';
import { EditorState } from 'draft-js';
import {
  addDoc,
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  increment,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PostNavbar from '../components/PostNavbar';
import Posts from '../components/Posts';
import ShowEditor from '../components/ShowEditor';
import Spinner from '../components/Spinner';
import { dbService, storageService } from '../lib/fbase';
import styles from '../style/PostDetailPage.module.css';
import logo_ajou_1 from '../asset/img/logo_ajou_1.png';
import logo_ajou_2 from '../asset/img/logo_ajou_2.png';
import { deleteObject, ref } from 'firebase/storage';

const PostDetailPage = ({ user }) => {
  const params = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState();
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState('');
  const [editorContent, setEditorContent] = useState(EditorState.createEmpty());
  const [postOwnerCheck, setPostOwnerCheck] = useState('');
  const [userTitle, setUserTitle] = useState();

  useEffect(() => {
    setIsLoading(true);

    if (!params.clubId || !params.postId) return;

    (async () => {
      await updateDoc(
        doc(dbService, `/clubs/${params.clubId}/posts`, params.postId),
        {
          views: increment(1),
        }
      );
      getDoc(doc(dbService, 'clubs', params.clubId, 'posts', params.postId))
        .then((res) => {
          if (!res.exists()) throw new Error('not-found');
          return res.data();
        })
        .then((res) => {
          setEditorContent(
            EditorState.createWithContent(
              convertFromRaw(JSON.parse(res.content))
            )
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
        .then((res) => {
          setData(res);
          return getDocs(
            query(collection(dbService, 'users'), where('id', '==', res.uid))
          );
        })
        .then((res) => {
          const clubPosition = res.docs[0].data().clubPosition;
          if (clubPosition[0] === params.clubId) {
            if (clubPosition[1] === 'admin') {
              setPostOwnerCheck('관리자');
            } else {
              setPostOwnerCheck('동아리원');
            }
          } else {
            setPostOwnerCheck('귀요미');
          }
        });
    })();

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
  const onPostUpdate = () => {
    navigate(`/club/${params.clubId}/${params.postId}/update`);
  };
  const onPostDelete = async () => {
    if (window.confirm('정말 게시글을 삭제하시겠습니까?')) {
      const docData = await getDoc(
        doc(dbService, `clubs/${params.clubId}/posts`, params.postId)
      );
      if (docData.data().imageId) {
        const imageIds = docData.data().imageId.split([',']);
        imageIds.forEach(async (imageId) => {
          await deleteObject(
            ref(storageService, `user/${user.uid}/imgs/${imageId}`)
          );
        });
      }

      await deleteDoc(
        doc(dbService, `clubs/${params.clubId}/posts`, params.postId)
      );
      const deleteDocs = await getDocs(
        query(
          collection(dbService, 'comments'),
          where('post', '==', params.postId)
        )
      );
      deleteDocs.docs.forEach(async (delDoc) => {
        await deleteDoc(delDoc.ref);
      });
      navigate(`/club/${params.clubId}`);
    }
  };

  const onCommentDelete = async (event) => {
    const {
      target: { value: commentId },
    } = event;
    (async () => {
      await deleteDoc(doc(dbService, 'comments', commentId));
    })();
  };

  const onRecommendUp = async () => {
    if (!user) {
      return navigate(`/login`);
    }
    const checkDoc = await getDoc(
      doc(dbService, `clubs/${params.clubId}/posts`, params.postId)
    );
    if (checkDoc.data().recommendUser.includes(user.uid)) {
      return window.alert('이미 추천을 누르셨습니다.');
    }
    let postType = 'all';
    if (
      checkDoc.data().plusRecommendCount -
        checkDoc.data().minusRecommendCount >=
      4
    ) {
      postType = 'popular';
    }
    await updateDoc(
      doc(dbService, `clubs/${params.clubId}/posts`, params.postId),
      {
        plusRecommendCount: increment(1),
        recommendUser: arrayUnion(user.uid),
        postType,
      }
    );
    setData((prev) => {
      let copyOfObject = { ...prev };
      copyOfObject.plusRecommendCount = prev.plusRecommendCount + 1;
      return copyOfObject;
    });
  };

  const onRecommendDown = async () => {
    if (!user) {
      return navigate(`/login`);
    }
    const checkDoc = await getDoc(
      doc(dbService, `clubs/${params.clubId}/posts`, params.postId)
    );
    if (checkDoc.data().recommendUser.includes(user.uid)) {
      return window.alert('이미 추천누르셨습니다.');
    }
    await updateDoc(
      doc(dbService, `clubs/${params.clubId}/posts`, params.postId),
      {
        minusRecommendCount: increment(1),
        recommendUser: arrayUnion(user.uid),
      }
    );
    setData((prev) => {
      let copyOfObject = { ...prev };
      copyOfObject.minusRecommendCount = prev.minusRecommendCount + 1;
      return copyOfObject;
    });
  };
  const getUserTitle = async (uid) => {
    const userData = await getDocs(
      query(collection(dbService, 'users'), where('id', '==', uid))
    );
    const clubPosition = userData.docs[0].data().clubPosition;
    if (clubPosition[0] === params.clubId) {
      if (clubPosition[1] === 'admin') {
        setUserTitle('관리자');
      } else {
        setUserTitle('동아리원');
      }
    } else {
      setUserTitle('귀요미');
    }
  };
  return (
    <>
      {!data || isLoading ? (
        <Spinner />
      ) : (
        <div className={styles.wrapper}>
          <PostNavbar user={user} />{' '}
          <div className={styles.content}>
            <div className={styles.header}>
              <div className={styles.header_title}>
                <div className={styles.header_title_text}>{data.title}</div>
              </div>
              <div className={styles.header_info}>
                <div className={styles.header_info_left}>
                  <img
                    className={styles.header_info_left_avatar}
                    src={logo_ajou_1}
                    alt={'logo_ajou'}
                  />

                  <div className={styles.header_info_left_user}>
                    <div className={styles.header_info_left_user_name}>
                      {data.creatorName}
                    </div>
                    <div className={styles.header_info_left_user_grade}>
                      {postOwnerCheck}
                    </div>
                  </div>
                </div>
                <div className={styles.header_info_right}>
                  <div className={styles.header_info_right_view}>
                    조회수 {data.views}
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.body}>
              <div className={styles.body_main}>
                <ShowEditor
                  prevEditorState={editorContent}
                  className={styles.body_main_shown}
                />
              </div>
              {user?.uid === data.uid && (
                <>
                  <button className={styles.updateBtn} onClick={onPostUpdate}>
                    게시글 수정
                  </button>
                  <button className={styles.deleteBtn} onClick={onPostDelete}>
                    삭제
                  </button>
                </>
              )}
              <div className={styles.favBox}>
                <button
                  className={styles.favBox_up}
                  type="button"
                  onClick={onRecommendUp}
                >
                  <img
                    className={styles.favBox_up_img}
                    src={logo_ajou_1}
                    alt="up"
                  />
                </button>
                <span className={styles.favBox_number}>
                  ↑{data.plusRecommendCount} ↓{data.minusRecommendCount}
                </span>
                <button
                  type="button"
                  className={styles.favBox_down}
                  onClick={onRecommendDown}
                >
                  <img
                    className={styles.favBox_down_img}
                    src={logo_ajou_2}
                    alt="down"
                  />
                </button>
              </div>
            </div>
          </div>
          <div className={styles.comment}>
            <div className={styles.comment_header}>댓글</div>
            {comments?.map((comment) => {
              getUserTitle(comment.uid);
              return (
                <div key={comment.id} className={styles.comment_body}>
                  <div className={styles.comment_body_info}>
                    <img
                      className={styles.comment_body_info_avatar}
                      src={logo_ajou_1}
                      alt={'logo_ajou'}
                    />
                    <div className={styles.comment_body_info_name}>
                      {comment.author}
                    </div>
                    <div className={styles.comment_body_info_userInfo}>
                      <div className={styles.comment_body_info_userInfo_grade}>
                        {userTitle}
                      </div>
                    </div>
                  </div>
                  <div className={styles.comment_body_text}>
                    {comment.comment}
                  </div>
                  <div className={styles.comment_body_date}>
                    {comment.createAt}
                    {user?.uid === data.uid ? (
                      <button
                        value={comment.id}
                        onClick={onCommentDelete}
                        type="button"
                      >
                        X
                      </button>
                    ) : null}
                  </div>
                </div>
              );
            })}

            <form onSubmit={onSubmit} className={styles.comment_input}>
              <div className={styles.comment_label}>댓글 쓰기</div>
              <textarea
                onChange={onChange}
                value={comment}
                className={styles.comment_text}
              />
              <button className={styles.comment_submit}>등록</button>
            </form>
          </div>
          <div className={styles.other}>
            <div className={styles.other_title}>다른 게시글 보기</div>
            <Posts
              selectPostId={params.postId}
              plusRecommendCount={data.plusRecommendCount}
              minusRecommendCount={data.minusRecommendCount}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default PostDetailPage;
