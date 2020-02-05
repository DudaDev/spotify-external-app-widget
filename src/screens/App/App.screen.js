import React from 'react';

import SpotifyProvider  from 'providers/Spotify';
import ArtistProvider from 'providers/Artist';
import TracksProvider from 'providers/Tracks';
import Spotify from 'components/Spotify';

import styles from './app.module.css';

function App({ artistId }) {
  return (
    <div className={styles.app}>
      <SpotifyProvider>
        <ArtistProvider artistId={artistId} key={artistId}>
          <TracksProvider>
            <Spotify />
          </TracksProvider>
        </ArtistProvider>
      </SpotifyProvider>
    </div>
  );
}

export default App;
