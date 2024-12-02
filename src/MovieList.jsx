import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "./api";
import styled from "styled-components";

const MovieGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  padding: 1rem;
`;

const MovieCard = styled.div`
  width: 150px;

  img {
    width: 100%;
    border-radius: 10px;
  }

  h3 {
    font-size: 1rem;
    color: white;
  }

  a {
    text-decoration: none;
    color: inherit;
  }
`;

const MovieList = () => {
  const [movies, setMovies] = useState([]); // 초기값을 빈 배열로 설정
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await API.get("/movie/popular");
        console.log("API Response:", response.data); // API 응답 데이터 확인
        if (response.data && response.data.results) {
          setMovies(response.data.results);
        } else {
          setError("Unexpected API response structure.");
        }
      } catch (error) {
        console.error("API Error:", error);
        setError("Failed to fetch movies.");
      }
    };

    fetchMovies();
  }, []);

  if (error) return <p>{error}</p>; // 에러 메시지 표시

  return (
    <MovieGrid>
      {movies.length === 0 ? (
        <p>Loading movies...</p> // 데이터 로딩 중 상태
      ) : (
        movies.map((movie) => (
          <MovieCard key={movie.id}>
            <Link to={`/movies/${movie.id}`}>
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
              />
              <h3>{movie.title}</h3>
            </Link>
          </MovieCard>
        ))
      )}
    </MovieGrid>
  );
};

export default MovieList;
