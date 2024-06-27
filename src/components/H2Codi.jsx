import style from "../css/H2.module.css";
import { useNavigate } from 'react-router-dom';

const H2Codi = () => {



    return (
        <section className={style.header2Main}  >
            <div className={style.h2Con}>
                <h2 className='fontHead2'>코디</h2>
                <div className={style.btnCon}>
                    <button className={`fontBodyM ${style.btnDate} ${style.active}`}>오늘</button>
                    <button className={`fontBodyM ${style.btnDate}`}>6/25</button>
                    <button className={`fontBodyM ${style.btnDate}`}>6/26</button>
                    <button className={`fontBodyM ${style.btnDate}`}>6/27</button>
                </div>
            </div>

        </section >
    )
}

export default H2Codi