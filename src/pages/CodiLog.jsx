import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import style from '../css/Codi.module.css';
import styleBtn from '../css/TalkPage.module.css'

// components
import Footer from '../components/Footer';
import H2CodiLog from '../components/H2CodiLog';
import CodiLogGallery from '../components/CodiLogGallery';
import CodiLogCalendar from '../components/CodiLogCalendar';
import CodiLogBox from '../components/CodiLogBox';

// Zustand 스토어 가져오기
import { useFeltOptionsStore } from '../store/codiStore'; // 태그 종류 가져오기
import { useLoginInfoStore } from '../store/loginInfoStore';  //유저정보 import

import { url } from "../store/ref";

const CodiLog = () => {
  const navigate = useNavigate();
  const { feltOptions } = useFeltOptionsStore();
  const { userInfo } = useLoginInfoStore();

  const [codiView, setCodiView] = useState('calendar'); // 초기 상태 : 달력

  // 선택한 codilog 체감날씨 filter
  const [feltWeather, setFeltWeather] = useState([]); // 선택한 옵션 배열. 초기 상태 : 빈 배열
  // codi Modal 
  const [modalActive, setModalActive] = useState(null); //코디기록 데이터 _id OR null

  // codiLog list 받아오기
  const [codiLogList, setCodiLogList] = useState([]); //화면에 뿌릴 리스트
  const [ALLcodiLogList, setALLCodiLogList] = useState([]); //전체 리스트

  const [TheYear, setTheYear] = useState(''); //해당 년
  const [TheMonth, setTheMonth] = useState(''); //해당 월

  // 현재 날짜 상태
  const [currentYear, setCurrentYear] = useState(''); //현재 몇년
  const [currentMonth, setCurrentMonth] = useState(''); //현재 몇월

  const [today, setToday] = useState('');
  const [alreadyLog, setAlreadyLog] = useState(false);

  /////*** 페이지 번호를 추적하기 위한 state
  const [page, setPage] = useState(0);
  const limit = 32;
  const observer = useRef(); // IntersectionObserver 참조

  const handleOptionClick = (Option) => {
    if (feltWeather.includes(Option)) {
      const updateFeltWeather = feltWeather.filter((item) => item !== Option);
      setFeltWeather(updateFeltWeather);
    } else {
      setFeltWeather([...feltWeather, Option]);
    }
  };

  const fetchLog = async (page, reset = false) => {
    if (!userInfo) { 
      console.error('User info is not available');
      return;
    }

    try {
      const response = await fetch(`${url}/codiLogList/${userInfo.userid}?page=${page}&limit=${limit}`);
      const data = await response.json();
      console.log('Fetched data:', data); // Fetch된 데이터를 콘솔에 출력

      if (reset) { 
        sessionStorage.setItem('ALLcodiLogList', JSON.stringify(data));
        sessionStorage.setItem('codiLogList', JSON.stringify(data));
        console.log('ALLcodiLogList stored:', JSON.stringify(data));
        console.log('codiLogList stored:', JSON.stringify(data));
        setALLCodiLogList(data);
        setCodiLogList(data);
      } else {
        const updatedALLCodiLogList = [...ALLcodiLogList, ...data];
        sessionStorage.setItem('ALLcodiLogList', JSON.stringify(updatedALLCodiLogList));
        sessionStorage.setItem('codiLogList', JSON.stringify(updatedALLCodiLogList));
        console.log('Updated ALLcodiLogList stored:', JSON.stringify(updatedALLCodiLogList));
        console.log('Updated codiLogList stored:', JSON.stringify(updatedALLCodiLogList));
        setALLCodiLogList(updatedALLCodiLogList);
        setCodiLogList(updatedALLCodiLogList);
      }
    } catch (error) {
      console.error('Error fetching codi log list:', error);
    }
  }

  useEffect(() => {
    const storedALLCodiLogList = sessionStorage.getItem('ALLcodiLogList');
    const storedCodiLogList = sessionStorage.getItem('codiLogList');
    console.log('세션 스토리지 ALLcodiLogList:', storedALLCodiLogList); // 세션 스토리지에서 가져온 데이터를 콘솔에 출력
    console.log('세션 스토리지 codiLogList:', storedCodiLogList);

    if (storedALLCodiLogList && storedCodiLogList) {
      setALLCodiLogList(JSON.parse(storedALLCodiLogList));
      setCodiLogList(JSON.parse(storedCodiLogList));
    } else if (userInfo) {
      setPage(0);
      fetchLog(0, true);
    } else {
      console.error('User info is not available');
    }

    getToday();

  }, [codiView]);

  useEffect(() => {
    if (page > 0) {
      fetchLog(page);
    }
  }, [page]);

  useEffect(() => {
    if (feltWeather.length) {
      const filteredList = ALLcodiLogList.filter((codiLog) => {
        return feltWeather.every((activeTag) => codiLog.tag.includes(activeTag));
      });
      setCodiLogList(filteredList);
    } else {
      setCodiLogList(ALLcodiLogList);
    }
  }, [feltWeather]);

  useEffect(() => {
    getCurrentDate();
  }, [codiView]);

  function getCurrentDate() {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;
    setCurrentYear(year);
    setCurrentMonth(month);

    setTheYear(year);
    setTheMonth(month);
  };

  const lastElementRef = useCallback(node => {
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        setPage(prevPage => prevPage + 1);
        setTheMonth(prevMonth => prevMonth > 1 ? prevMonth - 1 : 12);
      }
    });
    if (node) observer.current.observe(node);
    console.log(page);
  }, []);

  useEffect(() => {
    if (page > 0 && TheMonth === 1) {
      setTheYear(prevYear => prevYear - 1);
    }
  }, [page, TheMonth]);

  const verticalScrollRef = useRef(null);
  const horizontalScrollRef = useRef(null);

  const [isMouseDownVert, setIsMouseDownVert] = useState(false);
  const [startY, setStartY] = useState(0);
  const [scrollTop, setScrollTop] = useState(0);

  const [isMouseDownHorz, setIsMouseDownHorz] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  useEffect(() => {
    const verticalScrollContainer = verticalScrollRef.current;

    const handleMouseDownVert = (e) => {
      setIsMouseDownVert(true);
      setStartY(e.pageY - verticalScrollContainer.offsetTop);
      setScrollTop(verticalScrollContainer.scrollTop);
      verticalScrollContainer.style.cursor = 'grabbing';
      e.preventDefault();
    };

    const handleMouseUpVert = () => {
      setIsMouseDownVert(false);
      if (verticalScrollContainer) {
        verticalScrollContainer.style.cursor = 'grab';
      }
    };

    const handleMouseMoveVert = (e) => {
      if (!isMouseDownVert) return;
      const y = e.pageY - verticalScrollContainer.offsetTop;
      const walkY = y - startY;
      verticalScrollContainer.scrollTop = scrollTop - walkY;
    };

    verticalScrollContainer.addEventListener('mousedown', handleMouseDownVert);
    document.addEventListener('mouseup', handleMouseUpVert);
    document.addEventListener('mousemove', handleMouseMoveVert);

    return () => {
      verticalScrollContainer.removeEventListener('mousedown', handleMouseDownVert);
      document.removeEventListener('mouseup', handleMouseUpVert);
      document.removeEventListener('mousemove', handleMouseMoveVert);
    };
  }, [isMouseDownVert, startY, scrollTop]);

  useEffect(() => {
    const horizontalScrollContainer = horizontalScrollRef.current;

    const handleMouseDownHorz = (e) => {
      setIsMouseDownHorz(true);
      setStartX(e.pageX - horizontalScrollContainer.offsetLeft);
      setScrollLeft(horizontalScrollContainer.scrollLeft);
      horizontalScrollContainer.style.cursor = 'grabbing';
      e.preventDefault();
    };

    const handleMouseUpHorz = () => {
      setIsMouseDownHorz(false);
      if (horizontalScrollContainer) {
        horizontalScrollContainer.style.cursor = 'grab';
      }
    };

    const handleMouseMoveHorz = (e) => {
      if (!isMouseDownHorz) return;
      const x = e.pageX - horizontalScrollContainer.offsetLeft;
      const walkX = x - startX;
      horizontalScrollContainer.scrollLeft = scrollLeft - walkX;
    };

    horizontalScrollContainer.addEventListener('mousedown', handleMouseDownHorz);
    document.addEventListener('mouseup', handleMouseUpHorz);
    document.addEventListener('mousemove', handleMouseMoveHorz);

    return () => {
      horizontalScrollContainer.removeEventListener('mousedown', handleMouseDownHorz);
      document.removeEventListener('mouseup', handleMouseUpHorz);
      document.removeEventListener('mousemove', handleMouseMoveHorz);
    };
  }, [isMouseDownHorz, startX, scrollLeft]);

  function getToday() {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const date = String(currentDate.getDate()).padStart(2, '0');
    setToday(`${year}-${month}-${date}`);
  }

  return (
    <div className={style.codiLog_container}>

      <div className={style.codiLog_subcontainer}>
        <div className={style.codiLog_TopNavi_container}>

          <H2CodiLog setCodiView={setCodiView} />

          <div className={style.codiLog_filter}>
            {feltOptions.map((Option, idx) => (
              <button key={idx}
                onClick={() => handleOptionClick(Option)}
                className={`${style.codiLog_filter_option} ${feltWeather.includes(Option) ? style.active : ''}`}
              >
                {Option}
              </button>
            ))}
          </div>

        </div>

        <div className={style.codiLog_scrollWrapper} ref={verticalScrollRef}>
          <div className={style.codiLog_scrollWrapper_inner} ref={horizontalScrollRef}>
            <CodiLogCalendar
              className={`${style.codiLog_component} ${codiView === 'calendar' ? style.show : style.hide}`}
              codiLogList={codiLogList}
              today={today}
              setModalActive={setModalActive}
            />
            <CodiLogGallery
              className={`${style.codiLog_component} ${codiView === 'gallery' ? style.show : style.hide}`}
              codiLogList={codiLogList}
              setModalActive={setModalActive}
              lastElementRef={lastElementRef}
            />
            <CodiLogBox
              className={`${style.codiLog_component} ${codiView === 'box' ? style.show : style.hide}`}
              codiLogList={codiLogList}
              setModalActive={setModalActive}
            />
          </div>
        </div>

      </div>
      <Footer />
    </div>
  )
}

export default CodiLog;
