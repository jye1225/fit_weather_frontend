import style from "../../css/login.module.css"; // 경로 확인
import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { url } from "../../store/ref";

// 카카오 로그인 컴포넌트 import, 얘는 삭제하면 안됨
import KakaoLogin from "./KakaoLogin";
// import { useNavigate } from "react-router-dom"; //내 코드라 지워둠

const LoginPage = () => {
  const [userid, setUserid] = useState("");
  const [password, setPassword] = useState("");
  const [message1, setMessage1] = useState("");
  const [message2, setMessage2] = useState("");
  const [redirect, setRedirect] = useState(false);
  // const [autoLogin, setAutoLogin] = useState(false); //자동로그인
  // const navigate = useNavigate(); //내 코드라 삭제함

  const login = async (e) => {
    e.preventDefault();
    // console.log(userid, password);

    //백엔드로 POST 요청 및 응답
    const response = await fetch(`${url}/login`, {
      method: "POST",
      body: JSON.stringify({ userid, password }),
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    const data = await response.json();
    console.log(data);

    if (data.id) {
      console.log("로그인성공");
      localStorage.setItem("token", data.token); // 토큰을 로컬 스토리지에 저장
      window.location.href = "/";
      setRedirect(true);
    }
    if (data.message === "nouser") {
      console.log("사용자가 없습니다.");
      setMessage1("회원이 아닙니다.");
    }
    if (data.message === "failed") {
      console.log("비밀번호가 맞지 않습니다.");
      setMessage2("비밀번호가 맞지 않습니다.");
    }
  };

  // if (redirect) {
  //   return <Navigate to="/" />;
  // }

  return (
    <div className={`mw ${style.page}`}>
      <div className={style.logo} style={{ cursor: "pointer" }}>
        <img src="/img/Fit Weather.png" alt="Fit Weather Logo" />
      </div>
      <div className={`fontHead2 ${style.titleWrap}`}>로그인</div>

      <form onSubmit={login}>
        <div className={style.contentWrap}>
          <div className={`fontTitleXL ${style.inputTitle}`}>아이디</div>
          <div className={style.inputWrap}>
            <input
              className={style.input}
              placeholder="아이디를 입력하세요."
              value={userid}
              onChange={(e) => {
                setUserid(e.target.value);
              }}
            />
          </div>
          <span>{message1}</span>
          <div
            style={{ marginTop: "26px" }}
            className={`fontTitleXL ${style.inputTitle}`}
          >
            비밀번호
          </div>
          <div className={style.inputWrap}>
            <input
              type="password"
              className={style.input}
              placeholder="비밀번호를 입력하세요."
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <span>{message2}</span>
        </div>
        {/* <div className={`fontBodyM ${style.autologin}`}>
          <input
            type="checkbox"
            checked={autoLogin}
            onChange={(e) => setAutoLogin(e.target.checked)}
          />
          자동 로그인
        </div> 자동로그인 일단 후순위로 미뤄둠*/}
        <div>
          <button type="submit" className={`fontBodyM ${style.bottomButton}`}>
            로그인
          </button>
        </div>
        <div>
          <KakaoLogin />
        </div>
      </form>

      <div className={`fontBodyM ${style.signup}`}>
        아직 웨더핏 회원이 아니시라면{" "}
        <p className={`fontBodyM ${style.signupButton}`}>
          <Link to="/Signup">회원가입</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
