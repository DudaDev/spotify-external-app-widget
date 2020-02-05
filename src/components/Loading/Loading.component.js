import React from 'react';

import CircularProgress from '@material-ui/core/CircularProgress';

import styles from './loading.module.css';

export default function Loading () {
  return (
    <div className={styles.root}>
      <CircularProgress classes={{ svg: styles.circle }}/>
    </div>
  )
}
