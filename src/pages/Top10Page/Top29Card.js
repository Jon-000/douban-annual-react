
import React from 'react';
import { MovieCover, StyledPlayIcon } from './Top1Card';
import TopLeftNum from './TopLeftNum';

export default function Top29Card(props) {
  const {
    topN,
    coverUrl,
    width,
    className,
    title,
    playable,
    rating,
  } = props;

  return (
    <div className={className} style={{position: "relative", width:width, marginTop: "2px" }}>
      <TopLeftNum>{topN}</TopLeftNum>
      <MovieCover bgUrl={coverUrl} width={width} height="11.1rem"></MovieCover>
      <div style={{boxSizing: "border-box", height: "4.2rem", padding: ".4rem .5rem", fontSize: "1.2rem", lineHeight: "1.6rem", background: "rgba(0,0,0,.5)"}}>
        <span>
          {
            playable ? (
              <StyledPlayIcon width425="1.3rem"></StyledPlayIcon>
            ) : null
          }
        </span>
        <span>{title}</span>
        <span style={{color: "#fdb700", marginLeft: ".3rem"}}>{rating}</span>
      </div>
    </div>
  )
}