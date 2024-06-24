import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function NaverCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get("code");
    const state = new URL(window.location.href).searchParams.get("state");
    if (code && state) {
      axios
        .post(`https://nid.naver.com/oauth2.0/token`, null, {
          params: {
            grant_type: "authorization_code",
            client_id: process.env.REACT_APP_NAVER_CLIENT_ID,
            client_secret: process.env.REACT_APP_NAVER_CLIENT_SECRET,
            code,
            state,
          },
        })
        .then((response) => {
          const { access_token } = response.data;
          localStorage.setItem("access_token", access_token);
          navigate("/");
        })
        .catch((error) => {
          console.error("Naver login failed", error);
          alert("로그인에 실패했습니다. 다시 시도해주세요.");
        });
    }
  }, [navigate]);

  return <div>로그인 중...</div>;
}
