import { useEffect, useState, useRef } from 'react';
import style from '../css/Codi.module.css'
import { url } from '../store/ref'
const CodiLogCalendar = ({ feltWeather, setModalActive, codiLogList, lastElementRef, TheMonth, TheYear }) => {
    // console.log('필터 종류 - 달력/codiLogList', feltWeather, );
    console.log('codiLogList- 달력/', codiLogList);
    const [monthBoxes, setMonthBoxes] = useState([]); // 렌더링할 달력 박스들

    // 해당 달에 대한 상태
    const [LastDate, setLastDate] = useState('');//해당 달 며칠까지 있는지
    const [FirstDay, setFirstDay] = useState('');//해당 달 첫날 요일


    // useEffect(() => {
    //     console.log('!!!!!!!전달된 날짜', TheMonth, TheYear);
    // }, [])

    useEffect(() => {//변동감지용
        console.log('----- TheYear TheMonth 변동 : ', TheYear, TheMonth);
        getFirstLastDate(TheYear, TheMonth);
    }, [TheYear, TheMonth])

    useEffect(() => {//변동감지용
        console.log('-----FirstDay LastDate 변동 : ', TheMonth, '월:', FirstDay, '요일부터/', LastDate, '일까지');

        if (FirstDay !== '' && LastDate !== '') {
            addMonthBox(TheYear, TheMonth, FirstDay, LastDate); // FirstDay와 LastDate가 모두 설정된 후에만 호출
        }
    }, [FirstDay, LastDate])


    function getFirstLastDate(Year, Month) {
        const lastDay = new Date(Year, Month, 0).getDate(); // 이번 달의 마지막 일자
        const firstDayOfWeek = new Date(Year, Month - 1, 1).getDay();//(0: 일요일, 1: 월요일, ..., 6: 토요일)
        // console.log('getFirstLastDate', firstDayOfWeek);
        if (lastDay && firstDayOfWeek) {
            setLastDate(lastDay);
            setFirstDay(firstDayOfWeek);
        }
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
                <li
                    className={style.day}
                    key={`${Year}-${monthNum}-${dayNum}`}>
                    {/* li의 키값: 날짜 ex 2024-07-04 */}
                    <div className={style.imgCon}>
                        {/* <img src={`${url}/uploads/codiLog/1719853930121.jpeg`} alt="" /> */}
                    </div>
                    <span>{i}</span>
                </li>);
        }
        return dayBoxs;
    }

    function renderTheMonthBox(TheYear, TheMonth, FirstDay, LastDate) {
        return (
            <div ref={lastElementRef} className={style.month} key={`${TheYear}-${TheMonth}`}>
                <strong className='fontTitleM'>{TheYear}년 {TheMonth}월</strong>
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
                    {renderDayBoxs(TheYear, TheMonth, LastDate)}

                </ul >
            </div >
        )
    }

    function addMonthBox(Year, Month, FirstDay, LastDate) {
        const newMonthBox = renderTheMonthBox(Year, Month, FirstDay, LastDate);

        // monthBoxes 배열에서 key 값이 newMonthBox.key와 같은 요소를 제외 => 맨 처음에 이상한 7월 Box 생성되는거 없애서 해결
        setMonthBoxes(prevBoxes => prevBoxes.filter(box => box.key !== newMonthBox.key));

        setMonthBoxes(prevBoxes => [...prevBoxes, newMonthBox]); // 새로운 박스를 뒤에 추가
    }
    useEffect(() => {
        console.log('>>>>>monthBoxes', monthBoxes);
    }, [monthBoxes])

    return (
        <div className={style.calendarWrap} >

            {monthBoxes}

        </div >
    )
}

export default CodiLogCalendar


{/*----------- li samples -----------*/ }
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