import "./css/common.css";
import { Route, Routes } from 'react-router-dom';

import Header from "./components/Header";
import PresentWeather from "./components/PresentWeather";
import CodyWeather from "./components/CodyWeather";
import Hours from "./components/Hours";
import Weekly from "./components/Weekly";

import CommunityPage from './pages/CommunityPage';
import DetailPage from './pages/DetailPage';
import PostWritePage from './pages/PostWritePage';
import PostWriteCmpltPage from './pages/PostWriteCmpltPage';
import FashionFeedPage from './pages/FashionFeedPage';
import PostEditPage from './pages/PostEditPage';
import TalkPage from './pages/TalkPage';

//pages
import CodiLog from "../src/pages/CodiLog";
import CodiWrite from "./pages/CodiWrite";
import CodiEdit from "./pages/CodiEdit";
import Codi from "./pages/Codi";

function App() {
  return (
    <div className="App">
      <Header />
      <PresentWeather />
      <CodyWeather />
      <Hours />
      <Weekly />

      <Routes>
        <Route path='/community' element={<CommunityPage />} >
          <Route path='' element={<TalkPage />} />
          <Route path='feed' element={<FashionFeedPage />} />
        </Route>

        <Route path='/detail/:postId' element={<DetailPage />} />
        <Route path='/postWrite' element={<PostWritePage />} />
        <Route path='/postWriteCmplt' element={<PostWriteCmpltPage />} />
        <Route path='/postEdit/:postId' element={<PostEditPage />} />
        <Route path='*' element={<div>없는 페이지 입니다.</div>} />

        {/* 코디 main */}
        <Route path="/codi" element={<Codi />} />

        {/* 여기부턴 mypage - 코디기록 */}
        <Route path="/codiLog" element={<CodiLog />} />
        <Route path="codiWrite" element={<CodiWrite />} />
        <Route path="codiEdit" element={<CodiEdit />} />
      </Routes>

    </div>
  );
}

export default App;
