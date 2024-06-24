import style from "../css/Header.module.css";
import { useEffect, useState } from "react";

const Header = () => {
  const [location, setLocation] = useState({});
  const { kakao } = window;

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      });
    } else {
      console.log("현재 브라우저는 위치정보를 가져올 수 없습니다.");
    }
  }, []);

  useEffect(() => {
    if (location.latitude && location.longitude) {
      // 주소-좌표 변환 객체 생성하기
      const geocoder = new kakao.maps.services.Geocoder();
      const coords = new kakao.maps.LatLng(
        location.latitude,
        location.longitude
      );

      // 현재 좌표로 주소를 검색해서 header에 표시하기
      searchAddr(geocoder, coords, displayAddr);
    }
  }, [location]);

  // 좌표로 행정동 주소 정보를 요청하는 함수
  const searchAddr = (geocoder, coords, callback) => {
    geocoder.coord2RegionCode(coords.getLng(), coords.getLat(), callback);
  };

  // header에 주소 정보를 표시하는 함수
  const displayAddr = (result, status) => {
    if (status === kakao.maps.services.Status.OK) {
      let infoDiv = document.getElementById("myAddr");

      // console.log(result);
      // console.log(result.length);

      for (let i = 0; i < result.length; i++) {
        // 행정동의 region_type 값은 'H'
        // 법정동은 'B'
        if (result[i].region_type === "H") {
          infoDiv.innerHTML =
            result[i].region_1depth_name + " " + result[i].region_2depth_name;
          break;
        }
      }
    }
  };

  // 사이드 메뉴 기능
  const [sideOpen, setSideOpen] = useState(false);
  const hamClick = () => {
    setSideOpen(!sideOpen);
  };
  const bgClick = () => {
    setSideOpen(false);
  };

  return (
    <header className={`mw ${style.hd}`}>
      <div className={style.top}>
        <img
          className={style.ham}
          src="img/icons/common/ham.svg"
          alt="햄버거버튼"
          onClick={hamClick}
        />
        <h1 id="myAddr"></h1>
        <img
          className={style.refresh}
          src="img/icons/common/refresh.svg"
          alt="새로고침"
        />
      </div>
      {sideOpen && (
        <div
          className={`${style.sideBg} ${style.sideBgOn}`}
          onClick={bgClick}
        ></div>
      )}
      <nav className={`${style.side} ${sideOpen ? style.sideOn : ""}`}>
        <img src="" alt="로고" />
        <div className={style.login}>
          <div>
            <img src="img/icons/common/login.svg" alt="로그인" />
            <p className="fontTitleS">로그인</p>
          </div>
          <div>
            <img src="img/icons/common/join.svg" alt="회원가입" />
            <p className="fontTitleS">회원가입</p>
          </div>
        </div>
        <div className={style.profile}>
          <img src="" alt="프로필" />
          <p className="fontTitleS">아이디</p>
        </div>
        <div className={style.contents}>
          <div>
            <img src="img/icons/common/home.svg" alt="홈" />
            <p className="fontTitleS">홈</p>
          </div>
          <div>
            <img src="img/icons/common/codi02.svg" alt="코디" />
            <p className="fontTitleS">코디</p>
          </div>
          <div>
            <img src="img/icons/common/community.svg" alt="커뮤니티" />
            <p className="fontTitleS">커뮤니티</p>
          </div>
        </div>
        <p className={style.logout}>로그아웃</p>
      </nav>
    </header>
  );
};

export default Header;
