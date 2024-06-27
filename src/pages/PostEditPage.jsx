import style from '../css/PostEditPage.module.css';

import PostCategorySelect from '../components/PostCategorySelect';
import PostWriteArea from '../components/PostWriteArea';
import CancelBtn from '../components/CancelBtn';
import SubmitBtn from '../components/SubmitBtn';
import PagesHeader from '../components/PagesHeader';
import ConfirmModal from '../components/ConfirmModal';
import { useRewriteStore } from '../store/rewriteStore';
import { useParams } from 'react-router-dom';

function PostEditPage() {
  const { isRwrtCofirm, onRwrtCofirm, offRwrtCofirm } = useRewriteStore();
  const { postId } = useParams();

  const postSubmit = (e) => {
    e.preventDefault();
    console.log(e);
  };

  const clickEditBtn = () => {
    onRwrtCofirm();
  };
  const cancelEditBtn = () => {
    window.location = `/detail/${postId}`;
  };

  const cofirmCancelBtn = () => {
    offRwrtCofirm();
  };

  const confirmSubmitBtn = () => {
    offRwrtCofirm();
    window.location = `/detail/${postId}`;
  };

  return (
    <>
      <PagesHeader title={'글수정'} />
      <main className={`mw ${style.postWritePage}`}>
        <form onSubmit={postSubmit} className={style.postWriteForm}>
          <PostCategorySelect />
          <PostWriteArea />
          <div className={style.editBtnCon}>
            <CancelBtn clickCancel={cancelEditBtn} />
            <SubmitBtn text={'수정하기'} postSubmit={clickEditBtn} />
          </div>
        </form>
        {isRwrtCofirm && (
          <ConfirmModal
            btnText={'수정하기'}
            message={'글 수정을 완료하시겠습니까?'}
            clickCancel={cofirmCancelBtn}
            clickDelAndSubmt={confirmSubmitBtn}
          />
        )}
      </main>
    </>
  );
}

export default PostEditPage;
