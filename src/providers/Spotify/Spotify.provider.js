import React, {useContext, useEffect, useReducer}  from 'react';
import PropTypes from 'prop-types';

import fetch from 'config';

const SPOTIFY = {
  AUTH_TOKEN_REQUEST: 'AUTH_TOKEN_REQUEST',
  AUTH_TOKEN_FAILURE: 'AUTH_TOKEN_FAILURE',
  AUTH_TOKEN_SUCCESS: 'AUTH_TOKEN_SUCCESS'
};

const SpotifyStateContext = React.createContext();
const SpotifyDispatchContext = React.createContext();

function spotifyReducer (state, action) {
  switch (action.type) {
    case SPOTIFY.AUTH_TOKEN_REQUEST:
    case SPOTIFY.AUTH_TOKEN_FAILURE:
      return { token: undefined };
    case SPOTIFY.AUTH_TOKEN_SUCCESS:
      return { token: action.token };
    default:
      throw new Error('Unknown action type for spotify reducer');
  }
}

SpotifyProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export default function SpotifyProvider ({ children }) {
  const [spotify, dispatch] = useReducer(spotifyReducer, {
    token: undefined
  });

  useEffect(() => {
    const token = sessionStorage.getItem('Authorization');

    (token)
      ? setAuthToken(token, dispatch)
      : getAuthToken(dispatch);
  }, [dispatch]);

  return (
    <SpotifyStateContext.Provider value={spotify}>
      {children}
    </SpotifyStateContext.Provider>
  );
};

function getAuthToken (dispatch) {
  dispatch({ type: SPOTIFY.AUTH_TOKEN_REQUEST });
  fetch
    .get('/token')
    .then(response => {
      const { access_token: token } = response.data;
      setAuthToken(token, dispatch);
    }).catch((error) => {
      dispatch({ type: SPOTIFY.AUTH_TOKEN_FAILURE, error })
    })
};

function setAuthToken (token, dispatch) {
  fetch.defaults.headers.common['Authorization'] = 'Bearer ' + token;
  sessionStorage.setItem('Authorization', token);
  dispatch({ type: SPOTIFY.AUTH_TOKEN_SUCCESS, token });
};

export function useSpotifyState () {
  return useContext(SpotifyStateContext);
}

export function useSpotifyDispatch () {
  return useContext(SpotifyDispatchContext);
}
