// src/components/Header.jsx
import style from '../css/Header.module.css';
import { useEffect, useState } from 'react';
import useFetchStore from '../store/fetchStore';

const Header = () => {
  const {
    location,
    fetchLocation,
    regionFirstName,
    regionSecondName,
    setRegionFirstName,
    setRegionSecondName,
  } = useFetchStore();
  const [isSideOpen, setIsSideOpen] = useState(false);
  const [regionthirdName, setRegionthirdName] = useState("");

  useEffect(() => {
    fetchLocation();
  }, [fetchLocation]);

  useEffect(() => {
    if (location.latitude && location.longitude) {
      const { kakao } = window;
      const geocoder = new kakao.maps.services.Geocoder();
      const coords = new kakao.maps.LatLng(
        location.latitude,
        location.longitude
      );

      geocoder.coord2RegionCode(
        coords.getLng(),
        coords.getLat(),
        (result, status) => {
          if (status === kakao.maps.services.Status.OK) {
            const region = result.find((item) => item.region_type === 'H');
            if (region) {
              setRegionFirstName(region.region_1depth_name);
              setRegionSecondName(region.region_2depth_name);
              setRegionthirdName(region.region_3depth_name);
            } else {
              setRegionFirstName(result[0].region_1depth_name);
              setRegionSecondName(result[0].region_2depth_name);
              setRegionthirdName(result[0].region_3depth_name);
            }
            // 로컬스토리지에 저장
            localStorage.setItem('regionSecondName', region.region_2depth_name);
            localStorage.setItem('regionthirdName', region.region_3depth_name);
          }
        }
      );
    }
  }, [location, setRegionFirstName, setRegionSecondName]);

  const handleHamClick = () => {
    setIsSideOpen(!isSideOpen);
  };

  return (
    <header className={`mw ${style.hd}`}>
      <div className={style.top}>
        <img
          className={style.ham}
          src="img/icons/common/ham.svg"
          alt="햄버거버튼"
          onClick={handleHamClick}
        />
        <h1 id="myAddr">
          {regionFirstName} {regionSecondName} {regionthirdName}
        </h1>
        <img
          className={style.refresh}
          src="img/icons/common/refresh.svg"
          alt="새로고침"
        />
      </div>
      <div
        className={`${isSideOpen ? `${style.sideBgOn}` : `${style.sideBgOff}`}`}
      >
        <div className={`${isSideOpen ? `${style.sideon}` : `${style.side}`}`}>
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
          <div className={style.nav}>
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
        </div>
      </div>
    </header>
  );
};

export default Header;
