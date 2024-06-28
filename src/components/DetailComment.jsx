import style from '../css/DetailComment.module.css';
import { useEffect, useState } from 'react';
import CommentOptionMenu from './CommentOptionMenu';
import { url } from '../store/ref';

function DetailComment({
  cmnt,
  fetchCmnts,
  editingCommentId,
  setEditingCommentId,
}) {
  const [toggleCmntOptMenu, setToggleCmntOptMenu] = useState(false);
  const [onCmntRewrite, setOnCmntRewrite] = useState(false);
  const [isModalToggle, setIsModalToggle] = useState(false);
  const [cmntCreateAt, setCmntCreateAt] = useState();
  const [commentText, setCommentText] = useState(cmnt.content);

  // 댓글 수정,삭제 버튼 노출
  const cmntOptnMenuToggle = (e) => {
    console.log('댓글편집버튼클릭');
    const editCmntId = e.target.closest('li').dataset.id;
    console.log(editCmntId);
    if (editingCommentId === editCmntId) {
      setEditingCommentId('');
      setToggleCmntOptMenu(false);
    } else {
      setEditingCommentId(editCmntId);
      setToggleCmntOptMenu(true);
    }
  };

  //수정하기 버튼 클릭 시 실행할 함수
  const cmntEditBtnClick = (e) => {
    console.log('수정하기 버튼 클릭');
    const editCmntId = e.target.closest('li').dataset.id;
    setToggleCmntOptMenu(false);
    setEditingCommentId(editCmntId);
    setOnCmntRewrite(true);

    const commentArea = e.target.parentElement.previousElementSibling;
    const commentText = commentArea.innerText;
    setCommentText(commentText);

    // if (editingCommentId === editCmntId) {
    //   setEditingCommentId('');
    //   setToggleCmntOptMenu(false);
    // } else {
    //   setEditingCommentId(editCmntId);
    //   setToggleCmntOptMenu(true);
    // }
  };

  //댓글 수정 후 최종 수정 버튼 클릭했을 때
  const cmntRewriteSubmit = () => {
    console.log('댓글수정 버튼 클릭');
    setOnCmntRewrite(false);
    //댓글 업데이트 로직 추가하기
  };

  //삭제 모달에서 삭제하기 클릭했을 때
  const handleCmntDelete = async () => {
    console.log('최종 삭제하기 버튼 클릭');
    try {
      const response = await fetch(`${url}/comments/cmntDel/${cmnt._id}`, {
        method: 'DELETE',
      });
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
    <li className={style.comment} data-id={cmnt._id}>
      <div className={style.userImg}>
        {/* 유저이미지는 유저정보 생기면 수정예정 */}
        <img src="/img/img2.jpg" alt={cmnt.userId} />
      </div>
      <span className={`fontTitleS ${style.userName}`}>{cmnt.userId} </span>
      <span className={`fontBodyS ${style.commentDate}`}>{cmntCreateAt}</span>
      {!onCmntRewrite && (
        <>
          {/* 수정삭제버튼은 
          로그인한 사용자와 댓글 작성자가 일치할떄 
          노출되게 설정 예정 */}
          <i
            className="fa-solid fa-ellipsis-vertical"
            onClick={cmntOptnMenuToggle}
          ></i>
          <p className="fontBodyM">{cmnt.content}</p>
        </>
      )}
      {onCmntRewrite && (
        <>
          <div className={style.reCmntBtnCon}>
            <button
              className={`fontTitleM ${style.reCmntCancelBtn}`}
              onClick={() => {
                setOnCmntRewrite(false);
                setEditingCommentId('');
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
      )}
      {editingCommentId === cmnt._id && !onCmntRewrite && (
        <CommentOptionMenu
          toggleCmntOptMenu={toggleCmntOptMenu}
          setToggleCmntOptMenu={setToggleCmntOptMenu}
          isModalToggle={isModalToggle}
          setIsModalToggle={setIsModalToggle}
          cmntEditBtnClick={cmntEditBtnClick}
          handleCmntDelete={handleCmntDelete}
          setEditingCommentId={setEditingCommentId}
        />
      )}
    </li>
  );
}

export default DetailComment;
