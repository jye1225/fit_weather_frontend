import React from "react";

const KAKAO_AUTH_URL = "https://kauth.kakao.com/oauth/authorize";
const REST_API_KEY = process.env.REACT_APP_KAKAO_REST_API_KEY;
const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URI;

export default function KakaoLogin() {
  const handleKakaoLogin = () => {
    window.location.href = `${KAKAO_AUTH_URL}?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
  };

  return (
    <button onClick={handleKakaoLogin} className="socialButton">
      카카오 로그인
    </button>
  );
}
