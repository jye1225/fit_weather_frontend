import style from '../css/OptionMenu.module.css';
import ConfirmModal from './ConfirmModal';
import { useOpenMenuModal } from '../store/DetailOpMenuModalStore';
import { useNavigate } from 'react-router-dom';

function OptionMenu() {
  const { modalClose, opMenuClose, isModalOpen, modalOpen, isOpMenuOn } =
    useOpenMenuModal();
  const navigate = useNavigate();

  const goEditePage = () => {
    navigate(`/postEdit/:postId`);
  };

  const handleCancel = () => {
    modalClose();
    opMenuClose();
  };
  const handleDelete = () => {
    modalClose();
    opMenuClose();
    navigate('/community');
  };

  return (
    <>
      <div
        id="optionMenu"
        className={`mw ${style.optionMenu} ${isOpMenuOn ? style.on : ''}`}
      >
        <button className={style.postEditBtn} onClick={goEditePage}>
          수정하기
        </button>
        <button className={style.postDelBtn} onClick={modalOpen}>
          삭제하기
        </button>
      </div>
      {isModalOpen && (
        <ConfirmModal clickCancel={handleCancel} clickDelete={handleDelete} />
      )}
    </>
  );
}

export default OptionMenu;
