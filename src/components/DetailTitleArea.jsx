import style from '../css/DetailTitleArea.module.css';
import { useRef, useState, useEffect } from 'react';

import { useOpenMenuModal } from '../store/DetailOpMenuModalStore';

import CommunityCategory from './CommunitySubCategory';
import Region from './Region';
import OptionMenu from './OptionMenu';

function DetailTitleArea() {
  const [isLike, setLikeOn] = useState(false);
  const { isOpMenuOn, opMenuOpen, opMenuClose } = useOpenMenuModal();

  const addLikeOn = () => {
    setLikeOn(!isLike);
  };

  const opMenuToggle = (e) => {
    e.stopPropagation();
    if (isOpMenuOn) {
      opMenuClose();
    } else {
      opMenuOpen();
    }
  };

  const optionMenuRef = useRef(null);
  const clickOutside = (e) => {
    if (
      optionMenuRef.current &&
      !optionMenuRef.current.contains(e.target) &&
      isOpMenuOn
    ) {
      opMenuClose();
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', clickOutside);
    return () => {
      document.removeEventListener('mousedown', clickOutside);
    };
  }, [isOpMenuOn]);

  // const addOpMenuOn = () => {};

  return (
    <div className={style.titleArea}>
      <CommunityCategory />
      <Region
        color={`var(--primary-color)`}
        border={`1px solid var(--primary-color)`}
      />
      <strong>제목이 들어갑니다</strong>
      <div className={style.postInfo}>
        <span>유저A</span>
        <span>2024년 06월 11일</span>
        <div className={style.like}>
          <span>3</span>
          <button
            className={`${style.likeBtn} ${isLike ? style.on : ''}`}
            onClick={addLikeOn}
          ></button>
        </div>
      </div>
      <div className={style.option} ref={optionMenuRef}>
        <i className="fa-solid fa-ellipsis-vertical" onClick={opMenuToggle}></i>
        <OptionMenu />
      </div>
    </div>
  );
}

export default DetailTitleArea;
