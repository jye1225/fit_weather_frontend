import style from '../css/CancelBtn.module.css';

function CancelBtn({ clickCancel }) {
  const clickCanceBtn = (e) => {
    clickCancel();

    // console.log(e);
    // 취소버튼 클릭시 페이지를 벗어나서 목록으로 이동
    // document.querySelector('form').reset(); //폼 초기화하는 코드
  };
  return (
    <button
      type="button"
      className={`fontTitleM ${style.writeCancelBtn}`}
      onClick={clickCanceBtn}
    >
      취소
    </button>
  );
}

export default CancelBtn;
