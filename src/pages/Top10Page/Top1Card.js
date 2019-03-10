
import React from 'react';
import styled from 'styled-components';
import playSvg from '../../assets/images/play2.svg';
import StarRating, { SvgLinearGradient } from '../../common/rating/StarRating';
import { BarRating } from '../../common/rating/BarRating';
import TopLeftNum from './TopLeftNum';

function Top1Card(props) {
  console.log('Top1Card')
  console.log(props)
  const {
    //结构的subject这些
    title,
    rating,
    cover,
    rating_stats,
    rating_count,
    playable,
    // 以下是payload的中的
    payloadTitle,
    background_color,
    description,
  } = props
  let baseFontSize = props.baseFontSize || 10

  return (
    <Container bgColor={background_color} width={`${26 * baseFontSize}px`} >
      <h1 style={{
        fontSize: `${1.9 * baseFontSize}px`,
        lineHeight: `${2.8 * baseFontSize}px`,
        fontWeight: 700,
        margin: `0 ${1.2 * baseFontSize}px`,
        padding: `${.8 * baseFontSize}px 0`,
        borderBottom: `${.1 * baseFontSize}px solid hsla(0,0%,100%,.25)`
      }}>{payloadTitle}</h1>
      <div style={{padding: `${1.56 * baseFontSize}px` }}>
        <CardMiddle>
          <div style={{
            width: `${8 * baseFontSize}px`,
            height: `${11.4 * baseFontSize}px`,
            marginRight: `${1 * baseFontSize}px`,
            float: "left",
            position: "relative",
          }}>
            <TopLeftNum>1</TopLeftNum>
            <MovieCover bgUrl={cover}></MovieCover>
          </div>
          <MainRight>
            <h2 style={{
              fontSize: `${1.7 * baseFontSize}px`,
              fontWeight: 400,
              margin: 0,
              verticalAlign: "middle",
            }}>
              {
                playable ? 
                  <StyledPlayIcon width425={`${1.6 * baseFontSize}px`} height425={`${1.6 * baseFontSize}px`} ></StyledPlayIcon>
                : null
              }
              <a style={{ color: "#fff" }}>{title}</a>
            </h2>
            <div style={{marginTop: description ? "20px" : null}}>
              <div style={{
                margin: `${.8 * baseFontSize}px 0 ${.4 * baseFontSize}px`,
                color: "hsla(0,0%,100%,.7)",
              }}>
                <span style={{ fontSize: `${1.1 * baseFontSize}px`, lineHeight: `${2 * baseFontSize}px`, paddingRight: `${1.7 * baseFontSize}px`, display: "inline-block", position: "relative" }}>
                  豆瓣评分
                <span style={{ fontSize: `${.8 * baseFontSize}px`, lineHeight: "normal", position: "absolute", top: "0", right: "0" }}>TM</span>
                </span>
              </div>
              <RatingContainer>
                <RatingSum>
                  <div style={{ fontSize: `${2.1 * baseFontSize}px`, fontWeight: 500, lineHeight: "1.4", textAlign: "center" }}>
                    {rating.toFixed(1)}
                  </div>
                  <SvgLinearGradient id="half-gradient"></SvgLinearGradient>
                  <StarRating ratingScore={rating} singleStarWidth={`${.9 * baseFontSize}px`} singleStarHeight={`${.9 * baseFontSize}px`}></StarRating>
                </RatingSum>

                <RatingDetail>
                  <BarRating ratingArray={rating_stats}
                    singleBarWidth={`${5.6 * baseFontSize}px`} singleBarHeight={`${.4 * baseFontSize}px`} margin={`${.1 * baseFontSize}px 0`}
                  ></BarRating>
                  <div style={{ textAlign: "right", fontSize: `${.9 * baseFontSize}px`, lineHeight: `${1.3 * baseFontSize}px`, color: "hsla(0,0%,100%,.6)" }} >{rating_count}人评分</div>
                </RatingDetail>
              </RatingContainer>
            </div>

          </MainRight>
        </CardMiddle>

        {
          description ? (
            <div style={{
              color: "hsla(0,0%,100%,.6)",
              marginTop: `16px`,
              fontSize: `13px`,
              lineHeight: 1.7,
            }}>{description}</div>
          ) : null
        }
      </div>
    </Container>
  )
}

export default Top1Card;

const Container = styled.div`
box-sizing: border-box;
width: ${props => props.width};
height: ${props => props.height};
background-color: ${props => props.bgColor};
// background-color: #${props => props.bgColor};
// opacity:0.85;
color: white;

`

// const Title = styled.h1`
// font-size: 1.9rem;
// line-height: 2.8rem;
// font-weight: 700;
// margin: 0 1.2rem;
// padding: 0.8rem 0;
// border-bottom: 1px solid hsla(0,0%,100%,.25);
// `
const CardMiddle = styled.div`
  &::after {
    display: block;
    content: '';
    clear: both;
  }
`

// const MainLeft = styled.div`
// width: 8rem;
// height: 11.4rem;
// margin-right: 1rem;
// float: left;
// position: relative;
// `
const MainRight = styled.div`
display: block;
display: flex;
flex-direction: column;
`

// const H2 = styled.h2`
// // line-height: 1.7rem;
// font-size: 1.7rem;
// font-weight: 400;
// margin: 0;
// vertical-align: middle;
// `

export const MovieCover = styled.a`
background-image: url(${props => props.bgUrl});
display: block;
width: ${ props => props.width || "100%"};
height: ${ props => props.height || "100%"};
background-size: cover;
background-position: 0 0;
background-repeat: no-repeat;

`

// const RatingBand = styled.div`
// margin: 8px 0 4px;
// color: hsla(0,0%,100%,.7);
// `

const RatingContainer = styled.div`
display: flex;
justify-content: space-between;
`
const RatingSum = styled.div`

`

const RatingDetail = styled.div`

`
// const PlayIcon = styled.span`
// display: inline-block;

// vertical-align: -2px;
// margin-right: 4px;
// background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEgAAABICAYAAAEi6oPRAAAABGdBT…BfBsrQ2QaaF4gyrEDG4cYjDp71yFDkfx/8BcPlAcqHAv8BoT5unqifvY4AAAAASUVORK5CYII=) 50%/contain no-repeat;
//   @media only screen and (max-width: 425px){
//     width: ${props => props.width425};
//     height: ${props => props.width425};
//   }

// `

const PlayIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 32 32">
    <path d="M16 0c-8.837 0-16 7.163-16 16s7.163 16 16 16 16-7.163 16-16-7.163-16-16-16zM16 29c-7.18 0-13-5.82-13-13s5.82-13 13-13 13 5.82 13 13-5.82 13-13 13zM12 9l12 7-12 7z"></path>
  </svg>
)

export const StyledPlayIcon = styled(PlayIcon)`
display: inline-block;
width: ${props => props.width425};
height: ${props => props.height425};
stroke-width: 0;
stroke: currentColor;
fill: ${props => props.fillColor || "currentColor"};
margin-right: 0.4rem;
vertical-align: -2px;

`

// const PlayIcon = styled.span`
// display: inline-block;
// margin-right: 0.4rem;
// width: ${props => props.width425 || "1rem"};
// height: ${props => props.width425 || "1rem"};
// background-image: url(${props => props.bgUrl});
// background-position: 50%;
// background-repeat: no-repeat;
// background-size: contain;
// vertical-align: -2px;
// `