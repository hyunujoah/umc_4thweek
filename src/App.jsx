import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Navbar";
import MainPage from "./MainPage";
import MovieList from "./MovieList";
import MovieDetail from "./MovieDetail";
import LoginPage from "./LoginPage";
import SignupPage from "./SignupPage";
import SearchPage from "./SearchPage";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<MainPage />} /> {/* 메인 페이지 */}
        <Route path="/movies" element={<MovieList />} /> {/* 영화 목록 */}
        <Route path="/movies/:movieId" element={<MovieDetail />} /> {/* 영화 상세 */}
        <Route path="/search" element={<SearchPage />} /> {/* 검색 페이지 */}
        <Route path="/login" element={<LoginPage />} /> {/* 로그인 */}
        <Route path="/signup" element={<SignupPage />} /> {/* 회원가입 */}
      </Routes>
    </Router>
  );
};

export default App;
