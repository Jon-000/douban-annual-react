
import React from 'react';
import { MovieCover } from './Top1Card';
import TopLeftNum from './TopLeftNum';

export default function Top29Card(props) {
  const {
    topN,
    coverUrl,
    width,
    className,
  } = props;

  return (
    <div className={className} style={{position: "relative", width:width, marginTop: "2px" }}>
      <TopLeftNum>{topN}</TopLeftNum>
      <MovieCover bgUrl={coverUrl} width={width} height="11.1rem"></MovieCover>
      <div style={{height: "4.2rem", background: "blue"}}></div>
    </div>
  )
}