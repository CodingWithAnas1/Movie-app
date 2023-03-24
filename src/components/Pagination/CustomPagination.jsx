import { createTheme, ThemeProvider } from "@mui/material";
import Pagination from "@mui/material/Pagination";

const darkTheme = createTheme({
  palette: {
    type: "dark",
  },
});
const CustomPagination = ({ setPage, numOfPages = 10 }) => {
  const handlePageChange = (page) => {
    setPage(page);
    window.scroll(0, 0);
  };
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: 10,
          width: "100%",
        }}
      >
        <ThemeProvider theme={darkTheme}>
          <Pagination
            color="secondary"
            count={numOfPages}
            onChange={(e) => handlePageChange(e.target.textContent)}
          />
        </ThemeProvider>
      </div>
    </>
  );
};

export default CustomPagination;
