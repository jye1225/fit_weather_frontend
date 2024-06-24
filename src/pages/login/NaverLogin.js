import React from "react";

const NAVER_AUTH_URL = "https://nid.naver.com/oauth2.0/authorize";
const CLIENT_ID = process.env.REACT_APP_NAVER_CLIENT_ID;
const REDIRECT_URI = process.env.REACT_APP_NAVER_REDIRECT_URI;
const STATE = process.env.REACT_APP_NAVER_STATE;

export default function NaverLogin() {
  const handleNaverLogin = () => {
    window.location.href = `${NAVER_AUTH_URL}?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&state=${STATE}`;
  };

  return (
    <button onClick={handleNaverLogin} className="socialButton">
      네이버 로그인
    </button>
  );
}
