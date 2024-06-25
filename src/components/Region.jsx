import style from '../css/Region.module.css';
import { useState, useEffect, useRef } from 'react';

function Region({ color, border }) {
  const [location, setLocation] = useState({});
  const regionRef = useRef(null);
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
      console.log('현재 브라우저는 위치정보를 가져올 수 없습니다.');
    }
  }, []);

  useEffect(() => {
    if (location.latitude && location.longitude) {
      const geocoder = new kakao.maps.services.Geocoder();
      const coords = new kakao.maps.LatLng(
        location.latitude,
        location.longitude
      );
      searchAddr(geocoder, coords, displayAddr);
    }
  }, [location]);

  const searchAddr = (geocoder, coords, callback) => {
    geocoder.coord2RegionCode(coords.getLng(), coords.getLat(), callback);
  };

  const displayAddr = (result, status) => {
    if (status === kakao.maps.services.Status.OK) {
      const regionArea = regionRef.current;

      for (let i = 0; i < result.length; i++) {
        if (result[i].region_type === 'H') {
          regionArea.innerHTML =
            result[i].region_1depth_name + ' ' + result[i].region_2depth_name;
          break;
        }
      }
    }
  };

  const customStyle = {
    color: color,
    border: border,
  };

  return (
    <span className={style.region} ref={regionRef} style={customStyle}></span>
  );
}

export default Region;
