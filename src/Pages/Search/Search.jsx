import { Button, Tab, Tabs, TextField } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/system";
import React, { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";
import SingleContent from "../../components/SingleContent/SingleContent";
import CustomPagination from "../../components/Pagination/CustomPagination";

const Search = () => {
  const [type, setType] = useState(0);
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [content, setContent] = useState();
  const [numOfPages, setNumOfPages] = useState();

  const darkTheme = createTheme({
    palette: {
      type: "dark",
      primary: {
        main: "#fff",
      },
    },
  });

  const fetchSearch = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/search/${type ? "tv" : "movie"}?api_key=${
        process.env.REACT_APP__API_KEY
      }&language=en=US&query=${searchText}&page=${page}&include_adult=false`
    );
    setContent(data.results);
    setNumOfPages(data.total_pages);
  };
  useEffect(() => {
    window.scroll(0, 0);
    fetchSearch();
  }, [type, page]);
  return (
    <>
      <span className="pageTitle">Movies</span>

      <div style={{ display: "flex", margin: "15px 0" }}>
        <TextField
          style={{ flex: 1, border: "1px solid white", color: "white" }}
          className="searchBox"
          label="Search"
          variant="filled"
          onChange={(e) => setSearchText(e.target.value)}
        />
        <Button onClick={fetchSearch} variant="contained">
          <SearchIcon />
        </Button>
      </div>
      <Tabs
        value={type}
        indicatorColor="primary"
        textColor="inherit"
        onChange={(event, newValue) => {
          setType(newValue);
          setPage(1);
        }}
      >
        <Tab style={{ width: "50%" }} label="Search Movies" />
        <Tab style={{ width: "50%" }} label="Search Series" />
      </Tabs>
      <>
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
                  media_type={e.media_type}
                  vote_average={e.vote_average}
                />
              );
            })}

          {searchText &&
            !content &&
            (type ? (
              <h2
                style={{
                  backgroundColor: "white",
                  width: "100px",
                  height: "100px",
                }}
              >
                No Series Found
              </h2>
            ) : (
              <h2>No Movies Found</h2>
            ))}
        </div>
        {numOfPages > 1 && (
          <CustomPagination setPage={setPage} numOfPages={numOfPages} />
        )}
      </>
    </>
  );
};

export default Search;
