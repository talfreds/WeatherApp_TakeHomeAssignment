import { useGetWeatherSearchesQuery } from "../../generated/graphql";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

export const WeatherSearchHistory = () => {
  const { data, loading, error } = useGetWeatherSearchesQuery();
  if (loading) return <>Loading search history..</>;
  if (error) return <>{error}</>;
  if (data)
    return (
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Search Term</TableCell>
              <TableCell align="center">City Name</TableCell>
              <TableCell align="center">Temperature&nbsp;(Metric)</TableCell>
              <TableCell align="center">Sun Rise&nbsp;(Local)</TableCell>
              <TableCell align="center">Sun Set&nbsp;(Local)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data &&
              data.getWeatherSearches.map((row) => {
                const weatherData = JSON.parse(row.raw);
                return (
                  <TableRow
                    key={row.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.searchTerm}
                    </TableCell>
                    <TableCell align="center">{row.name}</TableCell>
                    <TableCell align="center">
                      {weatherData.main.temp}
                    </TableCell>
                    <TableCell align="center">
                      {new Date(
                        Number(weatherData.sys.sunrise * 1000)
                      ).toLocaleDateString()}{" "}
                      &nbsp;
                      {new Date(
                        Number(weatherData.sys.sunrise * 1000)
                      ).toLocaleTimeString()}
                    </TableCell>
                    <TableCell align="center">
                      {new Date(
                        Number(weatherData.sys.sunset * 1000)
                      ).toLocaleDateString()}{" "}
                      &nbsp;
                      {new Date(
                        Number(weatherData.sys.sunset * 1000)
                      ).toLocaleTimeString()}
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
    );
  else {
    return <></>;
  }
};
