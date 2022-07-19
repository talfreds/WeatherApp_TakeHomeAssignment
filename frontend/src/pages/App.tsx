import React, { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import { useGetUsersPublicQuery } from "../generated/graphql";

import { Weather } from "./Weather";

export const App = () => {
  const { data, loading } = useGetUsersPublicQuery({
    fetchPolicy: "network-only",
  });
  // let userLoggedIn = document.cookie.replace(
  //   /(?:(?:^|.*;\s*)logged_in\s*\=\s*([^;]*).*$)|^.*$/,
  //   "$1"
  // );
  // useEffect(() => {

  // }. [])
  let userLoggedIn = window.localStorage.getItem("access_token");

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {userLoggedIn && <Weather />}
      <div>
        <Typography variant="h5" margin={3} gutterBottom component="div">
          Created Users:
        </Typography>
        <ul>
          {!loading &&
            data?.getUsersPublic &&
            data.getUsersPublic.map((user) => {
              return (
                <li key={user.id}>
                  {user.name} Created:{" "}
                  {new Date(Number(user.createdAt)).toLocaleDateString()}{" "}
                  {new Date(Number(user.createdAt)).toLocaleTimeString()}
                </li>
              );
            })}
        </ul>
      </div>
    </div>
  );
};
