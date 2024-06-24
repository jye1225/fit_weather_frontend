import style from '../../css/CommentOptionMenu.module.css';

import ConfirmModal from '../ConfirmModal';
import { useCmntOptnMenu } from '../../store/OnCmntOptnMenuStore';
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

  const cmntEditBtnClick = (e) => {
    console.log('수정하기 버튼 클릭');
    cmntOptnMenuOff();
    // console.log(e.target.parentElement.parentElement.previ);
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

  // const cmntBtnConRef = useRef();
  // useEffect(() => {
  //   const clickOtherEl = (e) => {
  //     console.log('클릭발생');
  //     const currentElm = cmntBtnConRef.current;
  //     const clickOutside = currentElm && !currentElm.contains(e.target);

  //     console.log(currentElm);
  //     console.log('~', currentElm.contains(e.target));
  //     console.log('--', clickOutside);
  //     console.log('---', isOn);
  //     console.log('----', clickOutside && isOn);

  //     if (clickOutside && isOn) {
  //       cmntOptnMenuOff();
  //     }
  //   };

  //   document.addEventListener('click', clickOtherEl);
  //   return () => {
  //     document.removeEventListener('click', clickOtherEl);
  //   };
  // }, []);

  return (
    <div
      className={` ${style.cmntOptionMenu} ${isOn ? style.on : ''}`}
      // ref={cmntBtnConRef}
    >
      <div className={style.cmntBtnCon}>
        <button className={style.cmntEditBtn} onClick={cmntEditBtnClick}>
          수정하기
        </button>
        <button className={style.cmntDelBtn} onClick={deleteComment}>
          삭제하기
        </button>
      </div>
      {isModalOn && (
        <ConfirmModal clickCancel={handleCancel} clickDelete={handleDelete} />
      )}
    </div>
  );
}

export default CommentOptionMenu;
