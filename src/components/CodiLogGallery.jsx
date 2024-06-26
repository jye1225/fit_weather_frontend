import style from '../css/Codi.module.css'


const CodiLogGallery = ({ feltWeather, setModalActive, codiLogList }) => {
    console.log('필터 종류, 리스트 - 갤러리', feltWeather, codiLogList);




    return (

        <ul className={style.galleryWrap}>
            {codiLogList.map((codiLog) => {
                return (<li className={style.galleryItem} onClick={() => setModalActive(codiLog.codiDate)}>
                    <div className={style.dateBox}>
                        <span className={`fontTitleM ${style.day}`}>
                            {codiLog.codiDate.slice(8, 9) === '0' ? codiLog.codiDate.slice(9, 10) : codiLog.codiDate.slice(8, 10)}
                        </span>
                        <span className={`fontBodyS ${style.month}`}>
                            {codiLog.codiDate.slice(5, 6) === '0' ? codiLog.codiDate.slice(6, 7) : codiLog.codiDate.slice(5, 7)}월
                        </span>
                    </div>
                    <img src={`https://localhost:8080/${codiLog.image}`} alt="" />
                </li>)
            })

            }


        </ul>


    )
}

export default CodiLogGallery