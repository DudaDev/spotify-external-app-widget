export function millisToMinutesAndSeconds (millis) {
  const minutes = Math.floor(millis / 60000);
  let seconds = ((millis % 60000) / 1000).toFixed(0);
  seconds = (seconds < 10) ? `0${seconds}` : seconds;

  return `${minutes}:${seconds}`;
}
