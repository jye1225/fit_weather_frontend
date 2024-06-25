import React, { useState, useEffect } from 'react';
import H2CodiWrite from "../components/H2CodiWrite";
import style from '../css/Codi.module.css';
import { useFeltOptionsStore } from '../store/codiStore';
import { useNavigate } from 'react-router-dom';


const CodiWrite = () => {
    const navigate = useNavigate();

    const { feltOptions } = useFeltOptionsStore();  // Zustand 스토어에서 필요한 상태 가져오기

    // 상태 설정
    const [activeOptions, setActiveOptions] = useState([]);    // 선택한 옵션 배열. 초기 상태는 빈 배열
    const [memo, setMemo] = useState('');                       // 메모 상태
    const [file, setFile] = useState('');                       // 파일 상태
    const [filePreview, setFilePreview] = useState('');         // 파일 미리보기 URL 상태
    const [fileMss, setFileMss] = useState('');                 // 파일 메시지 상태

    // 체감날씨 버튼 클릭 핸들러
    const handleBtnClick = (option) => {
        if (activeOptions.includes(option)) {
            const updateActiveOptions = activeOptions.filter(item => item !== option);
            setActiveOptions(updateActiveOptions);
        } else {
            setActiveOptions([...activeOptions, option]);
        }
    };

    // 파일 선택 시 미리보기 URL 업데이트
    useEffect(() => {
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFilePreview(reader.result);  // 파일 읽기가 끝나면 파일 미리보기 URL 업데이트
            };
            reader.readAsDataURL(file);  // 파일을 Data URL로 읽기

            setFileMss('');
            document.querySelector(`.${style.imgCon}`).style.border = '1px solid var(--grey-200)';
        } else {
            setFilePreview('');  // 파일이 없을 때 미리보기 URL 초기화
        }
    }, [file]);

    // 폼 제출 핸들러
    const handleSubmit = async (e) => {
        e.preventDefault();  // 기본 제출 동작 막기
        if (filePreview === '') {
            setFileMss('* 사진을 첨부해주세요.');
            document.querySelector(`.${style.imgCon}`).style.border = '1px solid var(--accnet-color)';
            return;
        } else {
            setFileMss('');
        }

        // FormData 객체 생성 및 데이터 추가
        const data = new FormData();
        data.append('file', file);
        data.append('memo', memo);
        activeOptions.forEach(option => data.append('tag', option));

        // FormData 객체의 내용 확인 (디버깅용)
        for (let [key, value] of data.entries()) {
            console.log(key, value);
        }

        try {
            const response = await fetch(`https://localhost:8080/codiWrite`, {
                method: 'POST',
                body: data,
                credentials: 'include',  // 쿠키 주고받기 위한 설정
            });

            if (response) {
                console.log('/n response@@@@', response);

                navigate('/codiLog');
            }

        } catch (error) {
            console.error('Error:', error);
            // 오류 처리
        }
    };

    return (
        <main className={`mw ${style.codiWrite}`}>
            <H2CodiWrite />
            <section className={style.codiWriteFrame}>
                <h3 className='fontHead3'>2023년 00월 99일 9요일</h3>
                <div className={style.weatherInfo}>
                    <span className={`fontTitleXS ${style.miniTag}`}>강남구</span>
                    <span className={`fontTitleS ${style.date}`}>2023년 06월 08일</span>
                    <img src="img/icons/common/12devider.svg" alt="12devider" />
                    <span className={`fontTitleS ${style.weather}`}>17°/28° 비</span>
                </div>
                <div className={style.imgCon}>
                    {file && (
                        <img className={style.selectImg} src={filePreview} alt="선택된 파일" />
                    )}

                    {fileMss && (
                        <span className={`fontTitleM ${style.fileMss}`}>{fileMss}</span>
                    )}
                    <label className={style.BtnImgUpload} htmlFor="postimg">
                        <input
                            hidden
                            type="file"
                            multiple={false}  // 한 번에 여러 파일 선택 불가
                            id="postimg"
                            name="postimg"
                            onChange={(e) => { setFile(e.target.files[0]) }}
                        />
                    </label>
                </div>
                <div className={style.Qfelt}>
                    <p className='fontHead3'>오늘의 체감 날씨는?</p>
                    <div className={style.togglesArea}>
                        {feltOptions.map((option, index) => (
                            <button
                                key={'feltOptions' + index}
                                className={`${style.BtnToggle} fontBodyM ${activeOptions.includes(option) ? style.active : ''}`}
                                onClick={() => handleBtnClick(option)}
                            >
                                {option}
                            </button>
                        ))}
                    </div>
                </div>
                <div className={style.Qmemo}>
                    <label htmlFor='memo' className='fontHead3'>오늘의 코디 메모!</label>
                    <textarea
                        className='fontBodyM'
                        name="memo"
                        id="memo"
                        maxLength="100"
                        placeholder='날씨와 코디에 대한 간단한 메모를 남겨보세요. (최대 100자)'
                        value={memo}
                        onChange={(e) => { setMemo(e.target.value) }}
                    ></textarea>
                </div>
            </section>

            <div className={style.bottomBtns}>
                <button className={`fontTitleM ${style.btnCancel}`}>취소</button>
                <button className={`fontTitleM ${style.btnMethod}`} onClick={handleSubmit}>코디 기록하기</button>
            </div>
        </main>
    );
};

export default CodiWrite;  // 함수 컴포넌트 CodiWrite를 외부로 내보냄
