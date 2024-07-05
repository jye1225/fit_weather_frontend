//개인정보 수정 페이지
import React, { useState } from "react";
import style from "../css/MyInfoManage.module.css";
import { url } from "../store/ref";

import ManageModal from "../components/ManageModal.jsx"; //이용약관 모듈창
import HeaderAccountManage from "../components/HeaderAccountManage.jsx"; //헤더

const Modify = () => {
  const [password, setPassword] = useState(""); //비밀번호
  const [pdcon, setPdcon] = useState(""); //비밀번호 확인
  const [gender, setGender] = useState(""); //성별
  const [message2, setMessage2] = useState("");
  const [message3, setMessage3] = useState("");
  const [message4, setMessage4] = useState("");
  const [showTerms, setShowTerms] = useState(false); // 상태 추가

  // 회원가입 기능 함수
  const register = async (e) => {
    e.preventDefault();
    if (password.length < 4) {
      setMessage2("4자 이상이어야 합니다.");
      return;
    } else {
      setMessage2("");
    }
    if (password !== pdcon) {
      setMessage3("비밀번호가 같지 않습니다.");
      return;
    } else {
      setMessage3("");
    }
    if (!gender) {
      setMessage4("성별을 선택해주세요.");
      return;
    } else {
      setMessage4("");
    }

    // 백엔드로 POST 요청 및 응답
    const response = await fetch(`${url}/register`, {
      method: "POST",
      body: JSON.stringify({ password, gender }),
      headers: { "Content-Type": "application/json" },
    });
    if (response.status === 200) {
      setShowTerms(true); // 회원가입 성공 시 약관 모달을 호출
    } else {
      alert("존재하는 아이디 입니다.");
    }

    setShowTerms(true);
  };

  return (
    <>
      <HeaderAccountManage />
      <div className={`mw ${style.page_s}`}>
        <div className={`fontHead2 ${style.titleWrap_s}`}></div>
        <form onSubmit={register}>
          <div className={`fontTitleXL ${style.inputTitle}`}>아이디</div>
          <div className={style.inputGroup}>
            <div className={style.inputWrap}>아이디 불러와져잇어야함</div>
          </div>
          <div className={`fontTitleXL ${style.inputTitle}`}>비밀번호</div>
          <div className={style.inputWrap}>
            <input
              className={style.input}
              type="password"
              placeholder="사용할 비밀번호를 입력하세요."
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <span>{message2}</span> {/*비밀번호 문구*/}
          <div className={`fontTitleXL ${style.inputTitle}`}>비밀번호 확인</div>
          <div className={style.inputWrap}>
            <input
              className={style.input}
              type="password"
              placeholder="사용할 비밀번호를 입력하세요."
              value={pdcon}
              onChange={(e) => {
                setPdcon(e.target.value);
              }}
            />
          </div>
          <span>{message3}</span> {/*비밀번호 확인 문구 */}
          {/*성별*/}
          <div className={`fontTitleXL ${style.inputTitle}`}>성별</div>
          <div className={style.gender_select}>
            <button
              type="button"
              className={`fontBodyM ${style.gender_button} ${
                gender === "male" ? style.selected : ""
              }`}
              onClick={() => setGender("male")}
            >
              남성
            </button>
            <button
              type="button"
              className={`fontBodyM ${style.gender_button} ${
                gender === "female" ? style.selected : ""
              }`}
              onClick={() => setGender("female")}
            >
              여성
            </button>
          </div>
          <span>{message4}</span> {/*성별 체크 문구 */}
          <button type="submit" className={`fontBodyM ${style.bottomButton}`}>
            다음으로
          </button>
        </form>
        {showTerms && <ManageModal />}
      </div>
    </>
  );
};

export default Modify;
