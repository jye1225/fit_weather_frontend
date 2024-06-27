import { useParams } from 'react-router-dom';
import style from '../css/DetailContentCon.module.css';

import DetailContentArea from './DetailContentArea';
import DetailTitleArea from './DetailTitleArea';
import { usePostData } from '../store/postDataStore';
import { url } from '../store/ref';
import { useEffect } from 'react';

function DetailContentCon() {
  // _id와 일치하는 데이터 get요청 v
  // 받아온 데이터 바인딩 - 타이틀v , 내용
  // 로그인 가능하게되면
  // -> 유저아이디랑 작성자 아이디 비교해서 수정삭제메뉴 노출 유무

  const { postDetail, setPostDetail, setPostId } = usePostData();
  const { postId } = useParams();

  useEffect(() => {
    fetch(`${url}/posts/postDetail/${postId}`) //
      .then((res) => res.json()) //
      .then((data) => {
        setPostDetail(data);
        setPostId(postId);
      });
    console.log(postDetail);
  }, [postId]);

  return (
    <section className={style.detailContent}>
      <DetailTitleArea />
      <DetailContentArea />
    </section>
  );
}

export default DetailContentCon;
