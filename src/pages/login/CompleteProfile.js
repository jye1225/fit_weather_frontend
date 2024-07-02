// CompleteProfile.js
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useLoginInfoStore } from "../../store/loginInfoStore";

const CompleteProfile = () => {
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const setUserInfo = useLoginInfoStore((state) => state.setUserInfo);

  const { kakaoData } = location.state;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/complete-profile`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: kakaoData.email,
            nickname,
            password,
          }),
        }
      );
      const data = await response.json();
      setUserInfo(data.user);
      localStorage.setItem("token", data.token);
      navigate("/");
    } catch (error) {
      console.error("프로필 완성 실패:", error);
      alert("프로필 완성에 실패했습니다.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
        placeholder="닉네임"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="비밀번호"
        required
      />
      <button type="submit">프로필 완성</button>
    </form>
  );
};

export default CompleteProfile;
