import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";

import style from '../css/Codi.module.css';
import { url } from '../store/ref';
import ActionSheet from '../components/ActionSheet';

const CodiLogBox = ({ setModalActive, modalActive, noTodayLogModal, setNoTodayLogModal }) => {
    console.log(modalActive);

    // ** ActionSheet
    const [actionSheetActive, setActionSheetActive] = useState(false);
    const [canEdit, setCanEdit] = useState(false); // 수정 가능한지 아닌지
    const [codiLog, setCodiLog] = useState([]);
    const [tags, setTags] = useState([]);
    const [date, setDate] = useState('');

    // 로컬스토리지에서 받아올 오늘 날씨 정보
    const [minTemp, setMinTemp] = useState('');
    const [maxTemp, setMaxTemp] = useState('');
    const [sky, setSky] = useState('');
    const [todayText, setTodayText] = useState(''); // 오늘날짜 화면출력용

    useEffect(() => {
        const storedMinTemp = localStorage.getItem('minTemp');
        const storedMaxTemp = localStorage.getItem('maxTemp');
        const storedSky = localStorage.getItem('weatherText');

        if (storedMinTemp) { setMinTemp(storedMinTemp); }
        if (storedMaxTemp) { setMaxTemp(storedMaxTemp); }
        if (storedSky) {
            setSky(storedSky);
        }

        // 오늘 날짜 저장
        const todayDate = new Date();
        const options = {
            year: 'numeric',
            month: '2-digit', //2자리 맞추도록 
            day: '2-digit',
        };
        const today = todayDate.toLocaleString('ko-KR', options).replace(/\./g, '').replace(/\ /g, '-'); //0000-00-00
        setTodayText(`${today.split('-')[0]}년 ${today.split('-')[1]}월 ${today.split('-')[2]}일`);

        if (modalActive) {
            fetch(`${url}/codiLogDetail/${modalActive}`) // get 요청 보냄
                .then((res) => res.json())
                .then((data) => {
                    setCodiLog(data);
                    setTags(data.tag);
                    setDate(`${data.codiDate.split('-')[0]}년 ${data.codiDate.split('-')[1]}월 ${data.codiDate.split('-')[2]}일`);

                    console.log('--- 선택 기록 data 전달 성공----', data);

                    // codiDate 문자열을 Date 객체로 변환
                    const codiDate = new Date(data.codiDate);
                    const diff = (todayDate - codiDate) / (1000 * 60 * 60 * 24); // 며칠 차이나는지 계산
                    setCanEdit(diff < 3);
                });
        }
    }, [modalActive]);

    return modalActive ? (
        <div className={style.CodiLogBox}>
            <div className={style.top}>
                <img src="img/icons/common/x.svg" className={style.XIcon} onClick={() => setModalActive(null)} alt="x" />
                <h3 className='fontHead3'>내 코디 기록</h3>
                <img src="img/icons/common/dot.svg" className={style.DotIcon} onClick={() => setActionSheetActive(true)} alt="dot" />
            </div>
            <div className={style.postInfo}>
                <span className={`fontTitleS ${style.date}`}>
                    {date}
                </span>
                <img src="img/icons/common/12devider.svg" alt="12devider" />
                <span className={`fontTitleS ${style.weather}`}> {codiLog.maxTemp}°/ {codiLog.minTemp}°</span>
                <span className={`fontTitleS ${style.sky}`}>{sky}</span>
            </div>
            <div className={style.imgBox}>
                <img src={`${url}/${codiLog.image}`} alt={codiLog.image} />
            </div>
            <div className={style.tags}>
                {tags.map((feltTag, index) => (
                    <span className={`fontTitleXS ${style.miniTag}`} key={index}>{feltTag}</span>
                ))}
            </div>
            <p className={`fontDecorate ${style.codiMemo}`}>
                {codiLog.memo}
            </p>
            <ActionSheet setActionSheetActive={setActionSheetActive} actionSheetActive={actionSheetActive} canEdit={canEdit} codiLogId={modalActive} />
        </div>
    ) : noTodayLogModal ? (
        <div className={`${style.logBox} ${style.today} ${style.inCalendar}`}>
            <div className={style.top}>
                <img src="img/icons/common/x.svg" className={style.XIcon} onClick={() => setNoTodayLogModal(false)} alt="x" />
                <h3 className='fontHead3'>오늘의 코디 기록</h3>
            </div>
            <div className={style.postInfo}>
                <span className={`fontTitleS ${style.date}`}>
                    {todayText}
                </span>
                <img src="img/icons/common/12devider.svg" alt="12devider" />
                <span className={`fontTitleS ${style.weather}`}> {maxTemp}°/ {minTemp}°</span>
                <span className={`fontTitleS ${style.sky}`}>{sky}</span>
            </div>
            <div className={style.noLogToday}>
                <img src="img/icons/common/alertG600.svg" alt="alert" />
                <span className="fontTitleM">오늘 코디 기록을 안하셨어요 !</span>
            </div>
            <Link to={"/codiWrite"} className={`fontTitleM ${style.btnWide}`}>
                오늘 코디 기록하기
            </Link>
        </div>
    ) : '';
};

export default CodiLogBox;
