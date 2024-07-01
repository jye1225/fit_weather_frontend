import style from '../css/FashionFeedPage.module.css';
import FashionFeedModal from '../components/FashionFeedModal';
import { useEffect, useState } from 'react';
import { url } from '../store/ref';

function FashionFeedPage() {
  //  시도해보는 중
  // const [onFshModal, setOnFshModal] = useState(false);
  // const [feeds, setFeeds] = useState(true);
  // const [error, serError] = useState(null);

  // const fetchFeeds = async () => {
  //   try {
  //     const response = await fetch(`${url}/insta/getFeeds`);
  //     const data = await response.json();
  //     console.log(response);
  //     console.log(data);
  //   } catch (error) {
  //     console.error('인스타 피드 불러오기 에러', error);
  //   }
  // };
  // useEffect(() => {
  //   fetchFeeds();
  // }, []);

  // const clickOneFeed = () => {
  //   setOnFshModal(true);
  // };

  return (
    <main className={`mw ${style.fashionFeedPage}`}>
      {/* <h3 className={`fontHead3 ${style.fshFeedTitle}`}>
        패션 인플루언서의 코디
      </h3> */}
      <div>
        <iframe
          src="https://www.musinsa.com/snap/main/recommend?isApp=false&viewport=desktop&feed-tab=NEW"
          className={style.embedded}
          title="External Website"
        />
      </div>
      {/* <ul className={style.fshFeedCon}>
        <li onClick={clickOneFeed}>피드</li>
        <li>피드</li>
        <li>피드</li>
        <li>피드</li>
      </ul>
      <FashionFeedModal onFshModal={onFshModal} setOnFshModal={setOnFshModal} /> */}
    </main>
  );
}

export default FashionFeedPage;
