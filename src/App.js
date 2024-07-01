import "./css/common.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useEffect, useState } from "react";

import IndexPage from "./pages/IndexPage";

import CommunityPage from "./pages/CommunityPage";
import DetailPage from "./pages/DetailPage";
import PostWritePage from "./pages/PostWritePage";
import PostWriteCmpltPage from "./pages/PostWriteCmpltPage";
import FashionFeedPage from "./pages/FashionFeedPage";
import PostEditPage from "./pages/PostEditPage";
import TalkPage from "./pages/TalkPage";

//pages
import CodiLog from "../src/pages/CodiLog";
import CodiWrite from "./pages/CodiWrite";
import CodiEdit from "./pages/CodiEdit";
import CodiMain from "./pages/CodiMain";
import CodiCompleted from "./pages/CodiCompleted";

//로그인, 회원가입
import Login from "./pages/login/Login";
import Signup from "./pages/Signup";
import KakaoLogin from "./pages/login/KakaoLogin";
import Auth from "./pages/login/Auth";
// import SignupComplete from "./pages/SignupComplete"; // 추가

import { jwtDecode } from "jwt-decode"; // jwt로 토큰 해석하는 jwt-decode 라이브러리 설치했습니다! :npm install jwt-decode
import { useLoginInfoStore } from "./store/loginInfoStore";

function App() {
  const { setUserInfo } = useLoginInfoStore();

  useEffect(() => {
    const loginTokenn = localStorage.getItem("token");
    if (loginTokenn) {
      const decodedToken = jwtDecode(loginTokenn);
      setUserInfo(decodedToken);
    }
  }, []);

  return (
    <div className="App">
      <Routes>
        {/* 메인 */}
        <Route path="/" element={<IndexPage />} />
        {/* 커뮤니티 */}
        <Route path="/community" element={<CommunityPage />}>
          <Route path="" element={<TalkPage />} />
          <Route path="feed" element={<FashionFeedPage />} />
        </Route>

        <Route path="/detail/:postId" element={<DetailPage />} />
        <Route path="/postWrite" element={<PostWritePage />} />
        <Route
          path="/postWriteCmplt/:postid"
          element={<PostWriteCmpltPage />}
        />
        <Route path="/postEdit/:postId" element={<PostEditPage />} />
        <Route path="/*" element={<div>없는 페이지 입니다.</div>} />

        {/* 코디 main */}
        <Route path="/codiMain" element={<CodiMain />} />

        {/* 여기부턴 mypage - 코디기록 */}
        <Route path="/codiLog" element={<CodiLog />} />
        <Route path="/codiWrite" element={<CodiWrite />} />
        <Route path="/codiEdit" element={<CodiEdit />} />

        <Route path="/codiCompleted" element={<CodiCompleted />} />

        {/* 로그인, 회원가입. */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        {/* <Route path="/oauth" element={<KakaoCallback />} /> */}
        <Route path="/loginKakao" element={<KakaoLogin />} />
        <Route path="/oauth/kakao" element={<Auth />} />
        {/* <Route path="/signupcomplete" element={<SignupComplete />} /> */}
      </Routes>
    </div>
  );
}

export default App;
