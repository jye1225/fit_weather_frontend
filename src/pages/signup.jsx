import React, { useState } from "react";
import axios from "axios";
import "../css/signup.css";

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
      const response = await axios.post("/api/auth/check-id", {
        id: formData.id,
      });
      setIdCheckMessage(response.data.message);
      setIsIdChecked(true);
    } catch (error) {
      console.error("아이디 중복확인 오류:", error);
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
      console.error("닉네임 중복확인 오류:", error);
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

    try {
      const response = await axios.post("/api/auth/signup", formData);
      setMessage(response.data.message);
      // 폼 필드 리셋
      setFormData({
        id: "",
        name: "",
        password: "",
        confirmPassword: "",
        gender: "",
      });
    } catch (error) {
      console.error("회원가입 오류:", error);
      setMessage(error.response?.data?.message || "회원가입에 실패했습니다.");
    }
  };

  return (
    <div className="mw page_s">
      <div className="titleWrap_s fontHead2">회원가입</div>
      <form onSubmit={handleSubmit}>
        <div className="inputTitle fontTitleXL">아이디</div>
        <div className="inputGroup">
          <div className="inputWrap">
            <input
              className="input"
              type="text"
              id="id"
              name="id"
              value={formData.id}
              onChange={handleChange}
            />
          </div>
          <button type="button" className="checkButton" onClick={handleIdCheck}>
            중복확인
          </button>
        </div>
        {idCheckMessage && (
          <div className="errorMessageWrap">{idCheckMessage}</div>
        )}

        <div className="inputTitle fontTitleXL">닉네임</div>
        <div className="inputGroup">
          <div className="inputWrap">
            <input
              className="input"
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <button
            type="button"
            className="checkButton"
            onClick={handleNameCheck}
          >
            중복확인
          </button>
        </div>
        {nameCheckMessage && (
          <div className="errorMessageWrap">{nameCheckMessage}</div>
        )}

        <div className="inputTitle fontTitleXL">비밀번호</div>
        <div className="inputWrap">
          <input
            className="input"
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <div className="inputTitle fontTitleXL">비밀번호 확인</div>
        <div className="inputWrap">
          <input
            className="input"
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
        </div>
        <div className="inputTitle fontTitleXL">성별</div>
        <div className="gender-select">
          <div
            className={`gender-button ${
              formData.gender === "female" ? "selected" : ""
            }`}
            onClick={() => handleGenderSelect("female")}
          >
            여자
          </div>
          <div
            className={`gender-button ${
              formData.gender === "male" ? "selected" : ""
            }`}
            onClick={() => handleGenderSelect("male")}
          >
            남자
          </div>
        </div>
        <button type="submit" className="bottomButton fontBodyM">
          다음으로
        </button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Signup;
