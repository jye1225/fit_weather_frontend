import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import KakaoLogin from "./KakaoLogin"; // 카카오 로그인 컴포넌트 import
import axios from "axios";
import "../../css/login.css";

export default function Login() {
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [autoLogin, setAutoLogin] = useState(false);
  const [idError, setIdError] = useState("");
  const [pwError, setPwError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const savedId = localStorage.getItem("savedId");
    if (savedId) {
      setId(savedId);
    }
  }, []);

  const validateId = (value) => {
    const idPattern = /^[a-zA-Z0-9]+$/; // 영문과 숫자만 허용
    if (!idPattern.test(value)) {
      setIdError("올바른 아이디를 입력해주세요.");
    } else {
      setIdError("");
    }
  };

  const validatePw = (value) => {
    const pwPattern =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    if (!pwPattern.test(value)) {
      setPwError("영문, 숫자, 특수문자 포함 8자 이상 입력해주세요.");
    } else {
      setPwError("");
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    validateId(id);
    validatePw(pw);
    if (idError || pwError) {
      return;
    }
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
        <div className="inputTitle fontTitleXL">아이디</div>
        <div className="inputWrap">
          <input
            className="input"
            placeholder="아이디를 입력하세요."
            value={id}
            onChange={(e) => {
              setId(e.target.value);
              validateId(e.target.value);
            }}
          />
        </div>
        {idError && <div className="errorMessageWrap">{idError}</div>}

        <div style={{ marginTop: "26px" }} className="inputTitle fontTitleXL">
          비밀번호
        </div>
        <div className="inputWrap">
          <input
            type="password"
            className="input"
            placeholder="비밀번호를 입력하세요."
            value={pw}
            onChange={(e) => {
              setPw(e.target.value);
              validatePw(e.target.value);
            }}
          />
        </div>
        {pwError && <div className="errorMessageWrap">{pwError}</div>}
      </div>

      <div className="autologin fontBodyM">
        <input
          type="checkbox"
          checked={autoLogin}
          onChange={(e) => setAutoLogin(e.target.checked)}
        />
        자동 로그인
      </div>

      <div>
        <button onClick={handleLogin} className="bottomButton fontBodyM">
          로그인
        </button>
      </div>
      <div>
        <KakaoLogin />
      </div>

      <div className="signup fontBodyM">
        아직 웨더핏 회원이 아니시라면{" "}
        <button
          onClick={handleSignupRedirect}
          className="signupButton fontBodyM"
        >
          회원가입
        </button>
      </div>
    </div>
  );
}
