import { Link } from "react-router-dom";
import { setAccessToken } from "../accessToken";
import { useGetSelfQuery, useLogoutUserMutation } from "../generated/graphql";
import { useNavigate } from "react-router-dom";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

export const Header = () => {
  const { data, loading, error } = useGetSelfQuery();

  const [Logout, { client }] = useLogoutUserMutation();
  // let userLoggedIn = document.cookie.replace(
  //   /(?:(?:^|.*;\s*)logged_in\s*\=\s*([^;]*).*$)|^.*$/,
  //   "$1"
  // );
  let userLoggedIn = window.localStorage.getItem("access_token");
  let userInfo: any = null;

  if (loading) {
    userInfo = null;
  } else if (data && !error && data.getSelf && userLoggedIn) {
    userInfo = <div>You are logged in as {data.getSelf.user.email}</div>;
  } else {
    userInfo = <div>Not logged in</div>;
  }

  const navigate = useNavigate();
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar sx={{ bgcolor: "#121212" }} position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Button color="inherit">
              {" "}
              <Link style={{ textDecoration: "none", color: "white" }} to="/">
                App Homepage
              </Link>
            </Button>
          </Typography>

          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {userInfo}
          </Typography>
          {userLoggedIn && (
            <Button
              color="inherit"
              onClick={async () => {
                try {
                  const res = await Logout();
                  setAccessToken("");
                  window.localStorage.setItem("access_token", "");
                  if (res.data?.logoutUser && client) {
                    await client.clearStore();
                    navigate("/login");
                  } else {
                    console.log("client is null");
                  }
                } catch (error) {
                  console.log(error);
                  setAccessToken("");
                  window.localStorage.setItem("access_token", "");
                }
              }}
            >
              Logout
            </Button>
          )}
          {!userLoggedIn && (
            <Button color="inherit">
              <Link
                style={{ textDecoration: "none", color: "white" }}
                to="/signup"
              >
                Signup
              </Link>
            </Button>
          )}

          {!userLoggedIn && (
            <Button color="inherit">
              <Link
                style={{ textDecoration: "none", color: "white" }}
                to="/login"
              >
                Login
              </Link>
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};
