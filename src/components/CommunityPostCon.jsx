import style from '../css/CommunityPostCon.module.css';
import CommunityPost from './CommunityPost';

import { useEffect } from 'react';
import { url } from '../store/ref';
import { useVerifyPost } from '../store/verifyPostContentStore';

function CommunityPostCon() {
  const { postsData, setPostsData } = useVerifyPost();
  useEffect(() => {
    fetch(`${url}/posts/getAllPosts`, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => setPostsData(data));
  }, []);

  return (
    <ul className={style.commuListCon}>
      {postsData.map((post) => (
        <CommunityPost key={post._id} post={post} />
      ))}
    </ul>
  );
}

export default CommunityPostCon;
