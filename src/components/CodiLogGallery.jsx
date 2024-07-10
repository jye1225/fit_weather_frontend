import { useEffect, useState } from 'react';
import style from '../css/Codi.module.css'
import { url } from '../store/ref';

const CodiLogGallery = ({ feltWeather, setModalActive, codiLogList, lastElementRef }) => {
    console.log('필터 종류, 리스트 - 갤러리', feltWeather, codiLogList);

    const [galleryBoxs, setGalleryBoxs] = useState([]); //화면에 출력할 li들

    useEffect(() => {
        addBoxs(codiLogList);
    }, [codiLogList]);

    function addBoxs(codiLogList) {

        codiLogList.map((codiLog, index) => {

            const newBox = renderLiBox(codiLog, index);

            setGalleryBoxs(prevBoxes => prevBoxes.filter(box => box.key !== newBox.key)); //같은 key 박스 중복 생성 안 되도록
            setGalleryBoxs(prevBoxes => [...prevBoxes, newBox,]); // 새로운 박스를 뒤에 추가



        })
    };

    function renderLiBox(codiLog, index) {
        if (codiLogList.length === index + 1) {
            return (
                <li ref={lastElementRef} key={codiLog._id} className={style.galleryItem} onClick={() => setModalActive(codiLog._id)}>
                    <div className={style.dateBox}>
                        <span className={`fontTitleM ${style.day}`}>
                            {codiLog.codiDate.slice(8, 9) === '0' ? codiLog.codiDate.slice(9, 10) : codiLog.codiDate.slice(8, 10)}
                        </span>
                        <span className={`fontBodyS ${style.month}`}>
                            {codiLog.codiDate.slice(5, 6) === '0' ? codiLog.codiDate.slice(6, 7) : codiLog.codiDate.slice(5, 7)}월
                        </span>
                    </div>
                    <img src={`${url}/${codiLog.image}`} alt="" />
                </li>
            );
        } else {
            return (
                <li key={codiLog._id} className={style.galleryItem} onClick={() => setModalActive(codiLog._id)}>
                    <div className={style.dateBox}>
                        <span className={`fontTitleM ${style.day}`}>
                            {codiLog.codiDate.slice(8, 9) === '0' ? codiLog.codiDate.slice(9, 10) : codiLog.codiDate.slice(8, 10)}
                        </span>
                        <span className={`fontBodyS ${style.month}`}>
                            {codiLog.codiDate.slice(5, 6) === '0' ? codiLog.codiDate.slice(6, 7) : codiLog.codiDate.slice(5, 7)}월
                        </span>
                    </div>
                    <img src={`${url}/${codiLog.image}`} alt="" />
                </li>
            );
        }
    }

    return (
        <ul className={style.galleryWrap}>
            {galleryBoxs}
        </ul>

    )
}

export default CodiLogGallery
