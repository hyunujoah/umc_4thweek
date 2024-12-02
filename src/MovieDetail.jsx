import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "./api";
import styled from "styled-components";

// 스타일 정의
const DetailContainer = styled.div`
  padding: 2rem;
  color: #e0e0e0; /* 밝은 회색 텍스트 */
  background-color: #121212; /* 어두운 배경색 */
  min-height: 100vh; /* 화면 전체 높이 */
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
`;

const Poster = styled.img`
  width: 300px;
  border-radius: 10px;
`;

const Info = styled.div`
  h1 {
    margin-bottom: 1rem;
    color: #ffffff; /* 제목 흰색 */
  }

  p {
    margin: 0.5rem 0;
    color: #b0b0b0; /* 부가 설명은 연한 회색 */
  }
`;

const CreditsSection = styled.div`
  margin-top: 2rem;

  h2 {
    margin-bottom: 1rem;
    border-bottom: 1px solid #b0b0b0; /* 회색 구분선 */
    padding-bottom: 0.5rem;
    color: #ffffff; /* 섹션 제목 흰색 */
  }
`;

const CreditsGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
`;

const CreditCard = styled.div`
  text-align: center;
  width: 100px;

  img {
    width: 100%;
    height: 100px;
    object-fit: cover;
    border-radius: 50%;
    background-color: #ccc;
  }

  p {
    margin-top: 0.5rem;
    font-size: 0.8rem;
    color: #b0b0b0; /* 연한 회색 */
  }
`;

const MovieDetail = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null); // 영화 정보
  const [credits, setCredits] = useState([]); // 출연진 정보

  useEffect(() => {
    // 영화 상세 정보 가져오기
    const fetchMovieDetails = async () => {
      try {
        const response = await API.get(`/movie/${movieId}`);
        setMovie(response.data);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };

    // 출연진 정보 가져오기
    const fetchCredits = async () => {
      try {
        const response = await API.get(`/movie/${movieId}/credits`);
        setCredits(response.data.cast.slice(0, 10)); // 상위 10명의 출연진
      } catch (error) {
        console.error("Error fetching movie credits:", error);
      }
    };

    fetchMovieDetails();
    fetchCredits();
  }, [movieId]);

  // 로딩 상태
  if (!movie) return <p style={{ color: "#ffffff" }}>Loading...</p>;

  return (
    <DetailContainer>
      <Header>
        <Poster
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
        />
        <Info>
          <h1>{movie.title}</h1>
          <p>평균 평점: {movie.vote_average}</p>
          <p>개봉일: {movie.release_date}</p>
          <p>러닝타임: {movie.runtime}분</p>
        </Info>
      </Header>

      <CreditsSection>
        <h2>감독/출연</h2>
        <CreditsGrid>
          {credits.map((credit) => (
            <CreditCard key={credit.id}>
              <img
                src={
                  credit.profile_path
                    ? `https://image.tmdb.org/t/p/w200${credit.profile_path}`
                    : "https://via.placeholder.com/100"
                }
                alt={credit.name}
              />
              <p>{credit.name}</p>
              <p>({credit.character})</p>
            </CreditCard>
          ))}
        </CreditsGrid>
      </CreditsSection>
    </DetailContainer>
  );
};

export default MovieDetail;
