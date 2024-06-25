import "./css/common.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Header from "./components/Header";
import PresentWeather from "./components/PresentWeather";
import CodyWeather from "./components/CodyWeather";
import Hours from "./components/Hours";
import Weekly from "./components/Weekly";

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
import Codi from "./pages/Codi";

import Login from "./pages/login/login";
import Signup from "./pages/signup";
import NaverCallback from "./pages/login/NaverCallback";
import KakaoCallback from "./pages/login/KakaoCallback";

function App() {
  return (
    <div className="App">
      <Header />
      <PresentWeather />
      <CodyWeather />
      <Hours />
      <Weekly />

      <Routes>
        <Route path="/community" element={<CommunityPage />}>
          <Route path="" element={<TalkPage />} />
          <Route path="feed" element={<FashionFeedPage />} />
        </Route>

        <Route path="/detail/:postId" element={<DetailPage />} />
        <Route path="/postWrite" element={<PostWritePage />} />
        <Route path="/postWriteCmplt" element={<PostWriteCmpltPage />} />
        <Route path="/postEdit/:postId" element={<PostEditPage />} />
        <Route path="*" element={<div>없는 페이지 입니다.</div>} />

        {/* 코디 main */}
        <Route path="/codi" element={<Codi />} />

        {/* 여기부턴 mypage - 코디기록 */}
        <Route path="/codiLog" element={<CodiLog />} />
        <Route path="/codiWrite" element={<CodiWrite />} />
        <Route path="/codiEdit" element={<CodiEdit />} />
      </Routes>

      {/* 로그인, 회원가입, 바로 아래 코드는 제가 편하려고 넣었던 코드입니다. */}
      {/* <Route path="/" element={<Navigate to="/login" />} /> */}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/oauth" element={<KakaoCallback />} />
        <Route path="/naver-callback" element={<NaverCallback />} />
      </Routes>
    </div>
  );
}

export default App;
