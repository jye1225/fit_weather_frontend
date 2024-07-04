import React, { useEffect, useState, useRef, useCallback } from 'react';
import style from '../css/Codi.module.css';
// conponents
import H2CodiLog from '../components/H2CodiLog';
import CodiLogGallery from '../components/CodiLogGallery';
import CodiLogCalendar from '../components/CodiLogCalendar';
import CodiLogBox from '../components/CodiLogBox';
// Zustand 스토어 가져오기
import { useFeltOptionsStore } from '../store/codiStore'; // 태그 종류 가져오기
import { useLoginInfoStore } from '../store/loginInfoStore';  //유저정보 import

import { url } from "../store/ref";


const CodiLog = () => {

  const { feltOptions } = useFeltOptionsStore();
  const { userInfo } = useLoginInfoStore();

  const [codiView, setCodiView] = useState('calendar'); // 초기 상태 : 달력
  //  선택한 codilog 체감날씨 filter
  const [feltWeather, setFeltWeather] = useState([]); // 선택한 옵션 배열 . 초기 상태 : 빈 배열
  //  codi Modal 
  const [modalActive, setModalActive] = useState(null); //코디기록 데이터 _id OR null

  //  codiLog list 받아오기
  const [codiLogList, setCodiLogList] = useState([]);//화면에 뿌릴 리스트
  const [ALLcodiLogList, setALLCodiLogList] = useState([]);//전체 리스트


  /////*** 페이지 번호를 추적하기 위한 state
  const [page, setPage] = useState(0);
  const limit = 16;
  const observer = useRef();// IntersectionObserver 참조


  const handleOptionClick = (Option) => {
    if (feltWeather.includes(Option)) {
      const updateFeltWeather = feltWeather.filter((item) => item !== Option);
      setFeltWeather(updateFeltWeather);
    } else {
      setFeltWeather([...feltWeather, Option]);
    }
  };

  const fetchLog = (page, reset = false) => {
    if (!userInfo) { return };

    try {
      fetch(`${url}/codiLogList/${userInfo.userid}?page=${page}&limit=${limit}`)
        .then((res) => res.json())//
        .then((data) => {
          if (reset) { // reset 파라미터가 true이면 데이터 초기화
            setALLCodiLogList(data);
            setCodiLogList(data);
          } else {
            setALLCodiLogList(prev => [...prev, ...data]);
            setCodiLogList(prev => [...prev, ...data]);
          }
        })

    } catch (error) {
      console.error('Error fetching codi log list:', error);
    }
  }

  useEffect(() => {
    if (userInfo) {  // userInfo가 유효한지 확인
      setPage(0); // 페이지 번호 초기화
      fetchLog(0, true); // 초기 데이터 가져오기, reset 파라미터를 true로 설정
    } else {
      console.error('User info is not available');
    }
  }, [userInfo, codiView]);


  useEffect(() => {
    if (page > 0) {
      fetchLog(page); // 페이지가 변경될 때마다 데이터 가져오기
    }
    // console.log("****전체:", ALLcodiLogList);
    // console.log("****뿌릴:", codiLogList);
  }, [page]);

  useEffect(() => {//선택한 태그를 포함하는 게시물 필터링
    if (feltWeather.length) {//필터링 선택한게 있다면..
      const filteredList = ALLcodiLogList.filter((codiLog) => {
        return (
          feltWeather.every((activeTag) => codiLog.tag.includes(activeTag))  //every() -> feltWeather 배열의 모든 요소에 대해 콜백 함수를 실행하여 모든 요소가 true인 경우에만 true를 반환. 즉, 모든 필터 조건이 item.tag에 포함되어 있어야만 true가 반환.
        );
      });
      setCodiLogList(filteredList);
    } else {
      setCodiLogList(ALLcodiLogList);
    }
  }, [feltWeather]);




  useEffect(() => {
    getCurrentDate()
  }, [codiView]);

  const [TheYear, setTheYear] = useState('');//해당 년
  const [TheMonth, setTheMonth] = useState('');;//해당 월

  // 현재 날짜 상태
  const [currentYear, setCurrentYear] = useState('');//현재 몇년
  const [currentMonth, setCurrentMonth] = useState('');;//현재 몇월




  function getCurrentDate() {
    const currentDate = new Date();
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth() + 1
    setCurrentYear(year);
    setCurrentMonth(month);

    //해당 년/월을 현재 날짜로 세팅
    //  이 함수는 마운트 때 한 번만 실행될 것 같아서 일단 여기서 세팅...
    setTheYear(currentDate.getFullYear());
    setTheMonth(currentDate.getMonth() + 1);

  };


  //****  마지막 요소에 대한 ref 설정 및 Intersection Observer 콜백 함수
  const lastElementRef = useCallback(node => {
    if (observer.current) observer.current.disconnect(); // 기존 observer 해제
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) { // 마지막 요소가 뷰포트에 들어오면
        setPage(prevPage => prevPage + 1); // 페이지 증가
        setTheMonth(prevMonth => prevMonth > 1 ? prevMonth - 1 : 12); // TheMonth 값을 하나 줄이고, 1 이하가 되면 12로 되돌림
        if (TheMonth === 1) { // 1월에서 12월로 넘어갈 때 TheYear를 하나 줄임
          setTheYear(prevYear => prevYear - 1);
        }
      }
    });
    if (node) observer.current.observe(node); // 새로운 요소 관찰 시작
    // console.log(page);
  }, []);


  return (
    <main className={`mw ${style.codiLog}`}>
      <H2CodiLog codiView={codiView} setCodiView={setCodiView} />

      <div className={style.topArea}>
        <h3 className="fontHead3">체감날씨</h3>
        <div className={style.toggleContainer}>
          <div className={style.toggleWrapper}>
            {feltOptions.map((Option, index) => (
              <button
                key={'feltOptions' + index}
                className={`${style.BtnToggle} fontBodyM ${feltWeather.includes(Option) ? style.active : ''
                  }`}
                onClick={() => handleOptionClick(Option)}
              >
                {Option}
              </button>
            ))}
          </div>
        </div>
      </div>
      <section className={style.CodiViewFrame}>
        {codiView === 'gallery' ? (
          <CodiLogGallery
            feltWeather={feltWeather}
            setModalActive={setModalActive}
            codiLogList={codiLogList}
            lastElementRef={lastElementRef} // 마지막 요소 ref 전달

          />
        ) : (
          <CodiLogCalendar
            TheMonth={TheMonth}
            TheYear={TheYear}
            feltWeather={feltWeather}
            setModalActive={setModalActive}
            codiLogList={codiLogList}
            lastElementRef={lastElementRef} // 마지막 요소 ref 전달
          />
        )}
      </section>
      {modalActive ? (
        <section className={style.CodiLogModal}>
          <CodiLogBox
            setModalActive={setModalActive}
            modalActive={modalActive}
          />
        </section>
      ) : (
        ''
      )}
    </main>
  );
};

export default CodiLog;
