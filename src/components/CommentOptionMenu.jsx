import style from '../css/CommentOptionMenu.module.css';

import ConfirmModal from './ConfirmModal';
import { useCmntOptnMenu } from '../store/onCmntOptnMenuStore';
import { useCmntRewrite } from '../store/cmntRewriteStore';

function CommentOptionMenu() {
  const {
    isOn,
    cmntOptnMenuToggle,
    cmntOptnMenuOff,
    isModalOn,
    modalOpen,
    modalOff,
  } = useCmntOptnMenu();

  const { onCmntRewrite, setCommentText } = useCmntRewrite();

  const cmntEditBtnClick = (e) => {
    console.log('수정하기 버튼 클릭');
    cmntOptnMenuOff();
    onCmntRewrite();

    const commentArea = e.target.parentElement.previousElementSibling;
    const commentText = commentArea.innerText;

    setCommentText(commentText);
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
        className={`fontBodyS ${style.cmntOptionMenu} ${isOn ? style.on : ''}`}
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
