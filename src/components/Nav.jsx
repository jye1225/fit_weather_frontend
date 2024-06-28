import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import style from "../css/Nav.module.css";

const Nav = ({ navOpen, setNavOpen }) => {

    function preventScroll(event) {    // 스크롤 막기 함수
        event.preventDefault();
        event.stopPropagation();
    }

    useEffect(() => {
        console.log('>>>>>>', navOpen);

        if (navOpen == true) {        // 스크롤 막기 
            window.addEventListener('scroll', preventScroll, { passive: false });
            window.addEventListener('wheel', preventScroll, { passive: false });
            window.addEventListener('touchmove', preventScroll, { passive: false });
        }

        return () => {  // clean-up 함수: 컴포넌트가 unmoun될 때 이벤트 리스너 제거   
            window.removeEventListener('scroll', preventScroll, { passive: false });
            window.removeEventListener('wheel', preventScroll, { passive: false });
            window.removeEventListener('touchmove', preventScroll, { passive: false });
        }
    }, [navOpen, setNavOpen])

    // const [userLogin, setUserLogin] = useState(null);   //로그인 정보 없음 테스트
    const [userLogin, setUserLogin] = useState(true);   //로그인 정보 있음 테스트

    return (
        <section className={`${style.Nav} ${navOpen ? '' : style.hidden}`}>
            <div className={style.navBg} onClick={() => setNavOpen(false)}></div>
            <div className={`${style.sideCon} ${navOpen ? '' : style.hidden}`}>
                <img className={style.logo} src="img/logo/LogoR90.svg" alt="logo" />
                {userLogin ? (
                    <Link to={'#'} className={`${style.btnUser} ${style.btnNav}`}>
                        <div className={style.profileImg}>
                            <img src="img/icons/common/noProfile.svg" alt="icon" />
                        </div>
                        <span className='fontTitleS'>유저네임</span>
                    </Link>

                ) : (
                    <div className={style.accountBtns}>
                        <Link to={'/login'} className={style.btnNav}>
                            <img src="img/icons/common/login.svg" alt="icon" />
                            <span className='fontTitleS'>로그인</span>
                        </Link>
                        <Link to={'/signup'} className={style.btnNav}>
                            <img src="img/icons/common/join.svg" alt="icon" />
                            <span className='fontTitleS'>회원가입</span>
                        </Link>
                    </div>
                )}

                <div className={style.cateBtns}>
                    <Link to={'/'} className={style.btnNav}>
                        <img src="img/icons/common/home.svg" alt="icon" />
                        <span className='fontTitleS'>홈</span>
                    </Link>

                    {userLogin ? (<>
                        <Link to={'/codiMain'} className={style.btnNav}>
                            <img src="img/icons/common/codi02.svg" alt="icon" />
                            <span className='fontTitleS'>코디</span>
                        </Link>
                        <Link to={'/community'} className={style.btnNav}>
                            <img src="img/icons/common/community.svg" alt="icon" />
                            <span className='fontTitleS'>커뮤니티</span>
                        </Link>
                    </>) : (<>
                        <Link to={'/login'} className={`${style.btnNav} ${style.disable}`}>
                            <img src="img/icons/common/codi02.svg" alt="icon" />
                            <span className='fontTitleS'>코디</span>
                        </Link>
                        <Link to={'/login'} className={`${style.btnNav} ${style.disable}`}>
                            <img src="img/icons/common/community.svg" alt="icon" />
                            <span className='fontTitleS'>커뮤니티</span>
                        </Link>
                    </>)}
                </div>

                {userLogin ? (
                    <div className={`fontHead3 ${style.Logout}`}>
                        <Link to={'#'} className={style.btnLogout}>로그아웃</Link>
                    </div>
                ) : ''}
            </div>
        </section >
    )
}

export default Nav;
