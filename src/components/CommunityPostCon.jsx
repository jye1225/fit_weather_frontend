import style from '../css/CommunityPostCon.module.css';
import CommunityPost from './CommunityPost';

import { useEffect } from 'react';
import { url } from '../store/ref';

function CommunityPostCon() {
  useEffect(() => {
    fetch(`${url}/posts/getAllPosts`, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  }, []);

  return (
    <ul className={style.commuListCon}>
      <CommunityPost />
      <CommunityPost />
      <CommunityPost />
      <CommunityPost />
    </ul>
  );
}

export default CommunityPostCon;
