import React, { useState } from "react";
import "../css/TermsModal.css";

const TermsModal = ({ onClose }) => {
  const [allChecked, setAllChecked] = useState(false);
  const [checks, setChecks] = useState({
    location: false,
    service: false,
    privacy: false,
  });

  const handleAllChecked = () => {
    const newChecked = !allChecked;
    setAllChecked(newChecked);
    setChecks({
      location: newChecked,
      service: newChecked,
      privacy: newChecked,
    });
  };

  const handleCheck = (key) => {
    setChecks({
      ...checks,
      [key]: !checks[key],
    });
  };

  const isFormValid = () => {
    return checks.location && checks.service && checks.privacy;
  };

  return (
    <div className="mw modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>서비스 이용약관</h2>
          <button className="close-button" onClick={onClose}>
            X
          </button>
        </div>
        <div className="modal-body">
          <label className="modal-checkbox">
            <input
              type="checkbox"
              checked={allChecked}
              onChange={handleAllChecked}
            />
            약관 모두 동의
          </label>
          <label className="modal-checkbox">
            <input
              type="checkbox"
              checked={checks.location}
              onChange={() => handleCheck("location")}
            />
            위치정보 서비스 이용약관 (필수)
          </label>
          <label className="modal-checkbox">
            <input
              type="checkbox"
              checked={checks.service}
              onChange={() => handleCheck("service")}
            />
            서비스 이용약관에 동의 (필수)
          </label>
          <label className="modal-checkbox">
            <input
              type="checkbox"
              checked={checks.privacy}
              onChange={() => handleCheck("privacy")}
            />
            개인정보 수집 및 이용약관에 동의 (필수)
          </label>
        </div>
        <div className="modal-footer">
          <button
            className="submit-button fontBodyM"
            onClick={onClose}
            disabled={!isFormValid()}
          >
            가입 완료
          </button>
        </div>
      </div>
    </div>
  );
};

export default TermsModal;
