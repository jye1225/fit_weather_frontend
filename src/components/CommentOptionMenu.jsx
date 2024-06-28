import style from '../css/CommentOptionMenu.module.css';

import ConfirmModal from './ConfirmModal';
import { useCmntOptnMenu } from '../store/onCmntOptnMenuStore';
import { url } from '../store/ref';
import { useState } from 'react';

function CommentOptionMenu({
  toggleCmntOptMenu,
  setToggleCmntOptMenu,
  isModalToggle,
  setIsModalToggle,
  cmntEditBtnClick,
  handleCmntDelete,
  setEditingCommentId,
}) {
  // const [isModalToggle, setIsModalToggle] = useState(false);

  const deleteComment = () => {
    console.log('삭제버튼');
    setToggleCmntOptMenu(false);
    setEditingCommentId('');
    setIsModalToggle(true);
  };

  const handleCancel = () => {
    setIsModalToggle(false);
  };

  return (
    <>
      <div
        className={`fontBodyS ${style.cmntOptionMenu} ${
          toggleCmntOptMenu ? style.on : ''
        }`}
      >
        <button
          className={`fontBodyS ${style.cmntEditBtn}`}
          onClick={cmntEditBtnClick}
        >
          수정하기
        </button>
        <button
          className={`fontBodyS ${style.cmntDelBtn}`}
          onClick={deleteComment}
        >
          삭제하기
        </button>
      </div>
      {isModalToggle && (
        <ConfirmModal
          clickCancel={handleCancel}
          clickDelAndSubmt={handleCmntDelete}
        />
      )}
    </>
  );
}

export default CommentOptionMenu;
