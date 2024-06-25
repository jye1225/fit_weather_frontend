import { useState } from 'react';
import style from '../css/DetailComment.module.css';
import { useCmntOptnMenu } from '../store/OnCmntOptnMenuStore';
import { useCmntRewrite } from '../store/CmntRewriteStore';
import CommentOptionMenu from './CommentOptionMenu';

function DetailComment() {
  const { isOn, cmntOptnMenuOn, cmntOptnMenuOff } = useCmntOptnMenu();
  const { cmntRewrite, offCmntRewrite, commentText } = useCmntRewrite();

  const cmntOptnMenuToggle = () => {
    // 댓글 수정,삭제 버튼 노출
    console.log('댓글편집버튼클릭');
    if (!isOn) {
      cmntOptnMenuOn();
    } else {
      cmntOptnMenuOff();
    }
  };

  const cmntRewriteSubmit = () => {
    //댓글 수정 후 수정 버튼 클릭
    console.log('댓글수정 버튼 클릭');
    offCmntRewrite();
    //댓글 업데이트 로직 추가하기
  };

  return (
    <li className={style.comment}>
      <div className={style.userImg}>
        <img src="/img/img2.jpg" alt="유저이미지" />
      </div>
      <span className={`fontTitleS ${style.userName}`}>유저B</span>
      <span className={`fontBodyS ${style.commentDate}`}>10분 전</span>
      {!cmntRewrite && (
        <>
          <i
            className="fa-solid fa-ellipsis-vertical"
            onClick={cmntOptnMenuToggle}
          ></i>
          <p className="fontBodyM">
            댓글이 들어갑니다댓글이 들어갑니다댓글이 들어갑니다댓글이
            들어갑니다댓글이 들어갑니다댓글이 들어갑니다
          </p>
        </>
      )}
      {cmntRewrite && (
        <>
          <div className={style.reCmntBtnCon}>
            <button
              className={`fontTitleM ${style.reCmntCancelBtn}`}
              onClick={() => {
                offCmntRewrite();
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
            onChange={(e) => e.target.value}
            maxLength={300}
          ></textarea>
        </>
      )}
      <CommentOptionMenu />
    </li>
  );
}

export default DetailComment;
