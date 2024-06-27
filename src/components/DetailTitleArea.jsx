import style from '../css/DetailTitleArea.module.css';
import CommunityCategory from './CommunitySubCategory';
import Region from './Region';
import OptionMenu from './OptionMenu';

import { useRef, useState, useEffect } from 'react';
import { useOpenMenuModal } from '../store/detailOpMenuModalStore';
import { usePostData } from '../store/postDataStore';

function DetailTitleArea() {
  const [isLike, setLikeOn] = useState(false);
  const { isOpMenuOn, opMenuOpen, opMenuClose } = useOpenMenuModal();
  const { postDetail } = usePostData();

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
      <CommunityCategory category={postDetail.category} />
      <Region
        region={postDetail.region}
        color={`var(--primary-color)`}
        border={`1px solid var(--primary-color)`}
      />
      <strong className="fontHead3">{postDetail.title}</strong>
      <div className={style.postInfo}>
        <span className="fontTitleS">
          {postDetail.username ? postDetail.username : postDetail.userId}
        </span>
        <span className="fontTitleS">{postDetail.createdAt}</span>
        <div className={`fontTitleS ${style.like}`}>
          <span>{postDetail.likeCount}</span>
          <button
            className={`${style.likeBtn} ${isLike ? style.on : ''}`}
            onClick={addLikeOn}
          ></button>
        </div>
      </div>
      {/* 로그인한 이용자와 글쓴이가 일치할때 노출 */}
      <div className={style.option} ref={optionMenuRef}>
        <i className="fa-solid fa-ellipsis-vertical" onClick={opMenuToggle}></i>
        <OptionMenu />
      </div>
    </div>
  );
}

export default DetailTitleArea;
