import style from '../css/MypageMain.module.css';
import Header from '../components/Header';
import MypageProfileArea from '../components/MypageProfileArea';
import MypageArchive from '../components/MypageArchive';

function MypageMain() {
  return (
    <>
      <Header />
      <main className={`mw ${style.mypageMain}`}>
        <div className={`fontHead2 ${style.mypageTitle}`}>마이페이지</div>
        <MypageProfileArea />
        <MypageArchive />
      </main>
    </>
  );
}

export default MypageMain;
