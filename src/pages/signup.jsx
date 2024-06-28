import React, { useState } from "react";
import style from "../css/signup.module.css";
import { url } from "../store/ref";

//건들면 안됨
import TermsModal from "../components/TermsModal";
import HeaderSignup from "../components/HeaderSignup";
//-----------

const Signup = () => {
  const [userid, setUserid] = useState(""); //아이디
  const [username, setUsername] = useState(""); //닉네임
  const [password, setPassword] = useState(""); //비밀번호
  const [pdcon, setPdcon] = useState(""); //비밀번호 확인
  const [gender, setGender] = useState(""); //성별
  const [message1, setMessage1] = useState("");
  const [message2, setMessage2] = useState("");
  const [message3, setMessage3] = useState("");
  const [message4, setMessage4] = useState("");

  // 회원가입 기능 함수
  const register = async (e) => {
    e.preventDefault();
    console.log(username, password);

    if (!/^[a-zA-Z][a-zA-Z0-9]{3,}$/.test(username)) {
      setMessage1("아이디는 4자 이상이어야 하며 영어로 시작해야 합니다.");
      return;
    } else {
      setMessage1("");
    }
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

    //백엔드로 POST 요청 및 응답
    const response = await fetch(`${url}/register`, {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
    });
    if (response.status === 200) {
      window.location.href = "/login";
    } else {
      alert("존재하는 아이디 입니다.");
    }
  };

  // const Signup = () => {
  //   const [formData, setFormData] = useState({
  //     id: "",
  //     name: "",
  //     password: "",
  //     confirmPassword: "",
  //     gender: "",
  //   });

  //   const [message, setMessage] = useState("");
  //   const [idCheckMessage, setIdCheckMessage] = useState("");
  //   const [nameCheckMessage, setNameCheckMessage] = useState("");
  //   const [isIdChecked, setIsIdChecked] = useState(false);
  //   const [isNameChecked, setIsNameChecked] = useState(false);
  //   const [showModal, setShowModal] = useState(false); // 모달 표시 상태 추가

  //   const handleChange = (e) => {
  //     const { name, value } = e.target;
  //     setFormData({
  //       ...formData,
  //       [name]: value,
  //     });

  //     if (name === "id") {
  //       setIsIdChecked(false);
  //       setIdCheckMessage("");
  //     }

  //     if (name === "name") {
  //       setIsNameChecked(false);
  //       setNameCheckMessage("");
  //     }
  //   };

  //   const handleGenderSelect = (gender) => {
  //     setFormData({
  //       ...formData,
  //       gender,
  //     });
  //   };

  //   const handleIdCheck = async () => {
  //     try {
  //       const response = await axios.post(`${url}/api/auth/check-id`, {
  //         id: formData.id,
  //       });
  //       setIdCheckMessage(response.data.message);
  //       setIsIdChecked(true);
  //     } catch (error) {
  //       setIdCheckMessage(
  //         error.response?.data?.message || "중복확인에 실패했습니다."
  //       );
  //     }
  //   };

  //   const handleNameCheck = async () => {
  //     try {
  //       const response = await axios.post("/api/auth/check-name", {
  //         name: formData.name,
  //       });
  //       setNameCheckMessage(response.data.message);
  //       setIsNameChecked(true);
  //     } catch (error) {
  //       setNameCheckMessage(
  //         error.response?.data?.message || "중복확인에 실패했습니다."
  //       );
  //     }
  //   };

  //   const handleSubmit = async (e) => {
  //     e.preventDefault();

  //     // 필수 입력 필드 유효성 검사
  //     if (
  //       !formData.id ||
  //       !formData.name ||
  //       !formData.password ||
  //       !formData.confirmPassword ||
  //       !formData.gender
  //     ) {
  //       setMessage("모든 필드를 입력해주세요.");
  //       return;
  //     }

  //     // 중복확인 검사
  //     if (!isIdChecked || !isNameChecked) {
  //       setMessage("아이디와 닉네임 중복확인을 해주세요.");
  //       return;
  //     }

  //     // 비밀번호 일치 확인
  //     if (formData.password !== formData.confirmPassword) {
  //       setMessage("비밀번호가 일치하지 않습니다.");
  //       return;
  //     }

  //     setShowModal(true); // 모달 표시
  //   };

  //   const handleCloseModal = () => {
  //     setShowModal(false);
  //   };

  return (
    <>
      {" "}
      <HeaderSignup />
      <div className={`mw ${style.page_s}`}>
        <div className={`fontHead2 ${style.titleWrap_s}`}></div>
        <form onSubmit={register}>
          <div className={`fontTitleXL ${style.inputTitle}`}>아이디</div>
          <div className={style.inputGroup}>
            <div className={style.inputWrap}>
              <input
                className={style.input}
                type="text"
                placeholder="사용할 아이디를 입력하세요."
                value={userid}
                onChange={(e) => {
                  setUserid(e.target.value);
                }}
              />
            </div>
            <span>{message1}</span> {/*아이디 문구*/}
            {/* <button
              type="button"
              className={style.checkButton}
              onClick={handleIdCheck}
            >
              중복확인
            </button> */}
          </div>
          <div className={`fontTitleXL ${style.inputTitle}`}>닉네임</div>
          <div className={style.inputGroup}>
            <div className={style.inputWrap}>
              <input
                className={style.input}
                type="text"
                placeholder="사용할 닉네임을 입력하세요."
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
              />
            </div>
            {/* <button
              type="button"
              className={style.checkButton}
              onClick={handleNameCheck}
            >
              중복확인
            </button> */}
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
              className={`${gender === "male" ? style.selected : ""}`}
              onClick={() => setGender("male")}
            >
              {" "}
              남성{" "}
            </button>
            <button
              type="button"
              className={`${gender === "female" ? style.selected : ""}`}
              onClick={() => setGender("female")}
            >
              {" "}
              여성{" "}
            </button>
          </div>
          <button type="submit" className={`fontBodyM ${style.bottomButton}`}>
            다음으로
          </button>
        </form>
      </div>{" "}
    </>
  );
};

export default Signup;
