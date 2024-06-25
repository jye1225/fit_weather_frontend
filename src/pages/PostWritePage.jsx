import style from '../css/PostWritePage.module.css';

import PostCategorySelect from '../components/PostCategorySelect';
import PostWriteArea from '../components/PostWriteArea';
import CancelBtn from '../components/CancelBtn';
import SubmitBtn from '../components/SubmitBtn';
import PagesHeader from '../components/PagesHeader';
import { useNavigate } from 'react-router-dom';

function PostWritePage() {
  const navigate = useNavigate();
  const postSubmit = (e) => {
    e.preventDefault();
    navigate('/postWriteCmplt');
    console.log(e);
  };

  const clickCancel = () => {
    window.location = '/community';
  };
  return (
    <>
      <PagesHeader title={'글쓰기'} />
      <main className={`mw ${style.postWritePage}`}>
        <form className={style.postWriteForm}>
          <PostCategorySelect />
          <PostWriteArea />
          <div className={style.editBtnCon}>
            <CancelBtn clickCancel={clickCancel} />
            <SubmitBtn postSubmit={postSubmit} text={'글쓰기'} />
          </div>
        </form>
      </main>
    </>
  );
}

export default PostWritePage;
