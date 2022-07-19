import React, { useState } from "react";
import {
  GetSelfDocument,
  GetSelfQuery,
  useLoginUserMutation,
} from "../generated/graphql";
import { useNavigate } from "react-router-dom";
import { setAccessToken } from "../accessToken";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorText, setErrorText] = useState("");

  const [Login] = useLoginUserMutation();

  const navigate = useNavigate();

  const onLoginSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("form submit: ", email, password);
    try {
      const response = await Login({
        variables: { email, password },
        update: (store, { data }) => {
          if (!data) return null;
          store.writeQuery<GetSelfQuery>({
            query: GetSelfDocument,
            data: {
              getSelf: { user: data.loginUser.user },
            },
          });
        },
      });
      if (response.data?.loginUser?.status === "success") {
        setAccessToken(response.data.loginUser.access_token);
        window.localStorage.setItem(
          "access_token",
          response.data.loginUser.access_token
        );
        navigate("/");
      }
    } catch (error: any) {
      console.log(
        "🚀 ~ file: Signup.tsx ~ line 63 ~ onSubmit={ ~ error",
        error
      );
      setErrorText(
        JSON.stringify(error?.message) ??
          JSON.stringify(error) ??
          "Unknown Error Occured"
      );
    }
  };

  return (
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
      padding={10}
      margin={5}
      onSubmit={onLoginSubmit}
    >
      <TextField
        id="login-email"
        label="Email"
        variant="standard"
        value={email}
        placeholder="Email"
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />

      <TextField
        id="login-password"
        label="Password"
        variant="standard"
        type="password"
        value={password}
        placeholder="Password"
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      {errorText}
      <Button color="inherit" type="submit">
        Login
      </Button>
    </Box>
  );
};
