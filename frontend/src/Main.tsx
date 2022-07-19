import { useEffect } from "react";
import { setAccessToken } from "./accessToken";
import AppRouter from "./AppRouter";
import { useRefreshAccessTokenQuery } from "./generated/graphql";

export const Main = () => {
  // const { data, error, loading } = useRefreshAccessTokenQuery({
  //   fetchPolicy: "network-only",
  // });
  // console.log(
  //   "🚀 ~ file: Main.tsx ~ line 10 ~ Main ~ data, error, loading",
  //   data,
  //   error,
  //   loading
  // );

  // if (data) setAccessToken(data?.refreshAccessToken?.access_token ?? "");

  useEffect(() => {
    const token = window.localStorage.getItem("access_token");
    if (token) setAccessToken(token);
  }, []);

  return <AppRouter />;
};

export default Main;
