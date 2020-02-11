

import React from 'react';

export default function StarRating(props) {
  const {
    singleStarWidth,
    singleStarHeight,
  } = props;

  const totalScore = 10;
  const totalStarNum = 5;
  const StarComponentArray = []

  const scoreOfOneStar = totalScore / totalStarNum
  
  const tmp = props.ratingScore;
  const ratingScore = Number(tmp);
  if (isNaN(ratingScore)) { console.error('StarRating: props.ratingScore should be a number')}

  const numOfWholeStar = Math.floor(ratingScore / scoreOfOneStar)
  const numOfHalfStar = ratingScore % scoreOfOneStar > 0 ? 1 : 0
  const numOfEmptyStar = totalStarNum - numOfWholeStar - numOfHalfStar
  for(let i=1; i<=numOfWholeStar; i++) {
    StarComponentArray.push(<WholeStar width={singleStarWidth} height={singleStarHeight} key={'whole' + i} />)
  }
  if (numOfHalfStar) { StarComponentArray.push(<HalfStar width={singleStarWidth} height={singleStarHeight} key={`half`} />) }
  for(let i=1; i<=numOfEmptyStar; i++) {
    // StarComponentArray.push(emptyStar({width: singleStarWidth, height: singleStarHeight}))
    // 上面这种形式如何传入key?
    StarComponentArray.push(<EmptyStar width={singleStarWidth} height={singleStarHeight} key={'empty' + i} />)
  }
  return (
    <div>
      {
        [...StarComponentArray]
      }
      {/* <Star></Star> */}
    </div>
  )
}


// use svg as normal images
// const Star = () => (
//   <span style={{display: "inline-block", width: "40px", height: "40px", background: `url(${starSVG}) 50%/contain no-repeat`}}>  
//   </span>
// )

// use svg
export const StarSVG = (props) => {
  const fillColor = () => Object.keys(props).includes('fillColor') ? props.fillColor : "#929292"
  const {isHalf} = props
  return (
    <svg  height={props.height || '32'} viewBox='0 0 30 30' width={props.width || '32'} xmlns='http://www.w3.org/2000/svg'>
      
      {/* use polygon */}
      <polygon id='star' points='16 22 7 28 11 18 2 12 12 12 16 2 20 12 30 12 21 18 25 28'
        fillRule='evenodd' //好像没用这句不知到干啥的 
        fill={ isHalf ? 
          "url(#half-gradient)" :
          fillColor()}
      />

      {/* polygon => path ref https://stackoverflow.com/questions/13679495/examples-of-polygons-drawn-by-path-vs-polygon-in-svg */}
      {/* or use path, uncomment the next line to see effects */}
      {/* <path d="M16 22 7 28 11 18 2 12 12 12 16 2 20 12 30 12 21 18 25 28z" fill={fillColor()} transform="translate(0,10)"/> */}

    </svg>
  )
}

// 在这个组件中,提供svg fill的样式,通过url(#id)的方式来使用,由于全局可以获取,因此若放在在StarSVG组件内将重复渲染,并且可能污染全局,因此把他提出来,作为一个辅助的配置对象,来为整个文档的svg提供
// url(#)引用的样式库
// 这个组件文档内渲染一次就够了,相当于一个css样式库
export const SvgLinearGradient = (props) => {
  return (
    <svg width="0" height="0" style={{display: "block"}}>
      <defs>
        <linearGradient id={props.id}>
          <stop offset='50%' stopColor={props.fillColorBefore || "#ffac2d"} />
          <stop offset='50%' stopColor={props.fillColorAfter || "#929292"} stopOpacity='1' />
        </linearGradient>
      </defs>
    </svg>
  )
}

const WholeStar = (props) => (
  <StarSVG fillColor="#ffac2d" width={props.width || "1.6rem"} height={props.height || "1.6rem"}></StarSVG>
)
const HalfStar = (props) => (<StarSVG width={props.width || "1.6rem"} height={props.height || "1.6rem"} fillColor="url(#half-gradient)" ></StarSVG>)
const EmptyStar = (props) => (<StarSVG width={props.width || "1.6rem"} height={props.height || "1.6rem"}></StarSVG>)
