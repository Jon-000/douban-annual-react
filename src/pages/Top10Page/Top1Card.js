
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
    payloadTitle, //除了这个是单独传的,下边的都是直接解构传进来的
    title,
    rating,
    cover,
    rating_stats,
    rating_count,
  } = props
  return (
    <Container bgColor={props.color_scheme.primary_color_light}>
      <Title>{payloadTitle}</Title>
      <CardMain>
        <MainLeft>
          <TopLeftNum>1</TopLeftNum>
          <MovieCover bgUrl={cover}></MovieCover>
        </MainLeft>
        <MainRight>
          <H2>
            <StyledPlayIcon width425="1.6rem" height425="1.6rem"></StyledPlayIcon>
            <a style={{color: "#fff"}}>{title}</a>
          </H2>
          <div>
            <RatingBand>
              <span style={{fontSize: "1.1rem", lineHeight: "2rem", paddingRight: "1.7rem",display: "inline-block", position: "relative"}}>
                豆瓣评分
                <span style={{fontSize: ".8rem", lineHeight: "normal", position: "absolute", top: "0", right: "0"}}>TM</span>
              </span>
            </RatingBand>
            <RatingContainer>
              <RatingSum>
                <div style={{fontSize: "2.1rem", fontWeight: 500, lineHeight:"1.4", textAlign: "center"}}>
                  {rating.toFixed(1)}
                </div>
                <SvgLinearGradient id="half-gradient"></SvgLinearGradient>
                <StarRating ratingScore={rating} singleStarWidth=".9rem" singleStarHeight=".9rem"></StarRating>
              </RatingSum>

              <RatingDetail>
                <BarRating ratingArray={rating_stats}
                  singleBarWidth="5.6rem" singleBarHeight="0.4rem" margin=".1rem 0"
                  ></BarRating>
                <div style={{textAlign: "right", fontSize: ".9rem", lineHeight: "1.3rem", color: "hsla(0,0%,100%,.6)"}} >{rating_count}人评分</div>
              </RatingDetail>
            </RatingContainer>
          </div>

        </MainRight>
      </CardMain>
    </Container>
  )
}

export default Top1Card;

const Container = styled.div`
width: 26rem;
height: 19rem;
background-color: rgba(114, 63, 50, 0.85);
// background-color: #${props => props.bgColor};
// opacity:0.85;
float:right;
color: white;

`

const Title = styled.h1`
font-size: 1.9rem;
line-height: 2.8rem;
font-weight: 700;
margin: 0 1.2rem;
padding: 0.8rem 0;
border-bottom: 1px solid hsla(0,0%,100%,.25);
`
const CardMain = styled.div`
padding: 1.56rem;
// overflow: hidden;
  &::after {
    display: block;
    content: '';
    clear: both;
  }
`

const MainLeft = styled.div`
width: 8rem;
height: 11.4rem;
margin-right: 1rem;
float: left;
position: relative;
`
const MainRight = styled.div`
display: block;
display: flex;
flex-direction: column;
`

const H2 = styled.h2`
// line-height: 1.7rem;
font-size: 1.7rem;
font-weight: 400;
margin: 0;
vertical-align: middle;

`

export const MovieCover = styled.a`
background-image: url(${props => props.bgUrl});
display: block;
width: ${ props => props.width || "100%"};
height: ${ props => props.height || "100%"};
background-size: cover;
background-position: 0 0;
background-repeat: no-repeat;

`

const RatingBand = styled.div`
margin: 8px 0 4px;
color: hsla(0,0%,100%,.7);

`

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

const PlayIcon = ({className}) => (
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