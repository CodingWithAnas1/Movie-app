import axios from "axios";
import React, { useState, useEffect } from "react";
import Generes from "../../components/Generes";
import CustomPagination from "../../components/Pagination/CustomPagination";
import SingleContent from "../../components/SingleContent/SingleContent";
import useGenres from "../../Hooks/useGenre";

const Series = () => {
  const [page, setPage] = useState(1);
  const [content, setContent] = useState([]);
  const [numOfPages, setNumOfPages] = useState();
  const [selectedGeneres, setSelectedGenres] = useState([]);
  const [generes, setGeneres] = useState([]);
  const genreforURL = useGenres(selectedGeneres);
  const fetchMovies = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/discover/tv?api_key=${process.env.REACT_APP__API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreforURL}`
    );
    setContent(data.results);
    setNumOfPages(data.total_pages);
  };
  useEffect(() => {
    fetchMovies();
  }, [page, selectedGeneres]);
  return (
    <>
      <span className="pageTitle">Tv Series</span>
      <Generes
        type="tv"
        selectedGeneres={selectedGeneres}
        setSelectedGenres={setSelectedGenres}
        generes={generes}
        setGeneres={setGeneres}
        setPage={setPage}
      />
      <div className="trending">
        {content &&
          content.map((e) => {
            return (
              <SingleContent
                key={e.id}
                id={e.id}
                poster={e.poster_path}
                title={e.title || e.name}
                date={e.first_air_date || e.release_date}
                media_type="tv"
                vote_average={e.vote_average}
              />
            );
          })}
      </div>
      <CustomPagination setPage={setPage} numOfPages={numOfPages} />
    </>
  );
};

export default Series;
