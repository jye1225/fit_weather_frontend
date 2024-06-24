import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function KakaoCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get("code");
    if (code) {
      axios
        .post(`https://kauth.kakao.com/oauth/token`, null, {
          params: {
            grant_type: "authorization_code",
            client_id: process.env.REACT_APP_KAKAO_REST_API_KEY,
            redirect_uri: "http://localhost:3000/oauth",
            code,
          },
        })
        .then((response) => {
          const { access_token } = response.data;
          localStorage.setItem("access_token", access_token);
          navigate("/");
        })
        .catch((error) => {
          console.error("Kakao login failed", error);
          alert("로그인에 실패했습니다. 다시 시도해주세요.");
        });
    }
  }, [navigate]);

  return <div>로그인 중...</div>;
}
