import "./css/common.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

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

import Login from "./pages/login/login";
import Signup from "./pages/signup";
import KakaoCallback from "./pages/login/KakaoCallback";
import SignupComplete from "./pages/signupcomplete"; // 추가

function App() {
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

        {/* 로그인, 회원가입, 바로 아래 코드는 제가 편하려고 넣었던 코드입니다. */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/oauth" element={<KakaoCallback />} />
      </Routes>
    </div>
  );
}

export default App;
