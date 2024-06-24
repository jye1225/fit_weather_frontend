import style from '../css/Codi.module.css'


const CodiLogGallery = ({ feltWeather, setModalActive }) => {
    console.log('필터 종류 전달됨 - 갤러리', feltWeather);
    return (

        <ul className={style.galleryWrap}>
            <li className={style.galleryItem} onClick={() => setModalActive(true)}>
                <div className={style.dateBox}>
                    <span className={`fontTitleM ${style.day}`}>2</span>
                    <span className={`fontBodyS ${style.month}`}>6월</span>
                </div>
                <img src="https://image.msscdn.net/thumbnails/display/images/usersnap/2024/01/08/37db6b31fb5d4e06bac3e18f6a0f6168.jpg?w=780" alt="" />
            </li>
            <li className={style.galleryItem} onClick={() => setModalActive(true)}>
                <div className={style.dateBox}>
                    <span className={`fontTitleM ${style.day}`}>2</span>
                    <span className={`fontBodyS ${style.month}`}>6월</span>
                </div>
                <img src="https://image.msscdn.net/thumbnails/display/images/usersnap/2024/01/08/37db6b31fb5d4e06bac3e18f6a0f6168.jpg?w=780" alt="" />
            </li>              <li className={style.galleryItem} onClick={() => setModalActive(true)}>
                <div className={style.dateBox}>
                    <span className={`fontTitleM ${style.day}`}>2</span>
                    <span className={`fontBodyS ${style.month}`}>6월</span>
                </div>
                <img src="https://image.msscdn.net/thumbnails/display/images/usersnap/2024/01/08/37db6b31fb5d4e06bac3e18f6a0f6168.jpg?w=780" alt="" />
            </li>              <li className={style.galleryItem} onClick={() => setModalActive(true)}>
                <div className={style.dateBox}>
                    <span className={`fontTitleM ${style.day}`}>2</span>
                    <span className={`fontBodyS ${style.month}`}>6월</span>
                </div>
                <img src="https://image.msscdn.net/thumbnails/display/images/usersnap/2024/01/08/37db6b31fb5d4e06bac3e18f6a0f6168.jpg?w=780" alt="" />
            </li>              <li className={style.galleryItem} onClick={() => setModalActive(true)}>
                <div className={style.dateBox}>
                    <span className={`fontTitleM ${style.day}`}>2</span>
                    <span className={`fontBodyS ${style.month}`}>6월</span>
                </div>
                <img src="https://image.msscdn.net/thumbnails/display/images/usersnap/2024/01/08/37db6b31fb5d4e06bac3e18f6a0f6168.jpg?w=780" alt="" />
            </li>              <li className={style.galleryItem} onClick={() => setModalActive(true)}>
                <div className={style.dateBox}>
                    <span className={`fontTitleM ${style.day}`}>2</span>
                    <span className={`fontBodyS ${style.month}`}>6월</span>
                </div>
                <img src="https://image.msscdn.net/thumbnails/display/images/usersnap/2024/01/08/37db6b31fb5d4e06bac3e18f6a0f6168.jpg?w=780" alt="" />
            </li>              <li className={style.galleryItem} onClick={() => setModalActive(true)}>
                <div className={style.dateBox}>
                    <span className={`fontTitleM ${style.day}`}>2</span>
                    <span className={`fontBodyS ${style.month}`}>6월</span>
                </div>
                <img src="https://image.msscdn.net/thumbnails/display/images/usersnap/2024/01/08/37db6b31fb5d4e06bac3e18f6a0f6168.jpg?w=780" alt="" />
            </li>
        </ul>


    )
}

export default CodiLogGallery