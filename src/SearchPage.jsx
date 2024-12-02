import React, { useState } from "react";
import API from "./api";
import styled from "styled-components";
import { Link } from "react-router-dom";

const SearchContainer = styled.div`
  padding: 2rem;
  background-color: #121212;
  color: #e0e0e0; /* 밝은 회색 텍스트 */
  min-height: 100vh;
`;

const SearchBar = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;

  input {
    width: 300px;
    padding: 0.5rem;
    border-radius: 5px;
    border: none;
    margin-right: 1rem;
    font-size: 1rem;
  }

  button {
    padding: 0.5rem 1rem;
    font-size: 1rem;
    color: white;
    background-color: #f05a9e;
    border: none;
    border-radius: 5px;
    cursor: pointer;

    &:hover {
      background-color: #d94a87;
    }
  }
`;

const ResultsGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
`;

const ResultCard = styled.div`
  width: 150px;

  img {
    width: 100%;
    border-radius: 10px;
  }

  h3 {
    font-size: 1rem;
    color: white;
    text-align: center;
    margin-top: 0.5rem;
  }

  a {
    text-decoration: none;
    color: inherit;
  }
`;

const Search = () => {
  const [query, setQuery] = useState(""); // 검색어 상태
  const [results, setResults] = useState([]); // 검색 결과 상태

  const handleSearch = async () => {
    if (!query) return; // 빈 검색어 방지
    try {
      const response = await API.get("/search/movie", {
        params: { query }, // 검색어 전달
      });
      setResults(response.data.results); // 검색 결과 저장
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  return (
    <SearchContainer>
      <SearchBar>
        <input
          type="text"
          placeholder="영화 제목을 입력하세요"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button onClick={handleSearch}>검색</button>
      </SearchBar>

      <ResultsGrid>
        {results.length > 0 ? (
          results.map((movie) => (
            <ResultCard key={movie.id}>
              <Link to={`/movies/${movie.id}`}>
                <img
                  src={
                    movie.poster_path
                      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                      : "https://via.placeholder.com/150"
                  }
                  alt={movie.title}
                />
                <h3>{movie.title}</h3>
              </Link>
            </ResultCard>
          ))
        ) : (
          <p>검색 결과가 없습니다.</p>
        )}
      </ResultsGrid>
    </SearchContainer>
  );
};

export default Search;
