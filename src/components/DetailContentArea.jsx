import style from '../css/DetailContentArea.module.css';
import DetailCoordiReview from './DetailCoordiReview';
import { usePostData } from '../store/postDataStore';
import { url } from '../store/ref';

function DetailContentArea() {
  const { postDetail } = usePostData();

  return (
    <div className={style.contentArea}>
      {postDetail.image ? (
        <>
          <p className="fontBodyM">{postDetail.content}</p>
          <div className={style.imgCon}>
            <img src={`${url}/${postDetail.image}`} alt="이미지" />
          </div>
        </>
      ) : (
        <p className="fontBodyM" style={{ minHeight: '10rem' }}>
          {postDetail.content}
        </p>
      )}
      {postDetail.coordiReview && <DetailCoordiReview />}
      {/* <DetailCoordiReview /> */}
    </div>
  );
}

export default DetailContentArea;
