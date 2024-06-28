import style from '../css/DetailComment.module.css';
import { useEffect, useState } from 'react';
import { useCmntOptnMenu } from '../store/onCmntOptnMenuStore';
import { useCmntRewrite } from '../store/cmntRewriteStore';
import CommentOptionMenu from './CommentOptionMenu';

function DetailComment({ cmnt }) {
  const { isOn, cmntOptnMenuOn, cmntOptnMenuOff } = useCmntOptnMenu();
  const { cmntRewrite, offCmntRewrite, commentText } = useCmntRewrite();
  const [cmntCreateAt, setCmntCreateAt] = useState();

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

  //입력 시간 표시 변환
  const formatDate = () => {
    const now = new Date();
    const createdDate = new Date(cmnt.createdAt);
    const diffInMilscnds = now - createdDate;

    const minutes = Math.floor(diffInMilscnds / 1000 / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) {
      return setCmntCreateAt(
        `${createdDate.getFullYear()}년 ${
          createdDate.getMonth() + 1
        }월 ${createdDate.getDate()}일`
      );
    } else if (hours > 0) {
      return setCmntCreateAt(`${hours}시간 전`);
    } else {
      return setCmntCreateAt(`${minutes}분 전`);
    }
  };
  useEffect(() => {
    formatDate();
  }, []);

  return (
    <li className={style.comment}>
      <div className={style.userImg}>
        {/* 유저이미지는 유저정보 생기면 수정예정 */}
        <img src="/img/img2.jpg" alt={cmnt.userId} />
      </div>
      <span className={`fontTitleS ${style.userName}`}>{cmnt.userId} </span>
      <span className={`fontBodyS ${style.commentDate}`}>{cmntCreateAt}</span>
      {!cmntRewrite && (
        <>
          <i
            className="fa-solid fa-ellipsis-vertical"
            onClick={cmntOptnMenuToggle}
          ></i>
          <p className="fontBodyM">{cmnt.content}</p>
        </>
      )}
      {/* 수정삭제버튼은 로그인한 사용자와 댓글 작성자가 일치할떄 노출되게 설정 예정 */}
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
