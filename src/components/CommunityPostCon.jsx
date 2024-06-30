import style from '../css/CommunityPostCon.module.css';
import CommunityPost from './CommunityPost';

import { useCallback, useEffect, useState } from 'react';
import { url } from '../store/ref';
import { usePostData } from '../store/postDataStore';

import InfiniteScroll from 'react-infinite-scroll-component';

function CommunityPostCon() {
  const { allPostsData, setPostsData, setOriginalData } = usePostData();
  console.log(allPostsData);

  //무한 스크롤은 나중에...
  const fetchPosts = useCallback(async () => {
    try {
      const response = await fetch(`${url}/posts/getAllPosts`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      const newPosts = data.postsList;
      // console.log(data);
      // console.log('모든 포스트', newPosts);

      setPostsData(newPosts);
      setOriginalData(newPosts);
    } catch (error) {
      console.error('데이터를 불러오는 중 오류 발생', error);
    }
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return (
    <ul className={style.commuListCon}>
      <InfiniteScroll
        dataLength={allPostsData.length}
        // next={fetchData}
        hasMore={true}
        loader={<h4>Loading...</h4>}
        endMessage={
          <p style={{ textAlign: 'center' }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        {allPostsData &&
          allPostsData.map((post) => (
            <CommunityPost key={post._id} post={post} />
          ))}
      </InfiniteScroll>
      ;
    </ul>
  );
}

export default CommunityPostCon;
