import React from 'react';

import { useArtistState } from 'providers/Artist';
import Tracks from 'components/Tracks';
import SpotifyLogo from './components/SpotifyLogo';

import styles from './artist.module.css';

export default function Details () {
  const { data: artist } = useArtistState();
  return (
    <div className={styles.root}>
      <header className={styles.artistHeader}>
        <div className={styles.artistName}>{artist.name}</div>
        <a href={artist.external_urls.spotify}>
          <SpotifyLogo className={styles.spotifyLogo} />
        </a>
      </header>
      <Tracks />
    </div>
  )
}
