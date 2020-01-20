import React, { useState } from 'react';

import SpotifyProvider, { useSpotifyState }  from 'providers/Spotify';
import ArtistProvider, { useArtistState } from 'providers/Artist';
import TracksProvider, { useTracksState } from 'providers/Tracks';
import { AudioPlayerProvider, useAudioPlayer } from 'react-use-audio-player';

import 'App.css';

function AudioPlayer ({ file }) {
  const { play, pause, ready, loading, playing } = useAudioPlayer({
    src: file,
    format: "mp3",
    autoplay: false
  });

  function togglePlay () {
    playing ? pause() : play();
  }

  if ((!ready && !loading) || !file) return <div>Select a track to play</div>;
  if (loading) return <div>Loading track</div>;
  return (
    <button onClick={togglePlay}>{ playing ? "Pause" : "Play" }</button>
  )
}

function Track ({ track, onClick }) {
  function handleClick () {
    onClick(track.preview_url);
  }

  return (
    <li key={track.id} onClick={handleClick}>{track.name}</li>
  )
}

function Tracks () {
  const { data: tracks } = useTracksState();
  const [currentTrack, setCurrentTrack] = useState(null);

  return (
    <>
      <h3>Most Popular Tracks in the US</h3>
      <ul>
        {tracks && tracks.length && tracks.map(track => <Track key={track.id} track={track} onClick={setCurrentTrack} />)}
      </ul>

      <AudioPlayerProvider>
        <AudioPlayer file={currentTrack} />
      </AudioPlayerProvider>
    </>
  );
}

function Details ({ artist }) {
  return (
    <>
      <h1>{artist.name}</h1>
      { artist.genres && artist.genres.length && artist.genres.join(', ') }

      <TracksProvider artistId={artist.id}><Tracks /></TracksProvider>
    </>
  )
}

function Artist () {
  const { data: artist } = useArtistState();

  return (
    artist
      ? <Details artist={artist} />
      : <div>Fetching Artist</div>
  )
}

function Spotify () {
  const spotify = useSpotifyState();

  return (
    spotify && spotify.token
      ? <ArtistProvider><Artist /></ArtistProvider>
      : <div>Contacting Spotify</div>
  )
}

function App() {
  return (
    <div className="App">
      <SpotifyProvider>
        <Spotify />
      </SpotifyProvider>
    </div>
  );
}

export default App;
