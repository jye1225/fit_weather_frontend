import React from "react";
import "../css/signupcomplete.css";

const SignupComplete = () => {
  return (
    <div className="mw signup-complete-container">
      <div className="signup-complete-status">
        <img src="img/icons/common/checkCircle.svg" alt="checkCircle" />
        <span className="text">회원가입이 완료되었습니다</span>
      </div>

      <div className="signup-complete-footer">
        <button className="login-button fontTitleM">로그인하기</button>
      </div>
    </div>
  );
};

export default SignupComplete;
