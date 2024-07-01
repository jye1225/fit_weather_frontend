// 아마 사용하지 않을 것 같음

// import React, { useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// export default function KakaoCallback() {
//   const navigate = useNavigate();

//   useEffect(() => {
//     const code = new URL(window.location.href).searchParams.get("code");
//     if (code) {
//       fetch(`https://kauth.kakao.com/oauth/token`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/x-www-form-urlencoded",
//         },
//         body: new URLSearchParams({
//           grant_type: "authorization_code",
//           client_id: process.env.REST_API_KEY,
//           redirect_uri: process.env.REDIRECT_URI,
//           code: code,
//         }).toString(),
//       })
//         .then((response) => response.json())
//         .then((data) => {
//           const { access_token } = data;
//           localStorage.setItem("access_token", access_token);
//           navigate("/");
//         })
//         .catch((error) => {
//           console.error("Kakao login failed", error);
//           alert("로그인에 실패했습니다. 다시 시도해주세요.");
//         });
//     }
//   }, [navigate]);

//   return <div>로그인 중...</div>;
// }
