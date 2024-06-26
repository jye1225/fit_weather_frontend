import style from '../css/PagesHeader.module.css';
import { useNavigate } from 'react-router-dom';
import Region from './Region';

function PagesHeader({ title, clickBack }) {
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1); // 이전 페이지로 이동
  };

  return (
    <header className={`mw ${style.hd} ${style.pagesHd}`}>
      <i
        className="fa-solid fa-chevron-left"
        onClick={clickBack ? clickBack : goBack}
      ></i>
      <div className={style.pagesHdRight}>
        <strong className="fontHead2">{title}</strong>
        <Region color={`var(--white)`} border={`1px solid var(--white)`} />
      </div>
    </header>
  );
}

export default PagesHeader;
