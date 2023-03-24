import { Chip } from "@mui/material";
import axios from "axios";
import React, { useEffect } from "react";

const Generes = ({
  selectedGeneres,
  setSelectedGenres,
  generes,
  setGeneres,
  setPage,
  type,
}) => {
  const handleAdd = (genre) => {
    setSelectedGenres([...selectedGeneres, genre]);
    setGeneres(generes.filter((g) => g.id !== genre.id));
    setPage(1);
  };
  const handleRemove = (genre) => {
    setSelectedGenres(
      selectedGeneres.filter((selected) => selected.id !== genre.id)
    );
    setGeneres([...generes, genre]);
    setPage(1);
  };
  const fetchGeneres = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/genre/${type}/list?api_key=${process.env.REACT_APP__API_KEY}&language=en-US`
    );
    setGeneres(data.genres);
  };

  useEffect(() => {
    fetchGeneres();
    // eslint-disable-next-line
    // return () => {
    //   setGeneres({});
    // };
  }, []);
  return (
    <>
      <div style={{ padding: 7 }}>
        {selectedGeneres &&
          selectedGeneres.map((genre) => (
            <Chip
              label={genre.name}
              style={{ margin: 3 }}
              color="primary"
              clickable
              size="medium"
              key={genre.id}
              onDelete={() => handleRemove(genre)}
            />
          ))}
        {generes &&
          generes.map((genre) => (
            <Chip
              label={genre.name}
              style={{ backgroundColor: "white", margin: 3 }}
              clickable
              size="medium"
              key={genre.id}
              onClick={() => handleAdd(genre)}
            />
          ))}
      </div>
    </>
  );
};

export default Generes;
