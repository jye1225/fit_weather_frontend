import style from '../css/CommunityPostCon.module.css';
import CommunityPost from './CommunityPost';

function CommunityPostCon() {
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
