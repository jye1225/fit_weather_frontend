import style from '../css/FashionFeedPage.module.css';
import FashionFeedModal from '../components/FashionFeedModal';

function FashionFeedPage() {
  return (
    <main className={`mw ${style.fashionFeedPage}`}>
      <h3 className={`fontHead3 ${style.fshFeedTitle}`}>
        패션 인플루언서의 코디
      </h3>
      <ul className={style.fshFeedCon}>
        <li>피드</li>
        <li>피드</li>
        <li>피드</li>
        <li>피드</li>
      </ul>
      <FashionFeedModal />
    </main>
  );
}

export default FashionFeedPage;
