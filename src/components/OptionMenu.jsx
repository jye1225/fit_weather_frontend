import style from '../css/OptionMenu.module.css';
import ConfirmModal from './ConfirmModal';
import { useOpenMenuModal } from '../store/detailOpMenuModalStore';
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
        <button
          className={`fontTitleM ${style.postEditBtn}`}
          onClick={goEditePage}
        >
          수정하기
        </button>
        <button
          className={`fontTitleM ${style.postDelBtn}`}
          onClick={modalOpen}
        >
          삭제하기
        </button>
      </div>
      {isModalOpen && (
        <ConfirmModal
          clickCancel={handleCancel}
          clickDelAndSubmt={handleDelete}
        />
      )}
    </>
  );
}

export default OptionMenu;
