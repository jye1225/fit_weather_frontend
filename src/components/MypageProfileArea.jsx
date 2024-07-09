import React, { useState, useEffect } from "react";
import style from "../css/MypageProfileArea.module.css";
import { useNavigate } from "react-router-dom";
import { useLoginInfoStore } from "../store/loginInfoStore";
import { url } from "../store/ref";

function MypageProfileArea() {
  const { userInfo, setUserInfoAll } = useLoginInfoStore();
  const [onEditProfile, setOnEditProfile] = useState(false);
  const [username, setUsername] = useState(userInfo.username || "");
  const [shortBio, setShortBio] = useState(userInfo.shortBio || "");
  const [userprofile, setUserProfile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(`${url}/getUserInfo?token=${token}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (data) {
          setUsername(data.username || "");
          setShortBio(data.shortBio || "안녕하세요! 만나서 반갑습니다~");
          setUserProfile(data.userprofile || "/img/default/man_photo.svg");
          console.log("Fetched user info:", data);
        }
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };

    if (onEditProfile) {
      fetchUserInfo();
    }
  }, [onEditProfile]);

  const profileEdit = () => {
    setOnEditProfile(true);
  };

  const handleProfileImageChange = (e) => {
    setUserProfile(e.target.files[0]);
  };

  const profileEditCopl = async () => {
    setOnEditProfile(false);

    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("username", username);
      formData.append("shortBio", shortBio);
      if (userprofile) {
        formData.append("userprofile", userprofile);
      }

      const response = await fetch(`${url}/updateUserProfile?token=${token}`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data) {
        alert("프로필 수정이 완료되었습니다.");
        setUserInfoAll(
          data.userid,
          data.username,
          data.userprofile || "/img/default/man_photo.svg",
          data.shortBio || "안녕하세요! 만나서 반갑습니다~"
        ); // 사용자 정보 업데이트
        console.log("Updated user info:", data);
      } else {
        alert("프로필 수정에 실패하였습니다.");
      }
    } catch (error) {
      console.error("Error updating user profile:", error);
      alert("서버 오류가 발생하였습니다. 다시 시도해주세요.");
    }
  };

  const getUserProfileImage = () => {
    if (userprofile instanceof File) {
      return URL.createObjectURL(userprofile);
    }
    return userprofile || "/img/default/man_photo.svg";
  };

  return (
    <div className={style.profileArea}>
      {!onEditProfile ? (
        <div className={style.mypofile}>
          <div className={style.pofileImg}>
            <img
              src={userInfo.userprofile || "/img/default/man_photo.svg"}
              alt={`${userInfo.userid} userprofile`}
            />
          </div>
          <span className="fontTitleXL">{userInfo.username}</span>
          <p className="fontBodyM">
            {userInfo.shortBio || "안녕하세요! 만나서 반갑습니다~"}
          </p>
          <div className={`${style.btnCon}`}>
            <button className="fontTitleM" onClick={profileEdit}>
              프로필 관리
            </button>
            <button
              className="fontTitleM"
              onClick={() => navigate("/myinfomanage")}
            >
              개인정보 관리
            </button>
          </div>
        </div>
      ) : (
        <div className={style.pofileEdit}>
          <div className={style.profileImg}>
            <img
              src={getUserProfileImage()}
              alt={`${userInfo.userid} userprofile`}
            />
            <input
              type="file"
              accept="image/*"
              id="userprofile"
              onChange={handleProfileImageChange}
            />
          </div>
          <label htmlFor="userName">
            <span className="fontHead3">닉네임</span>
            <input
              type="text"
              id="userName"
              maxLength="10"
              className="fontBodyM"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <button className="fontTitleM">중복확인</button>
          </label>
          <label htmlFor="shortBio"></label>
          <label htmlFor="shortBio">
            <span className="fontHead3">한줄소개</span>
            <input
              type="text"
              id="shortBio"
              maxLength="100"
              className="fontBodyM"
              value={shortBio}
              onChange={(e) => setShortBio(e.target.value)}
            />
          </label>
          <div className={style.btnCon}>
            <button className="fontTitleM" onClick={profileEditCopl}>
              프로필 수정 완료
            </button>
            <button
              className="fontTitleM"
              onClick={() => {
                setOnEditProfile(false);
              }}
            >
              취소
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default MypageProfileArea;
