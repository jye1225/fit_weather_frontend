import { useEffect, useState } from 'react';
import style from '../css/Codi.module.css'
import { url } from '../store/ref'
const CodiLogCalendar = ({ feltWeather, setModalActive, codiLogList, lastElementRef }) => {
    console.log('필터 종류 전달됨 - 달력', feltWeather);

    // 현재 날짜 상태
    const [currentYear, setCurrentYear] = useState('');//현재 몇년
    const [currentMonth, setCurrentMonth] = useState('');;//현재 몇월

    // 해당 달에 대한 상태
    const [TheYear, setTheYear] = useState('');//해당 년
    const [TheMonth, setTheMonth] = useState('');;//해당 월
    const [MonthLastDate, setMonthLastDate] = useState('');//해당 달 며칠까지 있는지
    const [FirstDay, setFirstDay] = useState('');//해당 달 첫날 요일


    useEffect(() => {
        getCurrentDate();
    }, [])

    useEffect(() => {//변동감지용
        console.log('&&&& currentMonth 변동 : ', TheYear, TheMonth);
    }, [TheYear, TheMonth])

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


    function getTheDate(Year, Month) {
        const lastDay = new Date(Year, Month, 0).getDate(); // 이번 달의 마지막 일자
        const firstDayOfWeek = new Date(Year, Month - 1, 1).getDay();//(0: 일요일, 1: 월요일, ..., 6: 토요일)
        setMonthLastDate(lastDay);
        setFirstDay(firstDayOfWeek);
    };


    function renderEmptyDayBoxs(FirstDay) {
        const emptyDayBoxs = [];
        for (let i = 0; i < FirstDay; i++) {
            emptyDayBoxs.push(<li key={`emptyBox${i}`}></li>);
        }
        return emptyDayBoxs;
    };

    function renderDayBoxs(Year, Month, LastDay) {
        const dayBoxs = [];
        const monthNum = Month.toString().padStart(2, '0');

        for (let i = 1; i < LastDay + 1; i++) {
            let dayNum = i.toString().padStart(2, '0');

            dayBoxs.push(
                <li className={style.day} key={`${Year}-${monthNum}-${dayNum}`}>
                    {/* li의 키값: 날짜 ex 2024-07-04 */}
                    <div className={style.imgCon}>
                        {/* <img src={`${url}/uploads/codiLog/1719853930121.jpeg`} alt="" /> */}
                    </div>
                    <span>{i}</span>
                </li>);
        }
        return dayBoxs;
    }

    return (
        <div className={style.calendarWrap} >
            <div className={style.month}>
                <strong className='fontTitleM'>2024년 7월</strong>
                <ul className={`fontBodyL ${style.dayName}`}>
                    <li><span>일</span></li>
                    <li><span>월</span></li>
                    <li><span>화</span></li>
                    <li><span>수</span></li>
                    <li><span>목</span></li>
                    <li><span>금</span></li>
                    <li><span>토</span></li>
                </ul>
                <ul className={`fontBodyL ${style.daysCon}`}>

                    {/* 첫째 날이 시작하는 요일까지 빈 요소를 추가 */}
                    {renderEmptyDayBoxs(FirstDay)}

                    {/* 해당 달의 마지막날까지 day 박스 추가 */}
                    {renderDayBoxs(currentYear, currentMonth, MonthLastDate)}

                    {/*----------- li samples -----------*/}
                    {/* <li className={style.day}>
                        <div className={style.imgCon}>
                            <img src={`${url}/uploads/codiLog/1719853930121.jpeg`} alt="" />
                        </div>
                        <span>1</span>
                    </li> */}
                    {/* <li className={`${style.day} ${style.activeTag}`}>
                        <div className={style.imgCon}>
                            <img src={`${url}/uploads/codiLog/1719855085236.jpeg`} alt="" />
                        </div>
                        <span>2</span>
                    </li> */}
                    {/* <li className={`${style.day} ${style.activeToday}`}>
                        <div className={style.imgCon}>
                            <img src={`${url}/uploads/codiLog/1719854442475.jpeg`} alt="" />
                        </div>
                        <span>5</span>
                    </li> */}
                </ul >
            </div >
        </div >
    )
}

export default CodiLogCalendar