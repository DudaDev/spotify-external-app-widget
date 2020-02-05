import React from 'react';

import { useTracksState } from 'providers/Tracks';
import Artist from 'components/Artist';
import Loading from 'components/Loading';

import styles from './spotify.module.css';

export default function Spotify () {
  const { data: tracks } = useTracksState();

  return (
    (!tracks)
      ? <Loading />
      : <Artist className={styles.root}/>
  )
}
