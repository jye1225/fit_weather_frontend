import style from '../css/DetailComment.module.css';
import { useCmntOptnMenu } from '../store/OnCmntOptnMenuStore';
import CommentOptionMenu from './CommentOptionMenu';

function DetailComment() {
  const { isOn, cmntOptnMenuOn, cmntOptnMenuOff } = useCmntOptnMenu();
  const cmntOptnMenuToggle = () => {
    console.log('댓글편집버튼클릭');
    if (!isOn) {
      cmntOptnMenuOn();
    } else {
      cmntOptnMenuOff();
    }
  };

  return (
    <li className={style.comment}>
      <div className={style.userImg}>
        <img src="/img/img2.jpg" alt="유저이미지" />
      </div>
      <span className={`fontTitleS ${style.userName}`}>유저B</span>
      <span className={`fontBodyS ${style.commentDate}`}>10분 전</span>
      <i
        className="fa-solid fa-ellipsis-vertical"
        onClick={cmntOptnMenuToggle}
      ></i>
      <p className="fontBodyM">
        댓글이 들어갑니다댓글이 들어갑니다댓글이 들어갑니다댓글이
        들어갑니다댓글이 들어갑니다댓글이 들어갑니다
      </p>
      <CommentOptionMenu />
    </li>
  );
}

export default DetailComment;
