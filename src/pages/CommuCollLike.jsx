import style from '../css/CommuCollLike.module.css';
import { useEffect, useState } from 'react';
import { useCategoryStore } from '../store/categoryStore';
import CommunityPost from '../components/CommunityPost';
import { url } from '../store/ref';
import Pagination from '../components/Pagination';
import { usePagination } from '../store/paginationStore';

function CommuCollLike() {
  const {
    talkPostData,
    setTalkPostData,
    setTotalResults,
    currentPage,
    setCurrentPage,
    setTotalPages,
  } = usePagination();
  const { setOnMyPageCate } = useCategoryStore();
  useEffect(() => {
    setOnMyPageCate('like');
  }, []);

  const [likeData, setLikeData] = useState([]);
  const fetchLikeData = async () => {
    try {
      const response = await fetch(`${url}/mypage/likes?page=${currentPage}`, {
        credentials: 'include',
      });
      const data = await response.json();
      const likesList = data.sortedPosts;
      console.log('받아온 데이터', data);
      console.log('내가 좋아요한 글 데이터', likesList);
      console.log('총 내가 좋아요 한 글 수', data.totalLikes);
      if (response.ok) {
        setLikeData(likesList);
        setTotalResults(data.totalLikes);
        setTotalPages(data.totalPages);
      }
      // 현재 페이지가 총 페이지 수보다 크면 마지막 페이지로 이동
      if (currentPage > data.totalPages) {
        setCurrentPage(data.totalPages);
      }
    } catch (error) {
      console.error('좋아요한 글 get요청 오류', error);
    }
  };

  useEffect(() => {
    fetchLikeData();
  }, [currentPage]);

  return (
    <main className={`mw ${style.commuCollLike}`}>
      {likeData.length === 0 ? (
        <p className={style.loadingMsg}>좋아요한 글이 없습니다.</p>
      ) : (
        <>
          <ul className={style.likeListCon}>
            {likeData.map((post) => (
              <CommunityPost key={post._id} post={post} />
            ))}
          </ul>
          <Pagination />
        </>
      )}
    </main>
  );
}

export default CommuCollLike;
