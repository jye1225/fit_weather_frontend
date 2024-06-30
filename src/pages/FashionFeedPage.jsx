import style from '../css/FashionFeedPage.module.css';
import FashionFeedModal from '../components/FashionFeedModal';
import { useState } from 'react';

function FashionFeedPage() {
  const [onFshModal, setOnFshModal] = useState(false);
  const clickOneFeed = () => {
    setOnFshModal(true);
  };
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
