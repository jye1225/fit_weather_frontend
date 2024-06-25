import style from '../css/CommentOptionMenu.module.css';

import ConfirmModal from './ConfirmModal';
import { useCmntOptnMenu } from '../store/OnCmntOptnMenuStore';
import { useCallback, useEffect, useRef } from 'react';

function CommentOptionMenu() {
  const {
    isOn,
    cmntOptnMenuToggle,
    cmntOptnMenuOn,
    cmntOptnMenuOff,
    isModalOn,
    modalOpen,
    modalOff,
  } = useCmntOptnMenu();

  const createCmntReBtn = (e) => {
    const CmntOptnMenuBtn =
      e.target.parentElement.previousElementSibling.previousElementSibling;
    const commentArea = e.target.parentElement.previousElementSibling;
    const reCmntSubmit = document.createElement('button');
    reCmntSubmit.classList.add('fontTitleM');
    reCmntSubmit.classList.add(`${style.reCmntSubmitBtn}`);
    reCmntSubmit.innerText = '수정';
    commentArea.parentElement.replaceChild(reCmntSubmit, CmntOptnMenuBtn);
  };

  const createReCmntArea = (e) => {
    const commentArea = e.target.parentElement.previousElementSibling;
    // commentArea의 내용을 가져오기
    const commentText = commentArea.innerText;
    // textarea 요소 생성 및 속성 설정
    const textarea = document.createElement('textarea');
    textarea.classList.add(`${style.comntRewrite}`);
    textarea.value = commentText;
    textarea.style.width = '100%';
    textarea.maxLength = 300;

    // commentArea 요소를 textarea로 교체
    commentArea.parentElement.replaceChild(textarea, commentArea);
  };

  const cmntEditBtnClick = (e) => {
    console.log('수정하기 버튼 클릭');
    cmntOptnMenuOff();
    createCmntReBtn(e);
    createReCmntArea(e);
  };

  const deleteComment = () => {
    console.log('삭제버튼');
    cmntOptnMenuToggle();
    modalOpen();
  };

  const handleCancel = () => {
    modalOff();
  };
  const handleDelete = () => {
    window.location = `/detail/:postId`;
  };

  return (
    <>
      <div
        className={` ${style.cmntOptionMenu} ${isOn ? style.on : ''}`}
        // ref={cmntBtnConRef}
      >
        <button className={style.cmntEditBtn} onClick={cmntEditBtnClick}>
          수정하기
        </button>
        <button className={style.cmntDelBtn} onClick={deleteComment}>
          삭제하기
        </button>
      </div>
      {isModalOn && (
        <ConfirmModal
          clickCancel={handleCancel}
          clickDelAndSubmt={handleDelete}
        />
      )}
    </>
  );
}

export default CommentOptionMenu;
