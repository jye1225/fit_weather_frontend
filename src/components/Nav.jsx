import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import style from "../css/Nav.module.css";
import { url } from "../store/ref";
import { useLoginInfoStore } from "../store/loginInfoStore"; //유저정보 import

const Nav = ({ navOpen, setNavOpen }) => {
  const navigate = useNavigate();
  const { userInfo, setUserInfoAll } = useLoginInfoStore();

  const [token, setToken] = useState(localStorage.getItem("token"));//해석 안된 토큰
  const [loginRoute, setLoginRoute] = useState(''); //로그인방식 저장 <- 카카오:kakao /일반:ourweb /로그인 전: ''


  useEffect(() => {
    console.log('---Nav userInfo---', userInfo); // 확인용..
  }, [navOpen]);

  const checkLoginRoute = (token) => {
    if (token) {//로그인 상태가 맞고,
      if (token.includes(".")) {// 일반 로그인일때
        setLoginRoute('ourweb')
      } else {
        setLoginRoute('kakao') //카카오 로그인일때
      }
    }
    else { return; }
  }

  useEffect(() => {
    checkLoginRoute(token);
  }, [token])

  useEffect(() => {
    console.log('----loginRoute---', loginRoute);
  }, [loginRoute])

  // // 예은추가--------
  // const [token, setToken] = useState(localStorage.getItem("token")); // token 상태를 추가합니다.
  // const { nickname = "", profile_image = "" } = userInfo?.properties || {}; // 사용자 정보를 가져옵니다.
  // console.log(userInfo);

  // const getUserData = async (token) => {
  //   // 2. Token을 이용하여 카카오 서버에서 인증을 거쳐 사용자 정보를 가져옴
  //   const response = await fetch(`https://kapi.kakao.com/v2/user/me`, {
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //       "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
  //     },
  //   });
  //   const user = await response.json();
  //   // 3. 사용자 정보를 state에 저장
  //   setUserInfo(user);
  //   // console.log('카카오로그인 정보 확인 ', user);
  //   // navigate("/");//이거 없어야 페이지 이동된다...
  // };

  // useEffect(() => {
  //   const fetchData = async () => {//
  //     // 1_1.  localStorage에 저장된 token이 있다면 사용자 정보를 가져옴
  //     const token = localStorage.getItem("token");
  //     if (token) {
  //       console.log(token);
  //       try {
  //         await getUserData(token);
  //       } catch (err) {
  //         // 1_2.  localStorage에 저장된 token이 만료되었다면 token을 삭제하고 null로 업데이트
  //         console.log(err);
  //         localStorage.removeItem("token");
  //         setToken(null); // token 상태를 업데이트합니다.
  //       }
  //     }
  //   };
  //   fetchData();
  // }, [token]); // token이 변경될 때마다 실행


  // 로그아웃
  const logout = async () => {
    const response = await fetch(`${url}/logout`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    if (response.ok) {
      document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";//쿠키 만료 시점을 과거로 설정하여 덮어쓰는 방식으로 삭제
      localStorage.removeItem("token");
      setUserInfoAll(null, null, null); // 사용자 정보 초기화
      // navigate("/");
      window.location.href = "/";

    } else {
      console.error("Failed to logout");
    }
  };

  const kakaoLogOut = async () => {
    const response = await fetch(`https://kapi.kakao.com/v1/user/logout`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
      },
    });

    if (response.ok) {
      document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";//쿠키 만료 시점을 과거로 설정하여 덮어쓰는 방식으로 삭제
      localStorage.removeItem("token"); // token을 삭제합니다.
      setUserInfoAll(null, null, null); // 사용자 정보를 초기화합니다.
      setToken(null); // token 상태를 초기화합니다.
      // navigate("/"); // 메인 페이지로 이동합니다.
      window.location.href = "/";

    } else {
      console.error("Failed to logout from Kakao");
    }
  };

  // ----------------

  useEffect(() => {
    // console.log('Nav.jsx>>>>>>유저정보, 햄open여부', userInfo, navOpen);
    if (navOpen === true && window.innerWidth <= 907) {
      // 스크롤 막기
      window.addEventListener("scroll", preventScroll, { passive: false });
      window.addEventListener("wheel", preventScroll, { passive: false });
      window.addEventListener("touchmove", preventScroll, { passive: false });
    }

    return () => {
      // clean-up 함수: 컴포넌트가 unmoun될 때 이벤트 리스너 제거
      window.removeEventListener("scroll", preventScroll, { passive: false });
      window.removeEventListener("wheel", preventScroll, { passive: false });
      window.removeEventListener("touchmove", preventScroll, {
        passive: false,
      });
    };
  }, [navOpen]);

  const handleLogout = () => {
    if (loginRoute === 'kakao') {
      kakaoLogOut();
    } else {
      logout();
    }
  };

  function preventScroll(event) {  // 스크롤 막기 함수

    event.preventDefault();
    event.stopPropagation();
  }

  return (
    <section className={`${style.Nav} ${navOpen ? "" : style.hidden}`}>
      <div className={style.navBg} onClick={() => setNavOpen(false)}></div>
      <div className={`${style.sideCon} ${navOpen ? "" : style.hidden}`}>
        <img className={style.logo} src="img/logo/LogoR90.svg" alt="logo" />
        {loginRoute ? (
          <Link to={"#"} className={`${style.btnUser} ${style.btnNav}`}>
            <div className={style.profileImg}>
              {userInfo.userprofile ? (
                <img className={style.MyProfileImg} src={userInfo.userprofile} alt="userprofile" />
              ) : (
                <img src="img/icons/common/noProfile.svg" alt="icon" />)}
            </div>
            <span className="fontTitleS">
              {userInfo.username}
            </span>
          </Link>
        ) : (
          <div className={style.accountBtns}>
            <Link to={"/login"} className={style.btnNav}>
              <img src="img/icons/common/login.svg" alt="icon" />
              <span className="fontTitleS">로그인</span>
            </Link>
            <Link to={"/signup"} className={style.btnNav}>
              <img src="img/icons/common/join.svg" alt="icon" />
              <span className="fontTitleS">회원가입</span>
            </Link>
          </div>
        )}

        <div className={style.cateBtns}>
          <Link to={"/"} className={style.btnNav}>
            <img src="img/icons/common/home.svg" alt="icon" />
            <span className="fontTitleS">홈</span>
          </Link>

          {loginRoute ? (
            <>
              <Link to={"/codiMain"} className={style.btnNav}>
                <img src="img/icons/common/codi02.svg" alt="icon" />
                <span className="fontTitleS">코디</span>
              </Link>
              <Link to={"/community"} className={style.btnNav}>
                <img src="img/icons/common/community.svg" alt="icon" />
                <span className="fontTitleS">커뮤니티</span>
              </Link>
            </>
          ) : (
            <>
              <Link
                to={"/login"}
                className={`${style.btnNav} ${style.disable}`}
              >
                <img src="img/icons/common/codi02.svg" alt="icon" />
                <span className="fontTitleS">코디</span>
              </Link>
              <Link
                to={"/login"}
                className={`${style.btnNav} ${style.disable}`}
              >
                <img src="img/icons/common/community.svg" alt="icon" />
                <span className="fontTitleS">커뮤니티</span>
              </Link>
            </>
          )}
        </div>

        {loginRoute ? (
          <div className={`fontHead3 ${style.Logout}`}>
            <Link to={"#"} className={style.btnLogout} onClick={handleLogout}>
              로그아웃
            </Link>
          </div>
        ) : null}
      </div>
    </section>
  );
};

export default Nav;
