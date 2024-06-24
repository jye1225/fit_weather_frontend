import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import KakaoLogin from "./KakaoLogin"; // 카카오 로그인 컴포넌트 import
import NaverLogin from "./NaverLogin"; // 네이버 로그인 컴포넌트 import
import axios from "axios";

export default function Login() {
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [autoLogin, setAutoLogin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const savedId = localStorage.getItem("savedId");
    if (savedId) {
      setId(savedId);
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/signin", { id, password: pw });
      if (autoLogin) {
        localStorage.setItem("savedId", id);
      } else {
        localStorage.removeItem("savedId");
      }
      console.log(response.data);
      navigate("/"); // 로그인 성공 후 페이지 이동
    } catch (err) {
      console.error(err);
      alert("로그인에 실패했습니다. 다시 시도해주세요.");
    }
  };

  const handleSignupRedirect = () => {
    navigate("/signup");
  };

  return (
    <div className="page">
      <div className="titleWrap fontHead2">로그인</div>

      <div className="contentWrap">
        <div className="inputTitle">아이디</div>
        <div className="inputWrap">
          <input
            className="input"
            placeholder="사용할 아이디를 입력하세요."
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
        </div>
        <div className="errorMessageWrap">올바른 아이디를 입력해주세요.</div>

        <div style={{ marginTop: "26px" }} className="inputTitle">
          비밀번호
        </div>
        <div className="inputWrap">
          <input
            type="password"
            className="input"
            placeholder="영문, 숫자, 특수문자 포함 8자 이상"
            value={pw}
            onChange={(e) => setPw(e.target.value)}
          />
        </div>
        <div className="errorMessageWrap">
          영문, 숫자, 특수문자 포함 8자 이상 입력해주세요.
        </div>
      </div>

      <div>
        <input
          type="checkbox"
          checked={autoLogin}
          onChange={(e) => setAutoLogin(e.target.checked)}
        />
        자동 로그인
      </div>

      <div>
        <button onClick={handleLogin} className="bottomButton">
          확인
        </button>
      </div>
      <div>
        <KakaoLogin />
        <NaverLogin />
      </div>

      <div>
        아직 회원이 아니신가요?{" "}
        <button onClick={handleSignupRedirect} className="signupButton">
          회원가입
        </button>
      </div>
    </div>
  );
}
