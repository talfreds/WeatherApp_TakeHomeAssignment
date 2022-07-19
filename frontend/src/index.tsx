import React from "react";
import ReactDOM from "react-dom/client";
import Main from "./Main";
import reportWebVitals from "./reportWebVitals";

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  from,
  createHttpLink,
  Observable,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import { getAccessToken } from "./accessToken";

let graphQL_URL;
if (process.env.NODE_ENV === "production")
  graphQL_URL =
    "http://ec2-18-118-100-82.us-east-2.compute.amazonaws.com:3333/graphql";
else {
  graphQL_URL = "http://localhost:3333/graphql";
}

const httpLink = createHttpLink({
  uri: graphQL_URL,
  credentials: "include",
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token
  const token = getAccessToken();
  if (!token) window.localStorage.getItem("access_token");
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const errorLink = onError(
  ({ graphQLErrors, networkError, operation, forward }) => {
    if (graphQLErrors) {
      for (let err of graphQLErrors) {
        // attempt to refresh the access token. We need to create a manual post request since we cannot use our hooks here.
        if (err.message === "Invalid access token") {
          return new Observable((observer) => {
            (async () => {
              try {
                // #TODO: this should definitely be set globally in the config, but this is just a demo project
                let graphQL_URL;
                if (process.env.NODE_ENV === "production")
                  graphQL_URL =
                    "http://ec2-18-118-100-82.us-east-2.compute.amazonaws.com:3333/graphql";
                else {
                  graphQL_URL = "http://localhost:3333/graphql";
                }

                const newTokenData = await fetch(graphQL_URL, {
                  headers: {
                    "Content-Type": "application/json",
                  },
                  method: "POST",
                  credentials: "include",
                  body: JSON.stringify({
                    query: `query RefreshAccessToken {
                refreshAccessToken {
                  status
                  access_token
                }
              }
              `,
                  }),
                });
                const json = await newTokenData.json();
                const newToken = json?.data?.refreshAccessToken?.access_token;
                const oldHeaders = operation.getContext().headers;

                operation.setContext({
                  headers: {
                    ...oldHeaders,
                    authorization: `Bearer ${newToken}`,
                  },
                });

                const subscriber = {
                  next: observer.next.bind(observer),
                  error: observer.error.bind(observer),
                  complete: observer.complete.bind(observer),
                };

                // Retry last failed request
                forward(operation).subscribe(subscriber);
              } catch (error) {
                observer.error(error);
              }
            })();
          });
        }
      }
    }
  }
);

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: from([authLink, errorLink, httpLink]),
  // link: from([authLink, httpLink]),
});

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <Main />
    </ApolloProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
