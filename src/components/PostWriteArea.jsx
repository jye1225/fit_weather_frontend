import { useRef, useState } from 'react';
import style from '../css/PostWriteArea.module.css';
import PostImgFalse from './PostImgFalse';
import PostImgTrue from './PostImgTrue';

function PostWriteArea() {
  const [imgPreviewUrl, setImgPreviewUrl] = useState(null);
  const fileInputRef = useRef(null);

  const ImgSelect = (e) => {
    e.preventDefault();
    console.log(e.target.files);

    let reader = new FileReader();
    let file = e.target.files[0];
    console.log(file);

    reader.onloadend = () => {
      setImgPreviewUrl(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setImgPreviewUrl(null);
    fileInputRef.current.value = null;
  };

  return (
    <div className={style.postWriteArea}>
      <label htmlFor="postTitle" className={style.postTitle}>
        <span className="fontHead3">제목</span>
        <input
          id="postTitle"
          name="postTitle"
          type="text"
          placeholder="제목을 입력하세요."
          className="fontBodyM"
        />
      </label>
      <label htmlFor="postContent" className={style.postContent}>
        <span className="fontHead3">내용</span>
        <textarea
          id="postContent"
          name="postContent"
          placeholder="오늘 코디를 공유해주세요! 오늘 날씨에는 어떻게 입는게 좋을까요?"
          className="fontBodyM"
        />
      </label>

      <div className={style.postImg}>
        <span className="fontHead3">사진</span>
        <div className={style.postImgSelect}>
          <input
            type="file"
            accept="image/*"
            id="postImg"
            name="postImg"
            className="fontBodyM"
            onChange={ImgSelect}
            ref={fileInputRef}
          />
          <button type="button"></button>
        </div>
        <div className={style.postImgPreview}>
          {imgPreviewUrl ? (
            <>
              <PostImgTrue src={imgPreviewUrl} />
              <i onClick={handleRemoveImage}>Remove Image</i>
            </>
          ) : (
            <PostImgFalse />
          )}
        </div>
      </div>
    </div>
  );
}

export default PostWriteArea;
