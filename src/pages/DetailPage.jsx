import style from '../css/DetailPage.module.css';

import DetailCommentsCon from '../components/DetailCommentsCon';
import DetailContentCon from '../components/DetailContentCon';
import PagesHeader from '../components/PagesHeader';

function DetailPage() {
  // useEffect(() => {
  //   fetch(`${url}/postDetail/${postId}`) //
  //     .then((res) => res.json()) //
  //     .then((data) => {
  //       setPostInfo(data);
  //     });
  // }, [postId]);
  return (
    <>
      <PagesHeader title={'날씨패션톡'} />
      <main className={`mw ${style.detailPage}`}>
        <DetailContentCon />
        <DetailCommentsCon />
      </main>
    </>
  );
}

export default DetailPage;
