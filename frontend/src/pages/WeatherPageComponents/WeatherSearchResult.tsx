import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";

export const WeatherSearchResult = (props: any) => {
  let data = props?.props;

  if (data?.name) {
    return (
      <Box margin={3}>
        <TableContainer component={Paper}>
          <Table
            sx={{ minWidth: 650 }}
            aria-label="simple table"
            style={{ backgroundColor: "lightgreen", color: "black" }}
          >
            <TableHead>
              <TableRow>
                <TableCell align="center">City Name</TableCell>
                <TableCell align="center">Temperature&nbsp;(Metric)</TableCell>
                <TableCell align="center">Summary</TableCell>
                <TableCell align="center">Description</TableCell>
                <TableCell align="center">Sun Rise&nbsp;(Local)</TableCell>
                <TableCell align="center">Sun Set&nbsp;(Local)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow
                key={data.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="center">{data.name}</TableCell>
                <TableCell align="center">{data.main.temp}</TableCell>
                <TableCell align="center">{data.weather[0].main}</TableCell>
                <TableCell align="center">
                  {data.weather[0].description}
                </TableCell>
                <TableCell align="center">
                  {new Date(
                    Number(data.sys.sunrise * 1000)
                  ).toLocaleDateString()}{" "}
                  &nbsp;
                  {new Date(
                    Number(data.sys.sunrise * 1000)
                  ).toLocaleTimeString()}
                </TableCell>
                <TableCell align="center">
                  {new Date(
                    Number(data.sys.sunset * 1000)
                  ).toLocaleDateString()}{" "}
                  &nbsp;
                  {new Date(
                    Number(data.sys.sunset * 1000)
                  ).toLocaleTimeString()}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    );
  } else return <></>;
};
