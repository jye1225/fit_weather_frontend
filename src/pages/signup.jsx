import React, { useState } from "react";
import axios from "axios";
import style from "../css/signup.module.css";
import TermsModal from "../components/TermsModal";
import HeaderSignup from "../components/HeaderSignup";
import { url } from "../store/ref";

const Signup = () => {
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });

  const [message, setMessage] = useState("");
  const [idCheckMessage, setIdCheckMessage] = useState("");
  const [nameCheckMessage, setNameCheckMessage] = useState("");
  const [isIdChecked, setIsIdChecked] = useState(false);
  const [isNameChecked, setIsNameChecked] = useState(false);
  const [showModal, setShowModal] = useState(false); // 모달 표시 상태 추가

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (name === "id") {
      setIsIdChecked(false);
      setIdCheckMessage("");
    }

    if (name === "name") {
      setIsNameChecked(false);
      setNameCheckMessage("");
    }
  };

  const handleGenderSelect = (gender) => {
    setFormData({
      ...formData,
      gender,
    });
  };

  const handleIdCheck = async () => {
    try {
      const response = await axios.post(`${url}/api/auth/check-id`, {
        id: formData.id,
      });
      setIdCheckMessage(response.data.message);
      setIsIdChecked(true);
    } catch (error) {
      setIdCheckMessage(
        error.response?.data?.message || "중복확인에 실패했습니다."
      );
    }
  };

  const handleNameCheck = async () => {
    try {
      const response = await axios.post("/api/auth/check-name", {
        name: formData.name,
      });
      setNameCheckMessage(response.data.message);
      setIsNameChecked(true);
    } catch (error) {
      setNameCheckMessage(
        error.response?.data?.message || "중복확인에 실패했습니다."
      );
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 필수 입력 필드 유효성 검사
    if (
      !formData.id ||
      !formData.name ||
      !formData.password ||
      !formData.confirmPassword ||
      !formData.gender
    ) {
      setMessage("모든 필드를 입력해주세요.");
      return;
    }

    // 중복확인 검사
    if (!isIdChecked || !isNameChecked) {
      setMessage("아이디와 닉네임 중복확인을 해주세요.");
      return;
    }

    // 비밀번호 일치 확인
    if (formData.password !== formData.confirmPassword) {
      setMessage("비밀번호가 일치하지 않습니다.");
      return;
    }

    setShowModal(true); // 모달 표시
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      {" "}
      <HeaderSignup />
      <div className={`mw ${style.page_s}`}>
        <div className={`fontHead2 ${style.titleWrap_s}`}></div>
        <form onSubmit={handleSubmit}>
          <div className={`fontTitleXL ${style.inputTitle}`}>아이디</div>
          <div className={style.inputGroup}>
            <div className={style.inputWrap}>
              <input
                className={style.input}
                type="text"
                id="id"
                name="id"
                value={formData.id}
                onChange={handleChange}
              />
            </div>
            <button
              type="button"
              className={style.checkButton}
              onClick={handleIdCheck}
            >
              중복확인
            </button>
          </div>
          {idCheckMessage && (
            <div className={style.errorMessageWrap}>{idCheckMessage}</div>
          )}

          <div className={`fontTitleXL ${style.inputTitle}`}>닉네임</div>
          <div className={style.inputGroup}>
            <div className={style.inputWrap}>
              <input
                className={style.input}
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <button
              type="button"
              className={style.checkButton}
              onClick={handleNameCheck}
            >
              중복확인
            </button>
          </div>
          {nameCheckMessage && (
            <div className={style.errorMessageWrap}>{nameCheckMessage}</div>
          )}

          <div className={`fontTitleXL ${style.inputTitle}`}>비밀번호</div>
          <div className={style.inputWrap}>
            <input
              className={style.input}
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <div className={`fontTitleXL ${style.inputTitle}`}>비밀번호 확인</div>
          <div className={style.inputWrap}>
            <input
              className={style.input}
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </div>
          <div className={`fontTitleXL ${style.inputTitle}`}>성별</div>
          <div className={style.gender_select}>
            <div
              className={`${style.gender_button} ${
                formData.gender === "female" ? "selected" : ""
              }`}
              onClick={() => handleGenderSelect("female")}
            >
              여자
            </div>
            <div
              className={`${style.gender_button} ${
                formData.gender === "male" ? "selected" : ""
              }`}
              onClick={() => handleGenderSelect("male")}
            >
              남자
            </div>
          </div>
          <button type="submit" className={`fontBodyM ${style.bottomButton}`}>
            다음으로
          </button>
        </form>
        {message && <p>{message}</p>}
        {showModal && <TermsModal onClose={handleCloseModal} />}
      </div>{" "}
    </>
  );
};

export default Signup;
