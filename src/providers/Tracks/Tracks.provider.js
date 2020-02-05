import React, { useContext, useEffect, useReducer } from 'react';
import PropTypes from 'prop-types';

import fetch from 'config';
import { useArtistState } from 'providers/Artist';

const TRACKS = {
  FETCH_REQUEST: 'FETCH_REQUEST',
  FETCH_FAILURE: 'FETCH_FAILURE',
  FETCH_SUCCESS: 'FETCH_SUCCESS'
};

const TracksStateContext = React.createContext();

function tracksReducer (state, action) {
  switch (action.type) {
    case TRACKS.FETCH_REQUEST:
      return {
        data: undefined,
        error: undefined,
        requested: true
      };
    case TRACKS.FETCH_FAILURE:
      return {
        ...state,
        data: undefined,
        error: action.error
      };
    case TRACKS.FETCH_SUCCESS:
      return {
        ...state,
        data: action.tracks,
        error: undefined
      }
    default:
      throw new Error('Unknown action for the tracks provider.');
  }
}

TracksProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export default function TracksProvider ({ children }) {
  const { data: artist } = useArtistState();
  const [tracks, dispatch] = useReducer(tracksReducer, {
    data: undefined,
    error: undefined,
    requested: false
  });

  useEffect(() => {
    if (artist)
      getTracks(dispatch, artist.id);
  }, [artist]);

  return (
    <TracksStateContext.Provider value={tracks}>
      {children}
    </TracksStateContext.Provider>
  );
}

function getTracks (dispatch, artistId) {
  dispatch({ type: TRACKS.FETCH_REQUEST });
  fetch
    .get(`/spotify/artists/${artistId}/top-tracks?country=US`)
      .then(response => dispatch({ type: TRACKS.FETCH_SUCCESS, tracks: response.data.tracks }))
      .catch(error => dispatch({ type: TRACKS.FETCH_FAILURE, error }));
}

export function useTracksState () {
  return useContext(TracksStateContext);
}
