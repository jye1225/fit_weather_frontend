// 개인정보 수정 동의 모달창

import React from "react";
import style from "../css/ManageModal.module.css";

const ManageModal = ({ onClose, onConfirm }) => {
  return (
    <div className={style.modalBackdrop}>
      <div className={style.modalContainer}>
        <div className={style.modalBody}>
          <p>개인정보 수정을 완료하시겠습니까?</p>
        </div>
        <div className={style.modalFooter}>
          <button className={style.cancelButton} onClick={onClose}>
            취소
          </button>
          <button className={style.confirmButton} onClick={onConfirm}>
            수정하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default ManageModal;
