import React, { useState, useEffect } from 'react';
import { useAudioPosition, useAudioPlayer } from 'react-use-audio-player';
import LinearProgress from '@material-ui/core/LinearProgress';

import Play from './components/Play';
import Pause from './components/Pause';
import FastForward from './components/FastForward';
import Rewind from './components/Rewind';

import { millisToMinutesAndSeconds } from 'utils/time.utils';
import styles from './audioPlayer.module.css';

function AlbumImage ({ images }) {
  return <img src={images[0].url} className={styles.albumImage} alt="Album cover art" />;
}

function TrackProgress ({ position, duration }) {
  const [formattedPosition, setFormattedPosition] = useState('--');
  const [formattedDuration, setFormattedDuration] = useState('--');

  useEffect(() => {
    setFormattedPosition(millisToMinutesAndSeconds(Math.round(position) * 1000));
    setFormattedDuration(millisToMinutesAndSeconds(Math.floor(duration) * 1000));
  }, [position, duration]);

  return (
    <div className={styles.trackProgress}>
      <span className={styles.trackPosition}>{formattedPosition}</span>
      <span className={styles.trackDuration}>/{formattedDuration}</span>
    </div>
  );
}

function TrackProgressBar ({ position, duration }) {
  const [completed, setCompleted] = useState(0);
  useEffect(() => {
    setCompleted(Math.ceil(position/duration * 100));
  }, [position, duration]);

  return (
    <div className={styles.progressContainer}>
      <LinearProgress variant="determinate" value={completed} classes={{ colorPrimary: styles.progressBackground, barColorPrimary: styles.progressActive }}/>
    </div>
  );
}


function TrackControls ({ ready, playing, play, pause }) {
  function togglePlay () {
    playing ? pause() : play();
  }

  return (
    <div className={styles.controlsContainer}>
      <button className={styles.controlButton}>
        <Rewind />
      </button>

      <button onClick={togglePlay} className={styles.controlButton}>
        { playing ? <Pause /> : <Play /> }
      </button>

      <button className={styles.controlButton}>
        <FastForward />
      </button>
    </div>
  )
}

function TrackInfo ({ track, playing }) {
  const { position, duration } = useAudioPosition();

  return (
    <div className={styles.currentTrack}>
      <div className={styles.allInfo}>
        <AlbumImage images={track.album.images} />
        <div className={styles.trackInfo}>
          <div className={styles.trackTitle}>{track.name}</div>
          <div className={styles.trackAlbum}>{track.album.name}</div>
          { playing && <TrackProgress position={position} duration={duration} /> }
        </div>
      </div>

      { playing && <TrackProgressBar position={position} duration={duration} /> }
    </div>
  );
}

function CurrentTrack ({ track }) {
  const audio = useAudioPlayer({
    src: track.preview_url,
    format: "mp3",
    autoplay: false
  });

  return (
    <>
      <TrackInfo track={track} {...audio} />
      <TrackControls {...audio} />
    </>
  )
}

export default function AudioPlayer ({ track }) {
  return (track)
    ? <CurrentTrack track={track} />
    : null;
  /*


  if ((!ready && !loading) || !file) return <div>Select a track to play</div>;
  if (loading) return <div>Loading track</div>;
  return (
    <button onClick={togglePlay}>{ playing ? "Pause" : "Play" }</button>
  )
  */
}
