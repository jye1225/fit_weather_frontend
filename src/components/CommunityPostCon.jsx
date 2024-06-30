import style from '../css/CommunityPostCon.module.css';
import CommunityPost from './CommunityPost';

import { useEffect } from 'react';
import { usePostData } from '../store/postDataStore';

function CommunityPostCon() {
  const { allPostsData, fetchPosts } = usePostData();
  console.log(allPostsData);

  //무한 스크롤은 나중에...
  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return (
    <ul className={style.commuListCon}>
      {allPostsData &&
        allPostsData.map((post) => (
          <CommunityPost key={post._id} post={post} />
        ))}
    </ul>
  );
}

export default CommunityPostCon;
