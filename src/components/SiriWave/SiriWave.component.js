import React, { useEffect, useState, useRef } from 'react';
import Siri from 'siriwave';

import styles from './siriWave.module.css';

export default function Siriwave ({ started, speed = 0.2 }) {
  const container = useRef();
  const [siri, setSiri] = useState(null);

  useEffect(() => {
    setSiri(new Siri({
      speed,
      amplitude: 1.5,
      container: container.current
    }));
  }, [speed]);


  useEffect(() => {
    if (siri) {
      (!started) ? siri.stop() : siri.start();
    }
  }, [started, siri])

  return <div ref={container} className={styles.container}></div>;
}
