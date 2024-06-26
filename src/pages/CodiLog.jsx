import React, { useEffect, useState } from 'react'
import style from '../css/Codi.module.css'
// conponents
import H2CodiLog from "../components/H2CodiLog";
import CodiLogGallery from '../components/CodiLogGallery'
import CodiLogCalendar from '../components/CodiLogCalendar'
import CodiLogBox from '../components/CodiLogBox'
// Zustand 스토어 가져오기
import { useFeltOptionsStore } from '../store/codiStore'; // Zustand 스토어 가져오기

const CodiLog = () => {

    // ** switchCodiView
    const [codiView, setCodiView] = useState('calendar'); // 초기 상태 : 달력

    // Zustand 스토어에서 feltOptions 가져오기
    const { feltOptions } = useFeltOptionsStore();

    // ** 선택한 codilog 체감날씨 filter
    const [feltWeather, setFeltWeather] = useState([]); // 선택한 옵션 배열 . 초기 상태 : 빈 배열

    const handleOptionClick = (Option) => {
        if (feltWeather.includes(Option)) {
            const updateFeltWeather = feltWeather.filter(item => item !== Option)
            setFeltWeather(updateFeltWeather);
        } else {
            setFeltWeather([...feltWeather, Option]);
        }
    }

    // ** codi Modal */
    const [modalActive, setModalActive] = useState(null); //codiDate OR null
    // console.log('modalActive??', modalActive);

    // *** codiLog list 받아오기 **********
    const [codiLogList, setCodiLogList] = useState([]);

    useEffect(() => {
        fetch('https://localhost:8080/codiLogList')//get요청 보냄
            .then((res) => res.json())//
            .then((data) => {
                setCodiLogList(data);
                // console.log(data); // 받아온 데이터를 출력-> 확인
            });
        console.log(codiLogList, '<<<codiLogList'); // 받아온 데이터를 출력-> 확인

    }, []);

    return (
        <main className={`mw ${style.codiLog}`}>
            <H2CodiLog codiView={codiView} setCodiView={setCodiView} />

            <div className={style.topArea}>
                <h3 className='fontHead3'>체감날씨</h3>
                <div className={style.toggleContainer}>
                    <div className={style.toggleWrapper}>
                        {feltOptions.map((Option, index) => (
                            <button
                                key={'feltOptions' + index}
                                className={`${style.BtnToggle} fontBodyM ${feltWeather.includes(Option) ? style.active : ''}`}
                                onClick={() => handleOptionClick(Option)}>{Option
                                }</button>
                        ))}

                    </div>
                </div>
            </div>
            <section className={style.CodiViewFrame}>
                {codiView === 'gallery'
                    ? <CodiLogGallery feltWeather={feltWeather} setModalActive={setModalActive} codiLogList={codiLogList} />
                    : <CodiLogCalendar feltWeather={feltWeather} codiLogList={codiLogList} />}
            </section>
            {
                modalActive ? (
                    <section className={style.CodiLogModal} >
                        <CodiLogBox setModalActive={setModalActive} modalActive={modalActive} />
                    </section>
                ) : ''

            }

        </main >

    )
}

export default CodiLog