import "./css/common.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { jwtDecode } from "jwt-decode"; // jwt로 토큰 해석하는 jwt-decode 라이브러리 설치했습니다! :npm install jwt-decode

import IndexPage from "./pages/IndexPage";
import CommunityPage from "./pages/CommunityPage";
import DetailPage from "./pages/DetailPage";
import PostWritePage from "./pages/PostWritePage";
import PostWriteCmpltPage from "./pages/PostWriteCmpltPage";
import FashionFeedPage from "./pages/FashionFeedPage";
import PostEditPage from "./pages/PostEditPage";
import TalkPage from "./pages/TalkPage";

// pages
import CodiLog from "../src/pages/CodiLog";
import CodiWrite from "./pages/CodiWrite";
import CodiEdit from "./pages/CodiEdit";
import CodiMain from "./pages/CodiMain";
import CodiCompleted from "./pages/CodiCompleted";

// 로그인, 회원가입
import Login from "./pages/login/Login";
import Signup from "./pages/Signup";
import KakaoLogin from "./pages/login/KakaoLogin";
import Auth from "./pages/login/Auth";
import KakaoOauth from "./pages/login/KakaoOauth";
import CompleteProfile from "./pages/login/CompleteProfile";
// import SignupComplete from "./pages/SignupComplete"; // 추가
import { useLoginInfoStore } from "./store/loginInfoStore";
import Footer from "./components/Footer";

// 마이페이지 - 커뮤니티 활동
import CommuCollectionPage from './pages/CommuCollectionPage';
import CommuCollTalk from './pages/CommuCollTalk';
import CommuCollCmnt from './pages/CommuCollCmnt';
import CommuCollLike from './pages/CommuCollLike';


function App() {
  const { userInfo, setUserInfo } = useLoginInfoStore();

  useEffect(() => {
    const loginTokenn = localStorage.getItem("token");
    if (loginTokenn) {
      const decodedToken = jwtDecode(loginTokenn);
      setUserInfo(decodedToken);
    }
  }, [setUserInfo]);

  useEffect(() => {
    console.log(userInfo);
  }, [])

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
        {/* 로그인, 회원가입 */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/loginKakao" element={<KakaoLogin />} />
        {/* <Route path="/oauth" element={<KakaoOauth />} /> */}
        <Route path="/oauth" element={<Auth />} />
        <Route path="/complete-profile" element={<CompleteProfile />} />
        <Route path="/oauth/kakao" element={<Auth />} />
        {/* <Route path="/signupcomplete" element={<SignupComplete />} /> */}

        {/* 마이페이지 - 커뮤니티 활동 */}
        <Route path='/comuCollect' element={<CommuCollectionPage />} >
          <Route path='' element={<CommuCollTalk />} />
          <Route path='comment' element={<CommuCollCmnt />} />
          <Route path='like' element={<CommuCollLike />} />
        </Route>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
