import React, { useState } from "react";
import { useRegisterUserMutation } from "../generated/graphql";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

export const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [errorText, setErrorText] = useState("");

  const [Register] = useRegisterUserMutation();

  const navigate = useNavigate();

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
      onSubmit={async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
          const response = await Register({
            variables: { name, email, password, passwordConfirm },
          });
          if (response.data?.registerUser.status === "success") {
            navigate("/");
          }
        } catch (error: any) {
          setErrorText(
            JSON.stringify(error?.message) ??
              JSON.stringify(error) ??
              "Unknown Error Occured"
          );
        }
      }}
    >
      <TextField
        id="signup-name"
        label="Name (Visible to Public)"
        variant="standard"
        value={name}
        placeholder="Name (Visible to Public)"
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
      <TextField
        id="signup-email"
        label="Email"
        variant="standard"
        value={email}
        placeholder="Email"
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />

      <TextField
        id="signup-pw"
        label="Password"
        variant="standard"
        type="password"
        value={password}
        placeholder="Password"
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      <TextField
        id="signup-cpw"
        label="Confirm Password"
        variant="standard"
        type="password"
        value={passwordConfirm}
        placeholder="Confirm Password"
        onChange={(e) => {
          setPasswordConfirm(e.target.value);
        }}
      />
      {errorText}
      <Button color="inherit" type="submit">
        Sign Up
      </Button>
    </Box>
  );
};
