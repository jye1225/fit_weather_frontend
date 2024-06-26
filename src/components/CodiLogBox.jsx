import { useEffect, useState } from 'react'
import style from '../css/Codi.module.css'

import ActionSheet from '../components/ActionSheet'


const CodiLogBox = ({ setModalActive, modalActive }) => {
    console.log(modalActive);
    // ** ActionSheet
    const [actionSheetActive, setActionSheetActive] = useState(false)

    const [codiLog, setCodiLog] = useState([]);
    const [tags, setTags] = useState([]);
    const [date, setDate] = useState('');

    useEffect(() => {
        fetch(`https://localhost:8080/codiLogDetail/${modalActive}`)//get요청 보냄 
            .then((res) => res.json())//
            .then((data) => {
                setCodiLog(data);
                setTags(data.tag);
                setDate(data.codiDate);
                // console.log('디테일박스 데이터 전달 성공 >>', data); // 받아온 데이터를 출력-> 확인
            })//
    }, [])
    console.log('디테일박스 데이터 전달 성공 >>', codiLog);

    return (
        <div className={style.CodiLogBox}>
            <div className={style.top}>
                <img src="img/icons/common/x.svg" className={style.XIcon} onClick={() => setModalActive(false)} alt="x" />
                <h3 className='fontHead3'>내 코디 기록</h3>
                <img src="img/icons/common/dot.svg" className={style.DotIcon} onClick={() => setActionSheetActive(true)} alt="dot" />
            </div>
            <div className={style.postInfo}>
                <span className={`fontTitleS ${style.date}`}>
                    {/* {codiLog.codiDate} */}
                    {date.split('-')[0]}년  {date.split('-')[1]}월 {date.split('-')[2]}일
                </span>
                <img src="img/icons/common/12devider.svg" alt="12devider" />
                <span className={`fontTitleS ${style.weather}`}> {codiLog.maxTemp}°/ {codiLog.minTemp}°</span>
                {/* <img src="img/icons/common/12devider.svg" alt="12devider" /> */}
                <span className={`fontTitleS ${style.sky}`}>흐리고 비</span>
            </div>
            <div className={style.imgBox}>
                <img src={`https://localhost:8080/${codiLog.image}`} alt="" />
            </div>
            <div className={style.tags}>
                {
                    // <span className={`fontTitleXS ${style.miniTag}`}>ddd</span>

                    tags.map((feltTag) => {
                        return (
                            <span className={`fontTitleXS ${style.miniTag}`}>{feltTag}</span>
                        );
                    })
                }
            </div>
            <p className={`fontDecorate ${style.codiMemo}`}>
                {codiLog.memo}
            </p>

            <ActionSheet setActionSheetActive={setActionSheetActive} actionSheetActive={actionSheetActive} />

        </div>
    )
}

export default CodiLogBox