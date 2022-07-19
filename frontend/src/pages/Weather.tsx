import React, { useState } from "react";
import { WeatherSearchHistory } from "./WeatherPageComponents/WeatherSearchHistory";
import { WeatherSearchResult } from "./WeatherPageComponents/WeatherSearchResult";
import { useGetWeatherMutation } from "../generated/graphql";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import { getAccessToken } from "../accessToken";

export const Weather = () => {
  const [search, setSearch] = useState("");
  const [weather, setWeather] = useState("");
  const [errorText, setErrorText] = useState("");

  const [GetWeather] = useGetWeatherMutation();

  // let userLoggedIn = document.cookie.replace(
  //   /(?:(?:^|.*;\s*)logged_in\s*\=\s*([^;]*).*$)|^.*$/,
  //   "$1"
  // );

  let userLoggedIn = localStorage.getItem("access_token") ?? "";
  return (
    <div>
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        padding={2}
        margin={2}
        onSubmit={async (e: React.FormEvent<HTMLFormElement>) => {
          e.preventDefault();
          try {
            const res = await GetWeather({
              variables: { input: search },
            });
            if (res.data?.getWeather) {
              setWeather(JSON.parse(res.data?.getWeather));
              setSearch("");
            }
          } catch (error: any) {
            setErrorText(
              "Unknown Error Occured. Please try another search input or contact Administrator."
            );
          }
        }}
      >
        <TextField
          id="search-weather"
          label="Search for Weather"
          variant="standard"
          value={search}
          placeholder="Enter a city or address"
          onChange={(e) => {
            setErrorText("");
            setSearch(e.target.value);
          }}
        ></TextField>
        <Typography
          variant="subtitle2"
          color="red"
          gutterBottom
          component="div"
        >
          {errorText}
        </Typography>
        <Button type="submit">Search</Button>
      </Box>

      {userLoggedIn && weather && <WeatherSearchResult props={weather} />}

      {userLoggedIn && (
        <>
          <Typography variant="h5" gutterBottom component="div">
            Weather Search History - All Users (Refresh to Update)
          </Typography>
          <WeatherSearchHistory />
        </>
      )}
    </div>
  );
};
