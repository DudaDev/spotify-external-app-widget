import React, {useContext, useEffect, useReducer} from 'react';
import PropTypes from 'prop-types';

import fetch from 'config';
import { useSpotifyState } from 'providers/Spotify';

const ARTIST = {
  FETCH_REQUEST: 'FETCH_REQUEST',
  FETCH_FAILURE: 'FETCH_FAILURE',
  FETCH_SUCCESS: 'FETCH_SUCCESS'
};

const ArtistStateContext = React.createContext();

function artistReducer (state, action) {
  switch (action.type) {
    case ARTIST.FETCH_REQUEST:
      return {
        data: undefined,
        error: undefined,
        requested: true
      };
    case ARTIST.FETCH_FAILURE:
      return {
        ...state,
        data: undefined,
        error: action.error
      };
    case ARTIST.FETCH_SUCCESS:
      return {
        ...state,
        data: action.artist,
        error: undefined
      };
    default:
      throw new Error('Unknown action for artist provider.');
  }
}

ArtistProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export default function ArtistProvider ({ artistId, children }) {
  const { token } = useSpotifyState();
  const [artist, dispatch] = useReducer(artistReducer, {
    data: undefined,
    error: undefined,
    requested: false
  });

  useEffect(() => {
    if (token)
      getArtist(artistId, dispatch)
  }, [artistId, token]);

  return (
    <ArtistStateContext.Provider value={artist}>
      {children}
    </ArtistStateContext.Provider>
  );
}

function getArtist (artistId, dispatch) {
  dispatch({ type: ARTIST.FETCH_REQUEST });
  fetch
    .get(`/spotify/artists/${artistId}`)
    .then(response => dispatch({ type: ARTIST.FETCH_SUCCESS, artist: response.data }))
    .catch((error) => dispatch({ type: ARTIST.FETCH_FAILURE, error }));
}

export function useArtistState () {
  return useContext(ArtistStateContext);
}
