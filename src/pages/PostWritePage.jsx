import style from '../css/PostWritePage.module.css';

import PostCategorySelect from '../components/PostCategorySelect';
import PostWriteArea from '../components/PostWriteArea';
import CancelBtn from '../components/CancelBtn';
import SubmitBtn from '../components/SubmitBtn';
import PagesHeader from '../components/PagesHeader';
import { useNavigate } from 'react-router-dom';
import { useVerifyPost } from '../store/VerifyPostContentStore';

function PostWritePage() {
  const navigate = useNavigate();
  const { postTitle, postContent, setTitleErrMsg, setContentErrMsg } =
    useVerifyPost();

  const postSubmit = (e) => {
    e.preventDefault();

    // 유효성 검사
    if (postTitle === '') {
      setTitleErrMsg('☁️ 제목을 입력해주세요 ☁️');
      document.getElementById('postTitle').focus();
      return;
    } else {
      setTitleErrMsg('');
    }

    if (postContent === '') {
      setContentErrMsg('☁️ 내용을 입력해주세요 ☁️');
      document.getElementById('postContent').focus();
      return;
    } else {
      setContentErrMsg('');
    }

    navigate('/postWriteCmplt');

    // const data = new FormData();
    // data.set('title', title);
    // data.set('summary', summary);
    // data.append('content', content);
    // data.append('files', files[0]);
    // // 백엔드로 데이터를 전송하는 부분
    // const response = await fetch(`${url}/postWrite`, {
    //   method: 'POST',
    //   body: data,
    //   credentials: 'include',
    // });
    // if (response.ok) {
    //   console.log(response);
    //   navigate('/');
    // }
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
