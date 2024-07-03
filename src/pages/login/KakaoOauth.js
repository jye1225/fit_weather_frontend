// 아마 필요 없을듯
//  import React, { useEffect, useState } from "react";
// import { useLoginInfoStore } from "../../store/loginInfoStore";
// import { useNavigate } from "react-router-dom";

// const KakaoOauth = () => {
//   const setUserInfo = useLoginInfoStore((state) => state.setUserInfo);
//   const navigate = useNavigate();
//   const [isLoading, setIsLoading] = useState(true);

//   const code = new URL(window.location.href).searchParams.get("code");
//   console.log("Kakao authorization code:", code);

//   useEffect(() => {
//     const fetchToken = async () => {
//       try {
//         const response = await fetch(`/kakao-login?code=${code}`);
//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }
//         const data = await response.json();

//         setUserInfo(data.user);
//         localStorage.setItem("token", data.token);
//         navigate("/");
//       } catch (error) {
//         console.error("카카오 로그인 실패:", error);
//         alert("로그인에 실패했습니다.");
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     if (code) {
//       fetchToken();
//     }
//   }, [code, setUserInfo, navigate]);

//   if (isLoading) {
//     return <div>로딩 중...</div>;
//   }

//   return null;
// };

// export default KakaoOauth;
