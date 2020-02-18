
import React, { useRef } from 'react';
import { MovieCover, StyledPlayIcon } from './Top1Card';
import TopLeftNum from './TopLeftNum';
import { EllipsisText } from "../../common/Ellipsis/Ellipsis";

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
    movieUrl,
  } = props;

  const ellipsisContainerRef = useRef();

  return (
    <div className={className}
      style={{ display: "block", position: "relative", width: width, paddingTop: "2px" }}>
      <TopLeftNum>{topN}</TopLeftNum>
      <MovieCover
        href={movieUrl} target="_blank"
        bgUrl={coverUrl} width={width} height={coverHeight}></MovieCover>
      <a href={movieUrl} target="_blank" rel="noopener noreferrer" >
        <div 
          ref={ellipsisContainerRef}
          style={{ boxSizing: "border-box", height: "42px", padding: "4px 5px", fontSize: "12px", lineHeight: "1.6rem", background: "rgba(0,0,0,.5)" }}>
          <span>
            {
              playable ? (
                <StyledPlayIcon width425="13px"></StyledPlayIcon>
              ) : null
            }
          </span>
          {/* <span>{title}</span> */}
          <EllipsisText text={title} containerRef={ellipsisContainerRef}></EllipsisText>
          <span style={{ color: "#fdb700", marginLeft: "3px" }}>{rating}</span>
        </div>
      </a>
    </div>
  )
}