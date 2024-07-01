import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import style from '../css/Codi.module.css'
import ActionSheet from './ActionSheet';

import { useLoginInfoStore } from '../store/loginInfoStore';  //유저정보 import

const CodiLogBoxsMain = () => {
    // useState for ActionSheet
    const [today, setToday] = useState('');//오늘날짜
    const [canEdit, setCanEdit] = useState(false);//수정 가능한지 아닌지
    const [actionSheetActive, setActionSheetActive] = useState(false);
    const [tags, setTags] = useState([]);

    // 로컬스토리지에서 받아올 오늘 날씨 정보
    const [minTemp, setMinTemp] = useState('');
    const [maxTemp, setMaxTemp] = useState('');
    const [sky, setSky] = useState('');

    const [logToday, setLogToday] = useState('');//받아온 오늘 기록

    const { userInfo } = useLoginInfoStore();
    useEffect(() => {

        // 오늘 날짜 저장
        const currentDate = new Date();
        const options = {
            year: 'numeric',
            month: '2-digit', //2자리 맞추도록 
            day: '2-digit',
        };
        const today = currentDate.toLocaleString('ko-KR', options).replace(/\./g, '').replace(/\ /g, '-');//0000-00-00
        console.log('today', today);
        setToday(today);


        // minTemp와 maxTemp를 로컬스토리지에서 가져와서 설정
        const storedMinTemp = localStorage.getItem('minTemp');
        const storedMaxTemp = localStorage.getItem('maxTemp'); const storedSky = localStorage.getItem('weatherText');

        if (storedMinTemp) setMinTemp(storedMinTemp);
        if (storedMaxTemp) setMaxTemp(storedMaxTemp); if (storedSky) setSky(storedSky);


        fetch(`https://localhost:8080/codiLogToday/${today}`)//get요청 보냄 
            .then((res) => res.json())
            .then((data) => {

                setLogToday(data);
                setTags(data.tag);

                console.log('---선택 기록 setLogToday 전달 성공----', data);
                //     // 오늘 날짜 저장
                //     const today = new Date();
                //     // codiDate 문자열을 Date 객체로 변환
                //     const codiDate = new Date(data.codiDate);
                //     const diff = (today - codiDate) / (1000 * 60 * 60 * 24); // 며칠 차이나는지 계산
                //     if (diff < 3) {
                //         setCanEdit(true);
                //     } else {
                //         setCanEdit(false);
                //     }
            });

    }, [])

    useEffect(() => {
        if (sky && minTemp && maxTemp) {
            fetch(`https://localhost:8080/codiLogSimilar/${maxTemp}/${minTemp}/${sky}`);
        }
    }, [sky, minTemp, maxTemp]);


    return (
        <section className={style.CodiLogBoxsMain}>
            <div className={`${style.logBox} ${style.today}`}>
                <div className={style.top}>
                    <h3 className='fontHead3'>오늘의 코디 기록</h3>
                    <img src="img/icons/common/dot.svg" className={style.DotIcon} onClick={() => setActionSheetActive(true)} alt="dot" />
                </div>

                <div className={style.postInfo}>
                    <span className={`fontTitleS ${style.date}`}>
                        {/* {codiLog.codiDate} */}
                        {today.split('-')[0]}년  {today.split('-')[1]}월 {today.split('-')[2]}일
                    </span>
                    <img src="img/icons/common/12devider.svg" alt="12devider" />
                    <span className={`fontTitleS ${style.weather}`}> {maxTemp}°/ {minTemp}°</span>
                    {/* <img src="img/icons/common/12devider.svg" alt="12devider" /> */}
                    <span className={`fontTitleS ${style.sky}`}>{sky}</span>
                </div>

                {
                    logToday.length !== 0 ? (
                        <>
                            <div className={style.imgBox}>
                                <img src={`https://localhost:8080/${logToday.image}`} alt={logToday.image} />
                            </div>
                            <div className={style.tags}>
                                {
                                    tags.map((feltTag, index) => {
                                        return (
                                            <span className={`fontTitleXS ${style.miniTag}`} key={index}>{feltTag}</span>
                                        );
                                    })
                                }
                            </div>
                            <p className={`fontDecorate ${style.codiMemo}`}>{logToday.memo}</p>
                        </>) : (<>
                            <div className={style.noLogToday}>
                                <img src="img/icons/common/alertG600.svg" alt="alert" />
                                <span className='fontTitleM'>오늘 코디 기록을 안하셨어요 !</span>
                            </div>
                            <Link to={'/codiWrite'} className={`fontTitleM ${style.btnWide}`}>오늘 코디 기록하기</Link>
                        </>)
                }
            </div>
            <p className={`fontDecorate ${style.codiMemo}`}>{logToday.memo}</p>
          </>
        ) : (
          <>
            <div className={style.noLogToday}>
              <img src="img/icons/common/alertG600.svg" alt="alert" />
              <span className="fontTitleM">오늘 코디 기록을 안하셨어요 !</span>
            </div>
            <Link to={"/codiWrite"} className={`fontTitleM ${style.btnWide}`}>
              오늘 코디 기록하기
            </Link>
          </>
        )}
      </div>
      <ActionSheet
        setActionSheetActive={setActionSheetActive}
        actionSheetActive={actionSheetActive}
        canEdit={true}
      />
    </section>
  );
};

export default CodiLogBoxsMain;
