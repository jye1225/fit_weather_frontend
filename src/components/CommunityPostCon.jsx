import style from '../css/CommunityPostCon.module.css';
import CommunityPost from './CommunityPost';

import { useCallback, useEffect, useRef, useState } from 'react';
import { usePostData } from '../store/postDataStore';

function CommunityPostCon() {
  const { allPostsData, fetchPosts, hasMore, currentFilter, page, resetPosts } =
    usePostData();
  console.log('불러온 글', allPostsData);
  console.log('필터 카테고리', currentFilter);
  const [isLoading, setIsLoading] = useState(false);
  // 관찰 대상 요소를 참조하기 위한 ref
  const observerRef = useRef(null);
  const loadingRef = useRef(null);

  const handleObserver = useCallback(
    (entries) => {
      const target = entries[0];
      // 관찰 대상이 뷰포트에 들어오고, 로딩 중이 아니며, 더 불러올 데이터가 있을 때 페이지 증가
      if (target.isIntersecting && !isLoading && hasMore) {
        fetchPosts(currentFilter);
      }
    },
    [isLoading, hasMore, fetchPosts, currentFilter]
  );

  useEffect(() => {
    // IntersectionObserver 설정
    const observer = new IntersectionObserver(handleObserver, {
      threshold: 1, // 중요: 관찰 요소가 다 보여야 콜백 실행
    });
    // 최하단 요소를 관찰 대상으로 지정함
    if (observerRef.current) {
      observer.observe(observerRef.current);
    }
    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, [handleObserver]);

  useEffect(() => {
    const loadInitialData = async () => {
      setIsLoading(true);
      await resetPosts();
      await fetchPosts(currentFilter, 1);
      console.log('지금 페이지', page);
      setIsLoading(false);
    };
    loadInitialData();
  }, [resetPosts, fetchPosts, currentFilter]);

  // allPostsData가 배열이 아니면 에러 메시지를 표시하거나 데이터를 다시 불러옵니다.
  if (!Array.isArray(allPostsData)) {
    console.error('allPostsData is not an array:', allPostsData);
    return (
      <p>
        데이터를 불러오는 중 오류가 발생했습니다. 페이지를 새로고침해 주세요.
      </p>
    );
  }

  return (
    <ul className={style.commuListCon}>
      {allPostsData &&
        allPostsData.map((post, index) => (
          <CommunityPost
            key={post._id}
            post={post}
            // ref={index === allPostsData.length - 1 ? observerRef : null}
          />
        ))}
      {(hasMore || isLoading) && (
        <li ref={observerRef} className={style.loadingContainer}>
          <div ref={loadingRef} className={style.loadingIndicator}>
            패션날씨 톡 게시글 불러오는 중☁️☁️
          </div>
        </li>
      )}
      {!hasMore && (
        <li className={`fontBodyM ${style.endMessage}`}>
          ☁️ 모든 게시물을 불러왔습니다 ☁️
        </li>
      )}
    </ul>
  );
}

export default CommunityPostCon;
