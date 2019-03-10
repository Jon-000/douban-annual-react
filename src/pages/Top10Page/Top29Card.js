
import React from 'react';
import { MovieCover, StyledPlayIcon } from './Top1Card';
import TopLeftNum from './TopLeftNum';

export default function Top29Card(props) {
  const {
    topN,
    coverUrl,
    width,
    coverHeight,
    className,
    title,
    playable,
    rating,
  } = props;

  return (
    <div className={className} style={{position: "relative", width:width, paddingTop: "2px" }}>
      <TopLeftNum>{topN}</TopLeftNum>
      <MovieCover bgUrl={coverUrl} width={width} height={coverHeight}></MovieCover>
      <div style={{boxSizing: "border-box", height: "42px", padding: "4px 5px", fontSize: "12px", lineHeight: "1.6rem", background: "rgba(0,0,0,.5)"}}>
        <span>
          {
            playable ? (
              <StyledPlayIcon width425="13px"></StyledPlayIcon>
            ) : null
          }
        </span>
        <span>{title}</span>
        <span style={{color: "#fdb700", marginLeft: "3px"}}>{rating}</span>
      </div>
    </div>
  )
}