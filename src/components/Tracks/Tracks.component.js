import React, { useEffect, useState } from 'react';

import { useTracksState } from 'providers/Tracks';
import { AudioPlayerProvider } from  'react-use-audio-player';
import AudioPlayer from 'components/AudioPlayer';
import { millisToMinutesAndSeconds } from 'utils/time.utils';

import styles from './tracks.module.css';

function Track ({ track, onClick }) {
  const duration = millisToMinutesAndSeconds(track.duration_ms);
  function handleClick () {
    onClick(track);
  }

  return (
    <li key={track.id} className={styles.track}>
      <button onClick={handleClick} className={styles.trackButton}>
        <div className={styles.trackName}>
          <div>{track.name}</div>
          <div className={styles.trackAlbum}>{track.album.name}</div>
        </div>
        <div className={styles.trackDuration}>{duration}</div>
      </button>
    </li>
  )
}

export default function Tracks () {
  const { data: tracks } = useTracksState();
  const [currentTrack, setCurrentTrack] = useState(null);

  useEffect(() => {
    setCurrentTrack(tracks[0]);
  }, [tracks]);

  return (
    <>
      <ul className={styles.tracks}>
        {tracks && tracks.length && tracks.map(track => <Track key={track.id} track={track} onClick={setCurrentTrack} />)}
      </ul>

      <AudioPlayerProvider>
        <AudioPlayer track={currentTrack} />
      </AudioPlayerProvider>
    </>
  );
}
