import style from '../css/PostEditPage.module.css';

import PostCategorySelect from '../components/PostCategorySelect';
import PostWriteArea from '../components/PostWriteArea';
import CancelBtn from '../components/CancelBtn';
import SubmitBtn from '../components/SubmitBtn';
import PagesHeader from '../components/PagesHeader';
import ConfirmModal from '../components/ConfirmModal';

function PostEditPage() {
  const postSubmit = (e) => {
    e.preventDefault();
    console.log(e);
  };

  return (
    <>
      <PagesHeader title={'글수정'} />
      <main className={`mw ${style.postWritePage}`}>
        <form onSubmit={postSubmit} className={style.postWriteForm}>
          <PostCategorySelect />
          <PostWriteArea />
          <div className={style.editBtnCon}>
            <CancelBtn />
            <SubmitBtn text={'수정하기'} />
          </div>
        </form>
        <ConfirmModal message={'글 수정을 완료하시겠습니까?'} />
      </main>
    </>
  );
}

export default PostEditPage;
