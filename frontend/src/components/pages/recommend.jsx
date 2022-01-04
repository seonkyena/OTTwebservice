import React, { useEffect, useState } from "react";
import Nav from "../nav/nav.jsx";
import Movie from "../movie/movies.jsx";
import Loading from "../loading/loading.jsx";
import styles from "./recommend.module.css";

const Recommend = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedVideoTitle, setSelectedVideoTitle] = useState(null);
  const [selectedVideoYear, setSelectedVideoYear] = useState(null);

  const handleSelectedVideo = (title, year) => {
    setSelectedVideoTitle(title);
    setSelectedVideoYear(year);
  };

  useEffect(() => {
    var myHeaders = new Headers();

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch("https://yts.mx/api/v2/list_movies.json", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setMovies(result.data.movies);
        setLoading(false);
      })
      .catch((error) => {
        console.log("error", error);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <Nav></Nav>
      <div className={styles.headerContainer}>
        <h1>추천 플랫폼</h1>
        <div>
          <div className={styles.selectOption}>
            <select className={styles.playTime}>
              <option value="none">--- 장르 선택 ---</option>
              <option value="korean">TV 프로그램</option>
              <option value="english">영화</option>
            </select>
            <input type="text" placeholder="프로그램 타이틀 검색" />
            <input type="text" placeholder="배우 검색" />
          </div>
        </div>
      </div>

      <div className={styles.viewContainer}>
        {loading ? (
          <Loading />
        ) : (
          movies.map((movie) => (
            <Movie
              key={movie.id}
              title={movie.title}
              year={movie.year}
              poster={movie.medium_cover_image}
              onVideoClick={handleSelectedVideo}
            />
          ))
        )}
      </div>
    </>
  );
};

export default Recommend;
