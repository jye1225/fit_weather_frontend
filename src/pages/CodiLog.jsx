import React, { useState } from 'react'
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
    const [modalActive, setModalActive] = useState(false);
    console.log('+++++', modalActive);

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
                    ? <CodiLogGallery feltWeather={feltWeather} setModalActive={setModalActive} />
                    : <CodiLogCalendar feltWeather={feltWeather} />}
            </section>
            {
                modalActive === true
                    ? (
                        <section className={style.CodiLogModal} >
                            <CodiLogBox setModalActive={setModalActive} />
                        </section>
                    ) : ''

            }

        </main >

    )
}

export default CodiLog