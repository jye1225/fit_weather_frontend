import style from "../css/H2.module.css";
import { useNavigate } from 'react-router-dom';

const H2CodiWrite = () => {

    // ** btnGoBack
    const navigate = useNavigate();
    const goBack = () => {
        navigate(-1); // 이전 페이지로 이동
    }
    return (
        <section className={style.header2}>
            <img src="img/icons/common/goBack.svg" onClick={goBack} className={style.btnGoBack} alt="goBack" />
            <h2 className='fontHead2'>코디 기록하기</h2>
            <span className={`fontTitleXS ${style.miniTag}`}>
                강남구
            </span>
        </section>
    )
}

export default H2CodiWrite