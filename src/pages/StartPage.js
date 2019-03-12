
import React from 'react';
import styled from 'styled-components';

// interface props {
//   pageData
// }

function StartPage(props){
  const {
    innerWidth,
    pageData
  } = props;

  let bgUrl,bgMaskUrl
  if ( innerWidth < 425 ) {
    bgMaskUrl = pageData.payload.mobile_mask_img;
    bgUrl = pageData.payload.mobile_background_img;
  } else {
    bgMaskUrl = pageData.payload.mask_img;
  }

  return (
    <Container>
      <TitleImage src={props.pageData.payload.mobile_title_img} zIndex={3}></TitleImage>
      <BgImage style={{backgroundImage: `url(${bgMaskUrl})`}} zIndex={2}></BgImage>
      {
        innerWidth > 425 ? 
          <BgVideoComponent src={pageData.payload.video}></BgVideoComponent> : 
          <BgImage style={{backgroundImage: `url(${bgUrl})`}} zIndex={1}></BgImage>
      }
      <BottomInfo>
        <Description>{props.pageData.payload.description}</Description>
      </BottomInfo>
    </Container>
  )
}

export default StartPage

const Container = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  background: #000;
`

const TitleImage = styled.img`
display: block;
max-width: 100%;
position: absolute;
top: 50%;
left: 50%;
transform: translate(-50%, -50%);
z-index: ${props => props.zIndex || 1};
width: 55vh;

  @media only screen and (max-width: 425px) {
    width: 45vh;
  }

`
const BgImage = styled.div`
position: absolute;
top:0;
bottom:0;
left:0;
right:0;
background-size: cover;
background-position: 50%;
background-repeat: no-repeat;
z-index: ${props => props.zIndex || 1};
`

const BottomInfo = styled.div`
width: 100%;
color: hsla(0,0%, 100%, .6);
text-align: center;
position: absolute;
bottom: 0;
z-index: 3;
`

const Description = styled.div`
  padding: 3.2rem;
  font-size: 1.3rem;
  line-height: 2rem;
`

const BgVideoComponent = (props) => (
  <BgVideoWrapper>
    <BgVideo loop autoPlay >
      <source src={props.src} type="video/mp4"></source>
    </BgVideo>
  </BgVideoWrapper>
)

const BgVideoWrapper = styled.div`
position: fixed;
top: 0; 
right: 0; 
bottom: 0; 
left: 0;
overflow: hidden;
`
const BgVideo = styled.video`
position: absolute;
top: 0;
left: 0;
width: 100%;
height: 100%;
cursor:pointer;

  @media (min-aspect-ratio: 16/9) {
    height: 300%; 
    top: -100%; 
  }

  @media (max-aspect-ratio: 16/9) {
    width: 300%; 
    left: -100%; 
  }
`