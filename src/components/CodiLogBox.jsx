import { useState } from 'react'
import style from '../css/Codi.module.css'

import ActionSheet from '../components/ActionSheet'


const CodiLogBox = ({ setModalActive }) => {

    // ** ActionSheet
    const [actionSheetActive, setActionSheetActive] = useState(false)

    return (
        <div className={style.CodiLogBox}>
            <div className={style.top}>
                <img src="img/icons/common/x.svg" className={style.XIcon} onClick={() => setModalActive(false)} alt="x" />
                <h3 className='fontHead3'>내 코디 기록</h3>
                <img src="img/icons/common/dot.svg" className={style.DotIcon} onClick={() => setActionSheetActive(true)} alt="dot" />
            </div>
            <div className={style.postInfo}>
                <span className={`fontTitleS ${style.date}`}>2023년 06월 08일</span>
                <img src="img/icons/common/12devider.svg" alt="12devider" />

                <span className={`fontTitleS ${style.weather}`}>17°/28° 비</span>
            </div>
            <div className={style.imgBox}>
                <img src="https://image.msscdn.net/thumbnails/display/images/usersnap/2021/11/25/24340afcde7143f084faa7022dcc6515.jpg?w=780" alt="" />
                {/* <img src="https://mblogthumb-phinf.pstatic.net/MjAxODAyMDhfMjI2/MDAxNTE4MDY0MDQxNjc1.X6VjMGWoiuwH1RUmsLAjGALRp_5A2d7Q4ilojFzPl04g.EXzmjqkpOqO8qYC5eglDnTKgRFBbx5gewBe5lYFlhJYg.PNG.steal10/1.png?type=w800" alt="" /> */}
            </div>
            <div className={style.tags}>
                <span className={`fontTitleXS ${style.miniTag}`}>쌀쌀해</span>
                <span className={`fontTitleXS ${style.miniTag}`}>눅눅해</span>
            </div>
            <p className={`fontDecorate ${style.codiMemo}`}>
                오늘은 흐리고 비가 내리면서 쌀쌀한 날씨였다.
                우산을 챙겨 나갔지만, 옷이 젖어서 불편했다. 기온이 내려가서 따뜻한 옷을 입어야 할 것 같다. 날씨가 좋지 않아 기분도 가라앉았다일이삼사오육.
            </p>

            <ActionSheet setActionSheetActive={setActionSheetActive} actionSheetActive={actionSheetActive} />

        </div>
    )
}

export default CodiLogBox