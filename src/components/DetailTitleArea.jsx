import style from '../css/DetailTitleArea.module.css';
import CommunityCategory from './CommunitySubCategory';
import Region from './Region';
import OptionMenu from './OptionMenu';

import { useRef, useEffect, useState } from 'react';
import { useOpenMenuModal } from '../store/detailOpMenuModalStore';
import { usePostData } from '../store/postDataStore';
import { url } from '../store/ref';
import { useLoginInfoStore } from '../store/loginInfoStore';

function DetailTitleArea({ fetchPostDetail, postId }) {
  const { postDetail, likes, setLikes, fetchPosts } = usePostData();
  const [isLike, setLiketoggle] = useState(false);
  const { isOpMenuOn, opMenuOpen, opMenuClose } = useOpenMenuModal();
  const { userInfo } = useLoginInfoStore();

  // 수정해야 되는 사항
  // 좋아요 수 실시간 반영 구현하기 - 이상하게 작동돼서 수정필요
  // 이용자가 좋아요 눌렀던 상태일때 하트 채워져 있는 기능 구현하기
  const toggleLike = async () => {
    try {
      const response = await fetch(`${url}/posts/like`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          isLike: !isLike,
          postId: postDetail._id,
          userId: userInfo?.userid,
        }),
        credentials: 'include',
      });
      const data = await response.json();
      if (data.success === true) {
        console.log('좋아요 토글');
        setLiketoggle(!isLike);
        setLikes(data.likes);
        fetchPostDetail();
        fetchPosts();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const checkUserLikeList = async () => {
    try {
      const response = await fetch(
        `${url}/posts/likeCheck/${postId}?userId=${userInfo.userid}`,
        {
          method: 'GET',
        }
      );
      const data = await response.json();
      // console.log('좋아요리스트', data);
      // console.log('포스트아이디들', data.postId);

      // 현재 게시물의 postId가 data의 postId 배열에 존재하는지 확인
      // 모든 요소와 postId를 문자열로 변환하여 비교
      console.log('포함??', data.postId.map(String).includes(String(postId)));

      if (data.postId && data.postId.map(String).includes(String(postId))) {
        setLiketoggle(true);
      } else {
        setLiketoggle(false);
      }
    } catch (error) {
      console.error('좋아요 리스트 체크 에러', error);
    }
  };

  useEffect(() => {
    console.log(postId);
    checkUserLikeList();
  }, []);

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

  const date = new Date(postDetail.createdAt);
  const formatDate = date.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

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
        <span className="fontTitleS">{formatDate}</span>
        <div className={`fontTitleS ${style.like}`}>
          <span>{likes}</span>
          <button
            className={`${style.likeBtn} ${isLike ? style.on : ''}`}
            onClick={toggleLike}
          ></button>
        </div>
      </div>
      {postDetail.userId === userInfo?.userid && (
        <div className={style.option} ref={optionMenuRef}>
          <i
            className="fa-solid fa-ellipsis-vertical"
            onClick={opMenuToggle}
          ></i>
          <OptionMenu />
        </div>
      )}
    </div>
  );
}

export default DetailTitleArea;
