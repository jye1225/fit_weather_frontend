import style from '../css/DetailComment.module.css';
import { useEffect, useState } from 'react';
import CommentOptionMenu from './CommentOptionMenu';
import { url } from '../store/ref';
import { useParams } from 'react-router-dom';
import { useLoginInfoStore } from '../store/loginInfoStore';
import { usePostData } from '../store/postDataStore';

function DetailComment({
  cmnt,
  fetchCmnts,
  editingCommentId, // 현재 조작 중인 구분용
  setEditingCommentId,
  postId,
}) {
  const [toggleCmntOptMenu, setToggleCmntOptMenu] = useState(false); // 댓글 수정,삭제버튼 노충 유무
  const [onCmntRewrite, setOnCmntRewrite] = useState(false); // 수정하기 클릭 유무
  const [isModalToggle, setIsModalToggle] = useState(false); // 삭제하기 클릭시 뜨는 모달
  const [cmntCreateAt, setCmntCreateAt] = useState();
  const [commentText, setCommentText] = useState(cmnt.content);
  const { userInfo } = useLoginInfoStore();
  const { postDetail } = usePostData();
  // const { postId } = useParams;

  // 댓글 수정,삭제 버튼 노출
  const cmntOptnMenuToggle = (e) => {
    console.log('댓글편집버튼클릭');

    const editCmntId = e.target.closest('li').dataset.id;
    console.log('클릭한 li', editCmntId);
    console.log('현재 li', cmnt._id);
    if (editingCommentId !== editCmntId) {
      setToggleCmntOptMenu(false);
      setEditingCommentId(null);
    }

    setOnCmntRewrite(false);
    setToggleCmntOptMenu((prev) => !prev); // 현재 클릭된 메뉴 토글
    setEditingCommentId(editCmntId);
  };

  //수정하기 버튼 클릭 시 실행할 함수
  const cmntEditBtnClick = (e) => {
    console.log('수정하기 버튼 클릭');
    const editCmntId = e.target.closest('li').dataset.id;
    setToggleCmntOptMenu(false);
    setOnCmntRewrite(true);
    setEditingCommentId(editCmntId);
    setCommentText(cmnt.content);
  };

  //댓글 수정 후 최종 수정 버튼 클릭했을 때
  const cmntRewriteSubmit = async () => {
    console.log('댓글수정 버튼 클릭');
    setEditingCommentId('');
    setOnCmntRewrite(false);

    //댓글 업데이트 로직
    try {
      const response = await fetch(`${url}/comments/cmntUpdate/${cmnt._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          comment: commentText,
        }),
      });
      console.log(response);
      if (response.ok) {
        fetchCmnts();
      }
    } catch (error) {
      console.error('댓글 수정 실패', error);
    }
  };

  const deleteComment = () => {
    console.log('삭제하기 버튼');
    setIsModalToggle(true);
  };

  //삭제 모달에서 삭제하기 클릭했을 때
  const handleCmntDelete = async () => {
    console.log('최종 삭제하기 버튼 클릭');
    try {
      const response = await fetch(
        `${url}/comments/cmntDel/${postId}/${cmnt._id}`,
        {
          method: 'DELETE',
        }
      );
      console.log(response);
      if (response.ok) {
        setIsModalToggle(false);
        fetchCmnts();
        console.log('댓글삭제 완료');
      }
    } catch (error) {
      console.error('댓글 삭제 에러', error);
    }
  };

  //입력 시간 표시 변환
  const formatDate = () => {
    const now = new Date();
    const createdDate = new Date(cmnt.createdAt);
    const diffInMilscnds = now - createdDate;

    const minutes = Math.floor(diffInMilscnds / 1000 / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) {
      setCmntCreateAt(
        `${createdDate.getFullYear()}년 ${
          createdDate.getMonth() + 1
        }월 ${createdDate.getDate()}일`
      );
    } else if (hours > 0) {
      setCmntCreateAt(`${hours}시간 전`);
    } else {
      setCmntCreateAt(`${minutes}분 전`);
    }
  };
  useEffect(() => {
    formatDate();
  }, []);

  return (
    <li className={`post ${style.comment}`} data-id={cmnt._id}>
      <div className={style.userImg}>
        {/* 유저이미지는 유저정보 생기면 수정예정 */}
        <img src="/img/img2.jpg" alt={cmnt.userId} />
      </div>
      <span className={`fontTitleS ${style.userName}`}>{cmnt.userId} </span>
      <span className={`fontBodyS ${style.commentDate}`}>{cmntCreateAt}</span>
      {editingCommentId === cmnt._id && onCmntRewrite ? (
        <>
          <div className={style.reCmntBtnCon}>
            <button
              className={`fontTitleM ${style.reCmntCancelBtn}`}
              onClick={() => {
                setEditingCommentId('');
                setOnCmntRewrite(false);
              }}
            >
              취소
            </button>
            <button
              className={`fontTitleM ${style.reCmntSubmitBtn}`}
              onClick={cmntRewriteSubmit}
            >
              수정
            </button>
          </div>
          <textarea
            className={style.comntRewrite}
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            maxLength={300}
          ></textarea>
        </>
      ) : (
        <>
          {cmnt.userId === userInfo?.userid && (
            <i
              className="fa-solid fa-ellipsis-vertical"
              onClick={cmntOptnMenuToggle}
            ></i>
          )}
          <p className="fontBodyM">{cmnt.content}</p>
          {toggleCmntOptMenu && editingCommentId === cmnt._id && (
            <CommentOptionMenu
              toggleCmntOptMenu={toggleCmntOptMenu}
              isModalToggle={isModalToggle}
              setIsModalToggle={setIsModalToggle}
              cmntEditBtnClick={cmntEditBtnClick}
              handleCmntDelete={handleCmntDelete}
              deleteComment={deleteComment}
            />
          )}
        </>
      )}
    </li>
  );
}

export default DetailComment;
