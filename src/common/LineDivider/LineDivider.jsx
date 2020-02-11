
import React from 'react';
import styles from './LineDivider.module.css'

const LineDivider = ({text}) => {
  return (
    <div className={styles["line-divider"]} >
      <span>{text}</span><hr/>
    </div>
  )
}

export default LineDivider;