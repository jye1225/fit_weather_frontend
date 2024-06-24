import style from '../css/ConfirmModal.module.css';

import CancelBtn from './CancelBtn';
import DeleteEditBtn from './DeleteEditBtn';
import { useOpenMenuModal } from '../store/DetailOpMenuModalStore';
import { useCmntOptnMenu } from '../store/OnCmntOptnMenuStore';
import { useEffect, useRef } from 'react';

function ConfirmModal({ message, clickDelete, clickCancel }) {
  const { isModalOpen, modalClose, opMenuClose } = useOpenMenuModal();
  const { isModalOn } = useCmntOptnMenu();
  const receiveMessage = message || '삭제하시겠습니까?';

  const confirmModalRef = useRef();
  const clickBg = (e) => {
    console.log(e.target);
    console.log(confirmModalRef.current);
    if (
      confirmModalRef.current &&
      !confirmModalRef.current.contains(e.target) &&
      isModalOpen
    ) {
      modalClose();
      opMenuClose();
    }
  };
  useEffect(() => {
    document.addEventListener('mousedown', clickBg);
    return () => {
      document.removeEventListener('mousedown', clickBg);
    };
  }, []);

  return (
    <div
      className={`${style.confirmModal} ${
        isModalOn || isModalOpen ? style.on : ''
      } `}
    >
      <div className={style.confirmMsg} ref={confirmModalRef}>
        <p className="fontHead3">{receiveMessage}</p>
        <CancelBtn clickCancel={clickCancel} />
        <DeleteEditBtn clickDelete={clickDelete} />
      </div>
    </div>
  );
}

export default ConfirmModal;
