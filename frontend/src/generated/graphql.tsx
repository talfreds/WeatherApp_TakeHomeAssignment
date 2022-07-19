import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
};

export type LoginInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type LoginResponse = {
  __typename?: 'LoginResponse';
  access_token: Scalars['String'];
  status: Scalars['String'];
  user: UserData;
};

export type Mutation = {
  __typename?: 'Mutation';
  getWeather: Scalars['String'];
  loginUser: LoginResponse;
  logoutUser: Scalars['Boolean'];
  registerUser: UserResponse;
};


export type MutationGetWeatherArgs = {
  input: Scalars['String'];
};


export type MutationLoginUserArgs = {
  input: LoginInput;
};


export type MutationRegisterUserArgs = {
  input: RegisterInput;
};

export type Query = {
  __typename?: 'Query';
  getSelf: UserResponse;
  getUsersPublic: Array<UsersPublicResponse>;
  getWeatherSearches: Array<WeatherData>;
  refreshAccessToken: LoginResponse;
};

export type RegisterInput = {
  email: Scalars['String'];
  name: Scalars['String'];
  password: Scalars['String'];
  passwordConfirm: Scalars['String'];
};

export type UserData = {
  __typename?: 'UserData';
  _id: Scalars['String'];
  createdAt: Scalars['DateTime'];
  email: Scalars['String'];
  id?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  role: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  status: Scalars['String'];
  user: UserData;
};

export type UsersPublicResponse = {
  __typename?: 'UsersPublicResponse';
  createdAt: Scalars['String'];
  id: Scalars['String'];
  name: Scalars['String'];
};

export type WeatherData = {
  __typename?: 'WeatherData';
  _id: Scalars['String'];
  createdAt: Scalars['DateTime'];
  id?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  raw: Scalars['String'];
  searchTerm: Scalars['String'];
  sunrise: Scalars['String'];
  sunset: Scalars['String'];
  temp: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type GetSelfQueryVariables = Exact<{ [key: string]: never; }>;


export type GetSelfQuery = { __typename?: 'Query', getSelf: { __typename?: 'UserResponse', user: { __typename?: 'UserData', id?: string | null, _id: string, name: string, email: string, role: string, createdAt: any, updatedAt: any } } };

export type GetUsersPublicQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUsersPublicQuery = { __typename?: 'Query', getUsersPublic: Array<{ __typename?: 'UsersPublicResponse', id: string, name: string, createdAt: string }> };

export type GetWeatherMutationVariables = Exact<{
  input: Scalars['String'];
}>;


export type GetWeatherMutation = { __typename?: 'Mutation', getWeather: string };

export type GetWeatherSearchesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetWeatherSearchesQuery = { __typename?: 'Query', getWeatherSearches: Array<{ __typename?: 'WeatherData', id?: string | null, searchTerm: string, name: string, raw: string }> };

export type LoginUserMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginUserMutation = { __typename?: 'Mutation', loginUser: { __typename?: 'LoginResponse', access_token: string, status: string, user: { __typename?: 'UserData', id?: string | null, _id: string, name: string, email: string, role: string, createdAt: any, updatedAt: any } } };

export type LogoutUserMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutUserMutation = { __typename?: 'Mutation', logoutUser: boolean };

export type RefreshAccessTokenQueryVariables = Exact<{ [key: string]: never; }>;


export type RefreshAccessTokenQuery = { __typename?: 'Query', refreshAccessToken: { __typename?: 'LoginResponse', status: string, access_token: string } };

export type RegisterUserMutationVariables = Exact<{
  name: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
  passwordConfirm: Scalars['String'];
}>;


export type RegisterUserMutation = { __typename?: 'Mutation', registerUser: { __typename?: 'UserResponse', status: string, user: { __typename?: 'UserData', id?: string | null, name: string, email: string } } };


export const GetSelfDocument = gql`
    query GetSelf {
  getSelf {
    user {
      id
      _id
      name
      email
      role
      createdAt
      updatedAt
    }
  }
}
    `;

/**
 * __useGetSelfQuery__
 *
 * To run a query within a React component, call `useGetSelfQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSelfQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSelfQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetSelfQuery(baseOptions?: Apollo.QueryHookOptions<GetSelfQuery, GetSelfQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetSelfQuery, GetSelfQueryVariables>(GetSelfDocument, options);
      }
export function useGetSelfLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetSelfQuery, GetSelfQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetSelfQuery, GetSelfQueryVariables>(GetSelfDocument, options);
        }
export type GetSelfQueryHookResult = ReturnType<typeof useGetSelfQuery>;
export type GetSelfLazyQueryHookResult = ReturnType<typeof useGetSelfLazyQuery>;
export type GetSelfQueryResult = Apollo.QueryResult<GetSelfQuery, GetSelfQueryVariables>;
export const GetUsersPublicDocument = gql`
    query getUsersPublic {
  getUsersPublic {
    id
    name
    createdAt
  }
}
    `;

/**
 * __useGetUsersPublicQuery__
 *
 * To run a query within a React component, call `useGetUsersPublicQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUsersPublicQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUsersPublicQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUsersPublicQuery(baseOptions?: Apollo.QueryHookOptions<GetUsersPublicQuery, GetUsersPublicQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUsersPublicQuery, GetUsersPublicQueryVariables>(GetUsersPublicDocument, options);
      }
export function useGetUsersPublicLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUsersPublicQuery, GetUsersPublicQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUsersPublicQuery, GetUsersPublicQueryVariables>(GetUsersPublicDocument, options);
        }
export type GetUsersPublicQueryHookResult = ReturnType<typeof useGetUsersPublicQuery>;
export type GetUsersPublicLazyQueryHookResult = ReturnType<typeof useGetUsersPublicLazyQuery>;
export type GetUsersPublicQueryResult = Apollo.QueryResult<GetUsersPublicQuery, GetUsersPublicQueryVariables>;
export const GetWeatherDocument = gql`
    mutation getWeather($input: String!) {
  getWeather(input: $input)
}
    `;
export type GetWeatherMutationFn = Apollo.MutationFunction<GetWeatherMutation, GetWeatherMutationVariables>;

/**
 * __useGetWeatherMutation__
 *
 * To run a mutation, you first call `useGetWeatherMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useGetWeatherMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [getWeatherMutation, { data, loading, error }] = useGetWeatherMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetWeatherMutation(baseOptions?: Apollo.MutationHookOptions<GetWeatherMutation, GetWeatherMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<GetWeatherMutation, GetWeatherMutationVariables>(GetWeatherDocument, options);
      }
export type GetWeatherMutationHookResult = ReturnType<typeof useGetWeatherMutation>;
export type GetWeatherMutationResult = Apollo.MutationResult<GetWeatherMutation>;
export type GetWeatherMutationOptions = Apollo.BaseMutationOptions<GetWeatherMutation, GetWeatherMutationVariables>;
export const GetWeatherSearchesDocument = gql`
    query GetWeatherSearches {
  getWeatherSearches {
    id
    searchTerm
    name
    raw
  }
}
    `;

/**
 * __useGetWeatherSearchesQuery__
 *
 * To run a query within a React component, call `useGetWeatherSearchesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetWeatherSearchesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetWeatherSearchesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetWeatherSearchesQuery(baseOptions?: Apollo.QueryHookOptions<GetWeatherSearchesQuery, GetWeatherSearchesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetWeatherSearchesQuery, GetWeatherSearchesQueryVariables>(GetWeatherSearchesDocument, options);
      }
export function useGetWeatherSearchesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetWeatherSearchesQuery, GetWeatherSearchesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetWeatherSearchesQuery, GetWeatherSearchesQueryVariables>(GetWeatherSearchesDocument, options);
        }
export type GetWeatherSearchesQueryHookResult = ReturnType<typeof useGetWeatherSearchesQuery>;
export type GetWeatherSearchesLazyQueryHookResult = ReturnType<typeof useGetWeatherSearchesLazyQuery>;
export type GetWeatherSearchesQueryResult = Apollo.QueryResult<GetWeatherSearchesQuery, GetWeatherSearchesQueryVariables>;
export const LoginUserDocument = gql`
    mutation LoginUser($email: String!, $password: String!) {
  loginUser(input: {email: $email, password: $password}) {
    access_token
    status
    user {
      id
      _id
      name
      email
      role
      createdAt
      updatedAt
    }
  }
}
    `;
export type LoginUserMutationFn = Apollo.MutationFunction<LoginUserMutation, LoginUserMutationVariables>;

/**
 * __useLoginUserMutation__
 *
 * To run a mutation, you first call `useLoginUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginUserMutation, { data, loading, error }] = useLoginUserMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginUserMutation(baseOptions?: Apollo.MutationHookOptions<LoginUserMutation, LoginUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginUserMutation, LoginUserMutationVariables>(LoginUserDocument, options);
      }
export type LoginUserMutationHookResult = ReturnType<typeof useLoginUserMutation>;
export type LoginUserMutationResult = Apollo.MutationResult<LoginUserMutation>;
export type LoginUserMutationOptions = Apollo.BaseMutationOptions<LoginUserMutation, LoginUserMutationVariables>;
export const LogoutUserDocument = gql`
    mutation logoutUser {
  logoutUser
}
    `;
export type LogoutUserMutationFn = Apollo.MutationFunction<LogoutUserMutation, LogoutUserMutationVariables>;

/**
 * __useLogoutUserMutation__
 *
 * To run a mutation, you first call `useLogoutUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutUserMutation, { data, loading, error }] = useLogoutUserMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutUserMutation(baseOptions?: Apollo.MutationHookOptions<LogoutUserMutation, LogoutUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogoutUserMutation, LogoutUserMutationVariables>(LogoutUserDocument, options);
      }
export type LogoutUserMutationHookResult = ReturnType<typeof useLogoutUserMutation>;
export type LogoutUserMutationResult = Apollo.MutationResult<LogoutUserMutation>;
export type LogoutUserMutationOptions = Apollo.BaseMutationOptions<LogoutUserMutation, LogoutUserMutationVariables>;
export const RefreshAccessTokenDocument = gql`
    query RefreshAccessToken {
  refreshAccessToken {
    status
    access_token
  }
}
    `;

/**
 * __useRefreshAccessTokenQuery__
 *
 * To run a query within a React component, call `useRefreshAccessTokenQuery` and pass it any options that fit your needs.
 * When your component renders, `useRefreshAccessTokenQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRefreshAccessTokenQuery({
 *   variables: {
 *   },
 * });
 */
export function useRefreshAccessTokenQuery(baseOptions?: Apollo.QueryHookOptions<RefreshAccessTokenQuery, RefreshAccessTokenQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<RefreshAccessTokenQuery, RefreshAccessTokenQueryVariables>(RefreshAccessTokenDocument, options);
      }
export function useRefreshAccessTokenLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<RefreshAccessTokenQuery, RefreshAccessTokenQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<RefreshAccessTokenQuery, RefreshAccessTokenQueryVariables>(RefreshAccessTokenDocument, options);
        }
export type RefreshAccessTokenQueryHookResult = ReturnType<typeof useRefreshAccessTokenQuery>;
export type RefreshAccessTokenLazyQueryHookResult = ReturnType<typeof useRefreshAccessTokenLazyQuery>;
export type RefreshAccessTokenQueryResult = Apollo.QueryResult<RefreshAccessTokenQuery, RefreshAccessTokenQueryVariables>;
export const RegisterUserDocument = gql`
    mutation RegisterUser($name: String!, $email: String!, $password: String!, $passwordConfirm: String!) {
  registerUser(
    input: {name: $name, email: $email, password: $password, passwordConfirm: $passwordConfirm}
  ) {
    status
    user {
      id
      name
      email
    }
  }
}
    `;
export type RegisterUserMutationFn = Apollo.MutationFunction<RegisterUserMutation, RegisterUserMutationVariables>;

/**
 * __useRegisterUserMutation__
 *
 * To run a mutation, you first call `useRegisterUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerUserMutation, { data, loading, error }] = useRegisterUserMutation({
 *   variables: {
 *      name: // value for 'name'
 *      email: // value for 'email'
 *      password: // value for 'password'
 *      passwordConfirm: // value for 'passwordConfirm'
 *   },
 * });
 */
export function useRegisterUserMutation(baseOptions?: Apollo.MutationHookOptions<RegisterUserMutation, RegisterUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterUserMutation, RegisterUserMutationVariables>(RegisterUserDocument, options);
      }
export type RegisterUserMutationHookResult = ReturnType<typeof useRegisterUserMutation>;
export type RegisterUserMutationResult = Apollo.MutationResult<RegisterUserMutation>;
export type RegisterUserMutationOptions = Apollo.BaseMutationOptions<RegisterUserMutation, RegisterUserMutationVariables>;