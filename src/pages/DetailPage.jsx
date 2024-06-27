import style from '../css/DetailPage.module.css';

import DetailCommentsCon from '../components/DetailCommentsCon';
import DetailContentCon from '../components/DetailContentCon';
import PagesHeader from '../components/PagesHeader';
import { useNavigate } from 'react-router-dom';
import { useOpenMenuModal } from '../store/detailOpMenuModalStore';

function DetailPage() {
  const { opMenuClose } = useOpenMenuModal();
  const navigate = useNavigate();
  const clickBack = () => {
    navigate('/community');
    opMenuClose();
  };

  return (
    <>
      <PagesHeader title={'날씨패션톡'} clickBack={clickBack} />
      <main className={`mw ${style.detailPage}`}>
        <DetailContentCon />
        <DetailCommentsCon />
      </main>
    </>
  );
}

export default DetailPage;
