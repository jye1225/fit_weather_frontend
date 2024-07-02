import style from '../css/DetailPage.module.css';

import DetailCommentsCon from '../components/DetailCommentsCon';
import DetailContentCon from '../components/DetailContentCon';
import PagesHeader from '../components/PagesHeader';
import { useNavigate } from 'react-router-dom';

import { useOpenMenuModal } from '../store/detailOpMenuModalStore';
import { usePostData } from '../store/postDataStore';
import { url } from '../store/ref';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';

function DetailPage() {
  const { opMenuClose } = useOpenMenuModal();
  const navigate = useNavigate();
  const { postDetail, setPostDetail, setLikes, setOriginImgPath } =
    usePostData();
  const { postId } = useParams();

  const clickBack = () => {
    navigate('/community');
    opMenuClose();
  };

  // _id와 일치하는 데이터 get요청 v
  // 받아온 데이터 바인딩 - 타이틀v , 내용v
  // 로그인 가능하게되면
  // -> 유저아이디랑 작성자 아이디 비교해서 수정삭제메뉴 노출 유무 v
  const fetchPostDetail = async () => {
    try {
      const response = await fetch(`${url}/posts/postDetail/${postId}`); //
      const data = await response.json();
      if (response.ok) {
        setPostDetail(data);
        setLikes(data.likeCount);
        setOriginImgPath(data.image);
        console.log(postDetail);
      }
    } catch (error) {
      console.error('상세페이지 오류', error);
    }
  };

  useEffect(() => {
    fetchPostDetail();
  }, []);

  return (
    <>
      <PagesHeader title={'날씨패션톡'} clickBack={clickBack} />
      <main className={`mw ${style.detailPage}`}>
        <DetailContentCon fetchPostDetail={fetchPostDetail} />
        <DetailCommentsCon fetchPostDetail={fetchPostDetail} />
      </main>
    </>
  );
}

export default DetailPage;
