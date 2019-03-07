
import React from 'react';
import {StarSVG} from './StarRating';

export function BarRating(props) {
  let {
    ratingArray,
    // reverseArray,
    singleBarWidth,
    singleBarHeight,
    margin,
  } = props;

  // if (reverseArray) ratingArray.reverse();
  const levels = ratingArray.length;

  const Bar = (props) => (
      <RatingBar width={singleBarWidth} height={singleBarHeight}
        bgColor={"#ffac2d"}
        ratingScore={props.score}
        style={{marginLeft: "5px"}}
        ></RatingBar>
  )

  return (
    <div>
      {
        ratingArray.map((rating, index )=> {
          let level = index + 1;
          let starArray = []
          for (let i = 1; i <= level; i++) {
            starArray.push(<StarSVG width={singleBarHeight} height={singleBarHeight} key={'star'+ i + 'in' + index}></StarSVG>)
          }
          return (
            <div style={{textAlign: "right", fontSize: 0, margin: margin}} key={'bar' + index}>
              <div style={{display: "inline-block", height: singleBarHeight}}>{[...starArray]}</div>
              <Bar score={rating} ></Bar>
            </div>
          )
        }).reverse()
      }
    </div>
  )
}

function RatingBar(props) {
  const {
    width,
    height,
    bgColor,
    // marginBottom,
    ratingScore,
    style
  } = props;
  const innerWidth = `${ratingScore * 100}%`
  return (
    <div style={{
      ...style, 
      display: "inline-block",
      width: width,
      height: height,
      backgroundColor: "hsla(0,0%,100%,.1)",
      // marginBottom: marginBottom
      }}>
      <div style={{height:"100%", width: innerWidth, background: bgColor }}>

      </div>
    </div>
  )
}