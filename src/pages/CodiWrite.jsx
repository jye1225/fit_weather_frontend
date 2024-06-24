import React, { useState, useEffect } from 'react'
import H2CodiWrite from "../components/H2CodiWrite";
import style from '../css/Codi.module.css'
// Zustand 스토어 가져오기
import { useFeltOptionsStore } from '../store/codiStore';
// import { useCodiWriteStore } from '../store/codiStore';


const CodiWrite = () => {
    // Zustand 스토어에서  가져오기
    const { feltOptions } = useFeltOptionsStore();

    const [activeOptions, setActiveOptions] = useState([]);    // 선택한 옵션 배열 . 초기 상태 : 빈 배열
    const [memo, setMemo] = useState('');
    const [file, setFile] = useState('');
    const [filePreview, setFilePreview] = useState(''); // 파일 미리보기 URL 상태 추가
    const [fileMss, setFileMss] = useState('');

    // 체감날씨 버튼 클릭 -> 배열에 쌓임
    const handleBtnClick = (option) => {
        if (activeOptions.includes(option)) {
            const updateActiveOptions = activeOptions.filter(item => item != option);
            setActiveOptions(updateActiveOptions);
        } else {
            setActiveOptions([...activeOptions, option]);
        }
        console.log(`클릭된 버튼== ${activeOptions}`);
    };


    // 파일이 변경되었을 때 미리보기 URL 업데이트
    useEffect(() => {
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFilePreview(reader.result); // 파일 읽기가 끝나면 파일 미리보기 URL 업데이트
            };
            reader.readAsDataURL(file); // 파일을 Data URL로 읽기

            setFileMss('');
            document.querySelector(`.${style.imgCon}`).style.border = '1px solid var(--grey-200)'
        } else {
            setFilePreview(''); // 파일이 없을 때 미리보기 URL 초기화
        }
    }, [file]);

    const handleSubmit = async (e) => {
        e.preventDefault(); // 기본 제출 동작을 막음
        if (filePreview === '') {
            setFileMss('* 사진을 첨부해주세요.');
            document.querySelector(`.${style.imgCon}`).style.border = '1px solid var(--accnet-color)'
            return;
        } else {
            setFileMss('');
        }
        console.log('handleSubmit', activeOptions, file, memo);

        // BE로 데이터 전송하기
        const data = new FormData();    //객체스타일로 담김. 다양한 메서드 사용 가능.  set,append ...
        data.set('image', file);
        data.set('content', memo);
        data.set('tag', activeOptions);

        console.log('data', data);   //data가 아무것도 안 담김...(수정중)
        try {
            const response = await fetch(`https://localhost:8000/codiWrite`, {
                method: 'POST',
                body: data,
                credentials: 'include', // 쿠키를 주고받기 위한 사전작업
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            console.log("fe에서 post 요청 성공");

            // 여기서 필요에 따라 추가적인 처리 가능

        } catch (error) {
            console.error('Error:', error);
            // 여기서 오류 처리를 할 수 있습니다.
        }
    };



    return (
        <main className={`mw ${style.codiWrite}`}>
            <H2CodiWrite />
            <section className={style.codiWriteFrame} >
                <h3 className='fontHead3'>2023년 00월 99일 9요일</h3>
                <div className={style.weatherInfo}>
                    <span className={`fontTitleXS ${style.miniTag}`}>강남구</span>
                    <span className={`fontTitleS ${style.date}`}>2023년 06월 08일</span>
                    <img src="img/icons/common/12devider.svg" alt="12devider" />
                    <span className={`fontTitleS ${style.weather}`}>17°/28° 비</span>
                </div>
                <div className={style.imgCon}>
                    {file ? (
                        <img className={style.selectImg} src={filePreview} alt="선택된 파일" />
                    ) : ''}

                    {fileMss ? (
                        <span className={`fontTitleM ${style.fileMss}`}>{fileMss}</span>
                    ) : ''}
                    <label className={style.BtnImgUpload} htmlFor="postimg">
                        <input hidden
                            type="file"
                            multiple={false} //: 여러 파일을 선택할 수 없도록 설정
                            id="postimg" name="postimg"
                            onChange={(e) => { setFile(e.target.files[0]) }} />
                    </label>
                </div>
                <div className={style.Qfelt}>
                    <p className='fontHead3'>오늘의 체감 날씨는?</p>
                    <div className={style.togglesArea}>
                        {feltOptions.map((option, index) => (
                            <button
                                key={'feltOptions' + index}
                                className={`${style.BtnToggle} fontBodyM ${activeOptions.includes(option) ? style.active : ''}`}
                                onClick={() => handleBtnClick(option)}>
                                {option}
                            </button>
                        ))}
                    </div>
                </div>
                <div className={style.Qmemo}>
                    <label htmlFor='memo' className='fontHead3'>오늘의 코디 메모!</label>
                    <textarea
                        className='fontBodyM'
                        name="memo" id="memo"
                        maxLength="100"
                        placeholder='날씨와 코디에 대한 간단한 메모를 남겨보세요. (최대 100자)'
                        value={memo}  // textarea의 값은 memo 상태와 바인딩됩니다.
                        onChange={(e) => { setMemo(e.target.value) }}  // 입력이 변경될 때마다 memo 상태 업데이트.
                    ></textarea>

                </div>
            </section>

            <div className={style.bottomBtns}>
                <button className={`fontTitleM ${style.btnCancel}`}>취소</button>
                <button className={`fontTitleM ${style.btnMethod}`} onClick={handleSubmit}>코디 기록하기</button>
            </div>
        </main >
    )
}

export default CodiWrite